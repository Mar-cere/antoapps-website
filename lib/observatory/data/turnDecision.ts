/**
 * Reconstruye la deliberación visible de un turno a partir de traces content-off.
 * No inventa DecisionRecord ni scores de candidatos.
 */
import { choiceLabel, DECISION_PATH_EVENTS, PIPELINE_EVENTS, PIPELINE_OPTIONAL } from '@/lib/observatory/copy/labels';
import type { StructuredValue, TraceEnvelope, TraceSpan } from '@/lib/observatory/data/types';

export type TurnDecisionStory = {
  trace: TraceEnvelope;
  engineChoice: string | null;
  engineMode: string | null;
  engineDeliberation: string | null;
  engineCandidates: number | null;
  engineConstraintCount: number | null;
  shadowChoice: string | null;
  shadowMode: string | null;
  shadowDeliberation: string | null;
  modality: string | null;
  conversionSuppression: string | null;
  experienceMode: string | null;
  extrasMode: string | null;
  extrasDecision: string | null;
  extrasApplied: boolean | null;
  extrasActiveDomain: string | null;
  extrasDomainSource: string | null;
  extrasThirdPartyBand: string | null;
  extrasReasonCodes: string[];
  extrasCandidateKindsBefore: string[];
  extrasCandidateKindsAfter: string[];
  extrasSelectedKind: string | null;
  extrasCountBefore: number | null;
  extrasCountAfter: number | null;
  muteFlags: string[];
  domainCandidate: string | null;
  slice: string | null;
  stance: string | null;
  safetyRoute: string | null;
  riskClass: string | null;
  personaGrant: string | null;
  activationBand: string | null;
  loadBand: string | null;
  opennessBand: string | null;
  timeBand: string | null;
  directionBand: string | null;
  claimType: string | null;
  cue: string | null;
  reason: string | null;
  ttftMs: number | null;
  surface: string | null;
  transport: string | null;
  packId: string | null;
  consentPurposeCount: number | null;
  familyCarried: boolean;
  split: boolean;
  headline: string;
  path: TraceSpan[];
};

function spanOf(trace: TraceEnvelope, eventType: string): TraceSpan | undefined {
  return trace.spans.find((span) => span.canonical_name === eventType);
}

function str(span: TraceSpan | undefined, key: string): string | null {
  const value = span?.structured?.[key];
  return typeof value === 'string' ? value : null;
}

function num(span: TraceSpan | undefined, key: string): number | null {
  const value = span?.structured?.[key];
  return typeof value === 'number' ? value : null;
}

function bool(span: TraceSpan | undefined, key: string): boolean | null {
  const value = span?.structured?.[key];
  return typeof value === 'boolean' ? value : null;
}

function strList(span: TraceSpan | undefined, key: string): string[] {
  const value = span?.structured?.[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function collectMuteFlags(trace: TraceEnvelope): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const span of trace.spans) {
    for (const flag of strList(span, 'muteFlags')) {
      if (seen.has(flag)) continue;
      seen.add(flag);
      out.push(flag);
    }
  }
  return out;
}

