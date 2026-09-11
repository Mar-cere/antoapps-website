/**
 * Turnos con forma live para demo/offline.
 * Sin texto de usuario. Provenance simulated. No son ReviewCases.
 */
import type { TraceEnvelope, TraceSpan } from '@/lib/observatory/data/types';

function span(
  name: string,
  component: TraceSpan['component'],
  structured: TraceSpan['structured'],
  what: string
): TraceSpan {
  return {
    span_id: `fx_${name}`,
    canonical_name: name,
    stage_id: name,
    component,
    status: 'completed',
    duration_ms: 2,
    confidence: null,
    result: name,
    constraints_applied: [],
    structured,
    what_happened: what,
  };
}

const PIPELINE: Array<[string, TraceSpan['component']]> = [
  ['turn.started', 'runtime'],
  ['consent.checked', 'governance'],
  ['state.estimated', 'state'],
  ['decision.deliberated', 'nexus_engine'],
  ['experience.planned', 'experience'],
  ['persona.snapshotted', 'persona'],
  ['trajectory.estimated', 'state'],
  ['experience.evaluated', 'experience'],
  ['extras.evaluated', 'experience'],
  ['turn.completed', 'runtime'],
  ['decision.shadowed', 'cortex'],
  ['relational.shadowed', 'cortex'],
];

function turn(partial: {
  trace_id: string;
  session_ref: string;
  subject_ref: string;
  structured: Record<string, TraceSpan['structured']>;
  notes: Record<string, string>;
}): TraceEnvelope {
  return {
    trace_id: partial.trace_id,
    session_ref: partial.session_ref,
    subject_ref: partial.subject_ref,
    schema_version: 'turn_trace_v1',
    content_mode: 'off',
    started_at: '2026-09-08T22:00:00.000Z',
    completed_at: '2026-09-08T22:00:04.000Z',
    current_stage: 'turn.completed',
    spans: PIPELINE.map(([name, component]) =>
      span(
        name,
        component,
        partial.structured[name] ?? {},
        partial.notes[name] ?? 'Evento content-off de fixture.'
      )
    ),
    pack_id: 'ia-14',
    surface: 'registered',
    transport: 'socket',
    provenance: 'simulated',
  };
}

/** Caso familiar: carry en extras, domainCandidate unknown, sin texto. */
export const FAMILY_CARRIED_TURN: TraceEnvelope = turn({
  trace_id: 'tr_family_carried',
  session_ref: 'ses_fam0a1b',
  subject_ref: 'usr_jacq0001',
  structured: {
    'turn.started': {
      surface: 'registered',
      transport: 'socket',
      packId: 'ia-14',
      domainCandidate: 'unknown',
      safetyRoute: 'none',
    },
    'consent.checked': { purposeDecisionCount: 4 },
    'state.estimated': {
      activationBand: 'high',
      loadBand: 'mid',
      opennessBand: 'open',
      timeBand: 'ok',
      claimType: 'pattern_candidate',
    },
    'decision.deliberated': {
      choice: 'abstain',
      mode: 'runtime',
      deliberation: 'nexus_engine',
      candidateCount: 0,
    },
    'experience.planned': { modality: 'chat', conversionSuppression: 'none' },
    'persona.snapshotted': { personaGrant: 'allow' },
    'trajectory.estimated': { directionBand: 'steady' },
    'experience.evaluated': { cue: 'listen', mode: 'shadow' },
    'extras.evaluated': {
      mode: 'shadow',
      decision: 'suppress',
      applied: false,
      activeDomain: 'family',
      domainSource: 'carried',
      thirdPartyBand: 'family',
      reasonCodes: ['family_third_party', 'listen_cue'],
      candidateKindsBefore: ['exposure', 'mindfulness'],
      candidateKindsAfter: [],
      selectedCandidateKind: 'none',
      candidateCountBefore: 2,
      candidateCountAfter: 0,
    },
    'turn.completed': { ttftMs: 420, packId: 'ia-14' },
    'decision.shadowed': { choice: 'implicit_llm', mode: 'shadow' },
    'relational.shadowed': { slice: 'none', stance: 'listen', mode: 'shadow' },
  },
  notes: {
    'turn.started': 'Runtime abrió el turno. domainCandidate=unknown no es un hecho.',
    'extras.evaluated':
      'Carry familiar: activeDomain=family y domainSource=carried. Sin texto del mensaje.',
  },
});

/** Canary de extras vivo con inventario vacío por soft_landing. */
export const SOFT_LANDING_APPLIED_TURN: TraceEnvelope = turn({
  trace_id: 'tr_soft_landing_applied',
  session_ref: 'ses_soft9c2d',
  subject_ref: 'usr_land0002',
  structured: {
    'turn.started': {
      surface: 'registered',
      transport: 'socket',
      packId: 'ia-14',
      domainCandidate: 'self',
      muteFlags: ['soft_landing'],
      safetyRoute: 'none',
    },
    'consent.checked': { purposeDecisionCount: 3 },
    'state.estimated': {
      activationBand: 'mid',
      loadBand: 'low',
      opennessBand: 'open',
      timeBand: 'ok',
      claimType: 'pattern_candidate',
    },
    'decision.deliberated': {
      choice: 'validate',
      mode: 'runtime',
      deliberation: 'nexus_engine',
      candidateCount: 2,
    },
    'experience.planned': { modality: 'chat', conversionSuppression: 'none' },
    'persona.snapshotted': { personaGrant: 'allow' },
    'trajectory.estimated': { directionBand: 'easing' },
    'experience.evaluated': { cue: 'listen', mode: 'shadow' },
    'extras.evaluated': {
      mode: 'applied',
      decision: 'allow',
      applied: false,
      activeDomain: 'self',
      domainSource: 'current',
      thirdPartyBand: 'none',
      reasonCodes: ['soft_ok_after_action'],
      candidateKindsBefore: [],
      candidateKindsAfter: [],
      selectedCandidateKind: 'none',
      candidateCountBefore: 0,
      candidateCountAfter: 0,
      muteFlags: ['soft_landing'],
    },
    'turn.completed': { ttftMs: 380, packId: 'ia-14' },
    'decision.shadowed': { choice: 'implicit_llm', mode: 'shadow' },
    'relational.shadowed': { slice: 'none', stance: 'listen', mode: 'shadow' },
  },
  notes: {
    'extras.evaluated':
      'mode=applied con mute soft_landing. El canary está vivo; candidateKindsBefore=[] es esperado.',
  },
});

export const RUNTIME_TURNS: TraceEnvelope[] = [FAMILY_CARRIED_TURN, SOFT_LANDING_APPLIED_TURN];
