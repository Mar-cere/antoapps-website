/**
 * Reconstruye la deliberación visible de un turno a partir de traces content-off.
 * No inventa DecisionRecord ni scores de candidatos.
 */
import { choiceLabel, DECISION_PATH_EVENTS } from '@/lib/observatory/copy/labels';
import type { TraceEnvelope, TraceSpan } from '@/lib/observatory/data/types';

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
  cue: string | null;
  reason: string | null;
  ttftMs: number | null;
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

function headlineFor(engine: string | null, shadow: string | null): string {
  if (!engine && !shadow) {
    return 'Este turno no trajo deliberación ni sombra. No inventamos un DecisionRecord.';
  }
  if (engine === 'abstain' && shadow === 'implicit_llm') {
    return 'El Engine se abstuvo. El texto igual se generó por el pipeline implícito. Eso no es un DecisionRecord de colección.';
  }
  if (engine === 'validate' && shadow === 'implicit_llm') {
    return 'El Engine eligió validar. La sombra sigue siendo generación implícita del modelo, no un acta con candidatos puntuados.';
  }
  if (engine && shadow && engine !== shadow) {
    return `El Engine eligió ${choiceLabel(engine).toLowerCase()}. La sombra del pipeline implícito registró ${choiceLabel(shadow).toLowerCase()}.`;
  }
  if (engine) {
    return `El Engine eligió ${choiceLabel(engine).toLowerCase()} en runtime. No hay cadena privada de razonamiento.`;
  }
  return `La sombra del pipeline registró ${choiceLabel(shadow).toLowerCase()}. Aún no hay DecisionRecord de Sprint 7.`;
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
  const completed = spanOf(trace, 'turn.completed');
  const started = spanOf(trace, 'turn.started');

  const engineChoice = str(engine, 'choice');
  const shadowChoice = str(shadow, 'choice');
  const split = Boolean(engineChoice && shadowChoice && engineChoice !== shadowChoice);

  const pathTypes = new Set<string>(DECISION_PATH_EVENTS);
  const path = trace.spans.filter((span) => pathTypes.has(span.canonical_name));

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
    slice: str(relational, 'slice'),
    stance: str(relational, 'stance'),
    safetyRoute: str(engine, 'safetyRoute') ?? str(started, 'safetyRoute'),
    riskClass: str(engine, 'riskClass') ?? str(state, 'riskClass'),
    personaGrant: str(persona, 'personaGrant'),
    activationBand: str(state, 'activationBand'),
    loadBand: str(state, 'loadBand'),
    opennessBand: str(state, 'opennessBand'),
    timeBand: str(state, 'timeBand'),
    directionBand: str(trajectory, 'directionBand'),
    cue: str(evaluated, 'cue'),
    reason: str(evaluated, 'reason'),
    ttftMs: num(completed, 'ttftMs'),
    split,
    headline: headlineFor(engineChoice, shadowChoice),
    path,
  };
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