function headlineFor(story: {
  engineChoice: string | null;
  shadowChoice: string | null;
  extrasMode: string | null;
  extrasDecision: string | null;
  extrasActiveDomain: string | null;
  extrasDomainSource: string | null;
  muteFlags: string[];
}): string {
  const extrasBit =
    story.extrasMode && story.extrasDecision
      ? ` Extras ${story.extrasMode}/${story.extrasDecision}.`
      : ' Sin extras.evaluated en este turno.';
  const carryBit =
    story.extrasActiveDomain === 'family' && story.extrasDomainSource === 'carried'
      ? ' Carry familiar activo (domainSource=carried).'
      : '';
  const muteBit = story.muteFlags.includes('soft_landing')
    ? ' Mute soft_landing: el inventario gobernado puede estar vacío.'
    : '';
  if (!story.engineChoice && !story.shadowChoice) {
    return `Este turno no trajo deliberación ni sombra.${extrasBit}${carryBit}${muteBit}`;
  }
  if (story.engineChoice === 'abstain' && story.shadowChoice === 'implicit_llm') {
    return `El Engine se abstuvo. El pipeline implícito igual generó texto. Eso no es un DecisionRecord.${extrasBit}${carryBit}${muteBit}`;
  }
  if (story.engineChoice && story.shadowChoice && story.engineChoice !== story.shadowChoice) {
    return `El Engine eligió ${choiceLabel(story.engineChoice).toLowerCase()}. La sombra registró ${choiceLabel(story.shadowChoice).toLowerCase()}.${extrasBit}${carryBit}${muteBit}`;
  }
  if (story.engineChoice) {
    return `El Engine eligió ${choiceLabel(story.engineChoice).toLowerCase()} en runtime.${extrasBit}${carryBit}${muteBit}`;
  }
  return `La sombra del pipeline registró ${choiceLabel(story.shadowChoice).toLowerCase()}.${extrasBit}${carryBit}${muteBit}`;
}

export function storyFromTrace(trace: TraceEnvelope): TurnDecisionStory {
  const engine = spanOf(trace, 'decision.deliberated');
  const shadow = spanOf(trace, 'decision.shadowed');
  const planned = spanOf(trace, 'experience.planned');
  const state = spanOf(trace, 'state.estimated');
  const trajectory = spanOf(trace, 'trajectory.estimated');
  const persona = spanOf(trace, 'persona.snapshotted');
  const relational = spanOf(trace, 'relational.shadowed');
  const evaluated = spanOf(trace, 'experience.evaluated');
  const extras = spanOf(trace, 'extras.evaluated');
  const completed = spanOf(trace, 'turn.completed');
  const started = spanOf(trace, 'turn.started');
  const safety = spanOf(trace, 'safety.routed');
  const consent = spanOf(trace, 'consent.checked');

  const engineChoice = str(engine, 'choice');
  const shadowChoice = str(shadow, 'choice');
  const extrasMode = str(extras, 'mode');
  const extrasDecision = str(extras, 'decision');
  const extrasActiveDomain = str(extras, 'activeDomain');
  const extrasDomainSource = str(extras, 'domainSource');
  const muteFlags = collectMuteFlags(trace);
  const split = Boolean(engineChoice && shadowChoice && engineChoice !== shadowChoice);
  const pathTypes = new Set<string>(DECISION_PATH_EVENTS);
  const path = PIPELINE_EVENTS.map((name) => trace.spans.find((span) => span.canonical_name === name)).filter(
    (span): span is TraceSpan => Boolean(span)
  );
  const extraSpans = trace.spans.filter((span) => !pathTypes.has(span.canonical_name));
  const orderedPath = [...path, ...extraSpans.filter((span) => span.canonical_name === 'turn.failed')];

  const storyCore = {
    engineChoice,
    shadowChoice,
    extrasMode,
    extrasDecision,
    extrasActiveDomain,
    extrasDomainSource,
    muteFlags,
  };

  return {
    trace,
    engineChoice,
    engineMode: str(engine, 'mode'),
    engineDeliberation: str(engine, 'deliberation'),
    engineCandidates: num(engine, 'candidateCount'),
    engineConstraintCount: num(engine, 'constraintCount'),
    shadowChoice,
    shadowMode: str(shadow, 'mode'),
    shadowDeliberation: str(shadow, 'deliberation'),
    modality: str(planned, 'modality'),
    conversionSuppression: str(planned, 'conversionSuppression'),
    experienceMode: str(evaluated, 'mode'),
    extrasMode,
    extrasDecision,
    extrasApplied: bool(extras, 'applied'),
    extrasActiveDomain,
    extrasDomainSource,
    extrasThirdPartyBand: str(extras, 'thirdPartyBand'),
    extrasReasonCodes: strList(extras, 'reasonCodes'),
    extrasCandidateKindsBefore: strList(extras, 'candidateKindsBefore'),
    extrasCandidateKindsAfter: strList(extras, 'candidateKindsAfter'),
    extrasSelectedKind: str(extras, 'selectedCandidateKind'),
    extrasCountBefore: num(extras, 'candidateCountBefore'),
    extrasCountAfter: num(extras, 'candidateCountAfter'),
    muteFlags,
    domainCandidate: str(started, 'domainCandidate'),
    slice: str(relational, 'slice'),
    stance: str(relational, 'stance'),
    safetyRoute: str(safety, 'safetyRoute') ?? str(engine, 'safetyRoute') ?? str(started, 'safetyRoute'),
    riskClass: str(safety, 'riskClass') ?? str(engine, 'riskClass') ?? str(state, 'riskClass') ?? str(started, 'riskClass'),
    personaGrant: str(persona, 'personaGrant'),
    activationBand: str(state, 'activationBand'),
    loadBand: str(state, 'loadBand'),
    opennessBand: str(state, 'opennessBand'),
    timeBand: str(state, 'timeBand'),
    directionBand: str(trajectory, 'directionBand'),
    claimType: str(state, 'claimType'),
    cue: str(evaluated, 'cue'),
    reason: str(evaluated, 'reason'),
    ttftMs: num(completed, 'ttftMs'),
    surface: str(started, 'surface') ?? trace.surface ?? null,
    transport: str(started, 'transport') ?? trace.transport ?? null,
    packId: str(started, 'packId') ?? trace.pack_id ?? null,
    consentPurposeCount: num(consent, 'purposeDecisionCount'),
    familyCarried: extrasActiveDomain === 'family' && extrasDomainSource === 'carried',
    split,
    headline: headlineFor(storyCore),
    path: orderedPath.length > 0 ? orderedPath : trace.spans,
  };
}

