import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PIPELINE_POST_RESPONSE, PIPELINE_PRE_LLM } from '../copy/labels';
import { pipelineSlots, storyFromTrace } from './turnDecision';
import { FAMILY_CARRIED_TURN, SOFT_LANDING_APPLIED_TURN } from './fixtures/runtimeTurns';
import { applyRemoteSnapshot } from './merge';
import { filterTraces } from './turnFilters';
import type { TraceEnvelope } from './types';

function span(name: string, structured: Record<string, string | number | boolean | string[] | null> = {}): TraceEnvelope['spans'][number] {
  return {
    span_id: name,
    canonical_name: name,
    stage_id: name,
    component: 'runtime',
    status: 'completed',
    duration_ms: 1,
    confidence: null,
    result: name,
    constraints_applied: [],
    structured,
    what_happened: name,
  };
}

function trace(spans: TraceEnvelope['spans']): TraceEnvelope {
  return {
    trace_id: 'turn-1',
    session_ref: 'ses_507f1f77',
    subject_ref: 'usr_aaaaaaaa',
    schema_version: 'turn_trace_v1',
    content_mode: 'off',
    started_at: '2026-09-08T22:00:00.000Z',
    completed_at: '2026-09-08T22:00:03.000Z',
    current_stage: 'turn.completed',
    spans,
    pack_id: 'ia-14',
    surface: 'registered',
    transport: 'socket',
    provenance: 'live_trace',
  };
}

test('storyFromTrace muestra carry familiar y mute soft_landing sin texto', () => {
  const story = storyFromTrace(
    trace([
      span('turn.started', { domainCandidate: 'unknown', surface: 'registered', packId: 'ia-14' }),
      span('consent.checked', { purposeDecisionCount: 4 }),
      span('extras.evaluated', {
        mode: 'applied',
        decision: 'allow',
        applied: false,
        activeDomain: 'family',
        domainSource: 'carried',
        thirdPartyBand: 'family',
        candidateKindsBefore: [],
        muteFlags: ['soft_landing'],
      }),
      span('turn.completed', { ttftMs: 400 }),
    ])
  );
  assert.equal(story.extrasMode, 'applied');
  assert.equal(story.extrasApplied, false);
  assert.equal(story.extrasActiveDomain, 'family');
  assert.equal(story.extrasDomainSource, 'carried');
  assert.equal(story.familyCarried, true);
  assert.equal(story.consentPurposeCount, 4);
  assert.deepEqual(story.muteFlags, ['soft_landing']);
  assert.equal(story.domainCandidate, 'unknown');
  assert.equal(story.extrasCandidateKindsBefore.length, 0);
  assert.match(story.headline, /Carry familiar/);
  assert.match(story.headline, /soft_landing/);
});

test('el tramo pre-LLM no incluye extras ni sombras', () => {
  const pre = PIPELINE_PRE_LLM as readonly string[];
  const post = PIPELINE_POST_RESPONSE as readonly string[];
  assert.equal(pre.includes('extras.evaluated'), false);
  assert.equal(post[0], 'experience.evaluated');
  assert.equal(post.includes('relational.shadowed'), true);
});

test('pipelineSlots marca safety.routed como optional_absent', () => {
  const slots = pipelineSlots(trace([span('turn.started'), span('turn.completed')]));
  const safety = slots.find((s) => s.eventType === 'safety.routed');
  assert.equal(safety?.status, 'optional_absent');
  const extras = slots.find((s) => s.eventType === 'extras.evaluated');
  assert.equal(extras?.status, 'skipped');
  assert.equal(slots.some((s) => s.eventType === 'turn.failed'), false);
});

test('pipelineSlots muestra turn.failed y no exige extras', () => {
  const slots = pipelineSlots(trace([span('turn.started'), span('turn.failed')]));
  assert.equal(slots.find((s) => s.eventType === 'turn.failed')?.status, 'present');
  assert.equal(slots.find((s) => s.eventType === 'turn.completed')?.status, 'optional_absent');
  assert.equal(slots.find((s) => s.eventType === 'extras.evaluated')?.status, 'optional_absent');
});

test('el fixture familiar muestra carry y no incluye texto de usuario', () => {
  const family = storyFromTrace(FAMILY_CARRIED_TURN);
  assert.equal(family.extrasMode, 'shadow');
  assert.equal(family.extrasActiveDomain, 'family');
  assert.equal(family.extrasDomainSource, 'carried');
  assert.equal(family.familyCarried, true);
  assert.equal(family.domainCandidate, 'unknown');
  assert.equal(JSON.stringify(FAMILY_CARRIED_TURN).includes('asusta'), false);

  const landing = storyFromTrace(SOFT_LANDING_APPLIED_TURN);
  assert.equal(landing.extrasMode, 'applied');
  assert.equal(landing.extrasApplied, false);
  assert.ok(landing.muteFlags.includes('soft_landing'));
  assert.equal(landing.extrasCandidateKindsBefore.length, 0);
});

test('applyRemoteSnapshot deriva alerta soft_landing si el projector no la mandó', () => {
  const snapshot = applyRemoteSnapshot({
    traces: [SOFT_LANDING_APPLIED_TURN],
    in_flight: false,
    system_lifecycle: 'idle',
  });
  assert.equal(snapshot.in_flight, false);
  assert.ok(snapshot.alerts.some((alert) => alert.alert_id === 'extras_applied_soft_landing'));
});

test('applyRemoteSnapshot no marca activo solo porque hay traces', () => {
  const snapshot = applyRemoteSnapshot({
    traces: [trace([span('turn.started'), span('turn.completed')])],
    decisions: [{ decision_id: 'fake' } as never],
    reviews: [{ case_id: 'r1' } as never],
    hypotheses: [{ hypothesis_id: 'h1' } as never],
  });
  assert.equal(snapshot.system_lifecycle, 'idle');
  assert.equal(snapshot.in_flight, false);
  assert.deepEqual(snapshot.decisions, []);
  assert.deepEqual(snapshot.reviews, []);
  assert.deepEqual(snapshot.hypotheses, []);
  assert.equal(snapshot.surveillance.provenance, 'unavailable');
});

test('filtros family + carried + soft_landing', () => {
  const family = trace([
    span('turn.started', { surface: 'registered' }),
    span('extras.evaluated', {
      mode: 'shadow',
      activeDomain: 'family',
      domainSource: 'carried',
      muteFlags: ['soft_landing'],
    }),
  ]);
  const other = trace([
    span('turn.started', { surface: 'guest' }),
    span('extras.evaluated', { mode: 'applied', activeDomain: 'self', domainSource: 'current' }),
  ]);
  other.trace_id = 'turn-2';
  const found = filterTraces([family, other], {
    surface: 'all',
    extrasMode: 'all',
    muteSoftLanding: true,
    familyDomain: true,
    domainCarried: true,
  });
  assert.equal(found.length, 1);
  assert.equal(found[0].trace_id, 'turn-1');
});