export type PipelineSlot = {
  eventType: string;
  optional: boolean;
  span: TraceSpan | null;
  status: 'present' | 'skipped' | 'optional_absent';
};

export function pipelineSlots(trace: TraceEnvelope): PipelineSlot[] {
  const failed = trace.spans.some((span) => span.canonical_name === 'turn.failed');
  const slots: PipelineSlot[] = PIPELINE_EVENTS.map((eventType) => {
    const span = spanOf(trace, eventType) ?? null;
    const optional = PIPELINE_OPTIONAL.has(eventType);
    if (span) return { eventType, optional, span, status: 'present' as const };
    if (failed && (eventType === 'turn.completed' || eventType === 'extras.evaluated' || eventType === 'decision.shadowed' || eventType === 'relational.shadowed' || eventType === 'experience.evaluated')) {
      return { eventType, optional: true, span: null, status: 'optional_absent' as const };
    }
    if (optional) return { eventType, optional, span: null, status: 'optional_absent' as const };
    return { eventType, optional, span: null, status: 'skipped' as const };
  });
  const failedSpan = spanOf(trace, 'turn.failed');
  if (failedSpan) {
    const completedAt = slots.findIndex((slot) => slot.eventType === 'turn.completed');
    slots.splice(completedAt + 1, 0, {
      eventType: 'turn.failed',
      optional: true,
      span: failedSpan,
      status: 'present',
    });
  }
  return slots;
}

export function formatTurnWhen(iso: string): string {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return 'Sin hora';
  return date.toLocaleString('es', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function secondsSince(iso: string | null | undefined, now = Date.now()): number | null {
  if (!iso) return null;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return null;
  return Math.max(0, Math.round((now - ms) / 1000));
}

export function structuredEntries(span: TraceSpan): Array<[string, StructuredValue]> {
  return Object.entries(span.structured).filter(([, value]) => {
    if (value == null || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  });
}
