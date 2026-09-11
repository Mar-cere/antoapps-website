import type { ComponentId, PipelineStageId, ScenarioId, SpanStatus } from '@/lib/observatory/data/types';

export const STAGE_ORDER: PipelineStageId[] = [
  'user_message',
  'consent_check',
  'state_persona',
  'psyche_retrieval',
  'candidate_generation',
  'governance_filter',
  'deliberation',
  'experience_plan',
  'delivery',
  'outcomes_evals',
];

export const STAGE_LABELS: Record<PipelineStageId, string> = {
  user_message: 'Evento o mensaje',
  consent_check: 'Contexto y consentimiento',
  state_persona: 'State + Persona',
  psyche_retrieval: 'Recuperación de Psyche',
  candidate_generation: 'Generación de candidatos',
  governance_filter: 'Governance y seguridad',
  deliberation: 'Deliberación de Nexus',
  experience_plan: 'Experience Plan',
  delivery: 'Respuesta',
  outcomes_evals: 'Outcome y evaluaciones de Cortex',
};

export const COMPONENT_LABELS: Record<ComponentId | 'runtime', string> = {
  psyche: 'Psyche',
  persona: 'Persona',
  state: 'State + Trajectory',
  cortex: 'Cortex',
  nexus_engine: 'Nexus Engine',
  experience: 'Experience Intelligence',
  governance: 'Governance',
  runtime: 'Nexus Runtime',
};

export function stageLabel(id: string): string {
  return STAGE_LABELS[id as PipelineStageId] ?? TRACE_EVENT_LABELS[id] ?? id;
}

export const TRACE_EVENT_LABELS: Record<string, string> = {
  'turn.started': 'Turno iniciado',
  'turn.completed': 'Turno cerrado',
  'turn.failed': 'Turno fallido',
  'consent.checked': 'Consentimiento',
  'safety.routed': 'Ruta de safety',
  'state.estimated': 'State estimado',
  'decision.deliberated': 'Engine deliberó',
  'experience.planned': 'Experience planificado',
  'experience.evaluated': 'Experience evaluado',
  'extras.evaluated': 'Extras evaluados',
  'persona.snapshotted': 'Persona snapshot',
  'trajectory.estimated': 'Trajectory estimada',
  'decision.shadowed': 'Sombra de decisión',
  'relational.shadowed': 'Sombra relacional',
};

export function componentLabel(id: string): string {
  return COMPONENT_LABELS[id as ComponentId | 'runtime'] ?? id;
}

export function scenarioLabel(id: string): string {
  return SCENARIO_LABELS[id as ScenarioId] ?? id;
}

export const SCENARIO_LABELS: Record<ScenarioId, string> = {
  venting: 'Desahogo',
  couple_conflict: 'Conflicto de pareja',
  high_uncertainty: 'Incertidumbre: preguntar',
  governance_block: 'Governance bloquea',
  abstain_evidence: 'Abstención por evidencia',
  cortex_pattern: 'Patrón a revisar',
};

export const PROVENANCE_LABELS: Record<
  'simulated' | 'unavailable' | 'derived' | 'live_trace' | 'script_offline',
  string
> = {
  simulated: 'Simulado',
  unavailable: 'No está en este projector',
  derived: 'Vista derivada',
  live_trace: 'Traza live',
  script_offline: 'Script de ops',
};

export const MUTE_FLAG_LABELS: Record<string, string> = {
  soft_landing: 'soft_landing',
  crisis_extras: 'crisis_extras',
  hard_stop: 'hard_stop',
  protocol_93: 'protocol_93',
  soft_19: 'soft_19',
  safeguard_239: 'safeguard_239',
  reentry: 'reentry',
  guest: 'guest',
  canvas_open: 'canvas_open',
  technique_handoff: 'technique_handoff',
};

export const PIPELINE_EVENTS = [
  'turn.started',
  'consent.checked',
  'safety.routed',
  'state.estimated',
  'decision.deliberated',
  'experience.planned',
  'persona.snapshotted',
  'trajectory.estimated',
  'experience.evaluated',
  'extras.evaluated',
  'turn.completed',
  'decision.shadowed',
  'relational.shadowed',
] as const;

export const PIPELINE_PRE_LLM = PIPELINE_EVENTS.slice(0, 8);
export const PIPELINE_POST_RESPONSE = PIPELINE_EVENTS.slice(8);

export const PIPELINE_OPTIONAL = new Set<string>(['safety.routed']);

export const EPISTEMIC_LABELS = {
  observation: 'Observación',
  correlation: 'Correlación',
  hypothesis: 'Hipótesis',
  experiment: 'Experimento',
  confirmed_evidence: 'Evidencia confirmada',
  rejected_finding: 'Hallazgo rechazado',
} as const;

export const DECISION_ACT_LABELS = {
  listen: 'Escuchar',
  ask: 'Preguntar',
  structure: 'Estructurar',
  intervene: 'Intervenir',
  abstain: 'Abstenerse',
  blocked: 'Bloqueada',
} as const;

export const CHOICE_LABELS: Record<string, string> = {
  listen: 'Escuchar',
  ask: 'Preguntar',
  structure: 'Estructurar',
  intervene: 'Intervenir',
  abstain: 'Abstenerse',
  blocked: 'Bloqueada',
  validate: 'Validar',
  implicit_llm: 'Generación implícita',
};

export const SLICE_LABELS: Record<string, string> = {
  none: 'Sin slice relacional',
  vent: 'Desahogo',
  couple: 'Pareja',
  couple_and_vent: 'Pareja y desahogo',
};

export const DECISION_PATH_EVENTS = PIPELINE_EVENTS;

export function choiceLabel(value: string | null | undefined): string {
  if (value == null || value === '') return 'Sin dato';
  return CHOICE_LABELS[value] ?? value;
}

export function sliceLabel(value: string | null | undefined): string {
  if (value == null || value === '') return 'Sin dato';
  return SLICE_LABELS[value] ?? value;
}

export function factLabel(
  value: string | number | boolean | string[] | null | undefined
): string {
  if (Array.isArray(value)) return value.length ? value.join(' · ') : 'Ninguno';
  if (value == null || value === '') return 'Sin dato';
  if (value === 'unspecified') return 'Sin estimar';
  if (value === 'none') return 'Ninguna';
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  if (value === 'shadow') return 'shadow';
  if (value === 'applied') return 'applied';
  if (value === 'runtime') return 'runtime';
  if (value === 'carried') return 'carried';
  if (value === 'current') return 'current';
  return CHOICE_LABELS[String(value)] ?? SLICE_LABELS[String(value)] ?? MUTE_FLAG_LABELS[String(value)] ?? String(value);
}

export const SPAN_STATUS_LABELS: Record<SpanStatus, string> = {
  idle: 'En espera',
  queued: 'En cola',
  active: 'En curso',
  completed: 'Completado',
  failed: 'Fallido',
  warning: 'Advertencia',
  blocked: 'Bloqueado',
  skipped: 'Omitido',
};

export const EVALUATOR_QUESTIONS: Record<string, string> = {
  safety: '¿Hubo riesgo o incumplimiento?',
  epistemic: '¿Afirmó más de lo que sabía?',
  persona: '¿Usó memoria correcta y no intrusiva?',
  conversation: '¿Fue natural, clara y no repetitiva?',
  experience: '¿La forma y la carga fueron adecuadas?',
  outcome: '¿Qué cambió después?',
  autonomy: '¿Aumentó agencia o dependencia?',
};

export function participatingFor(stage: PipelineStageId | null): ComponentId[] {
  switch (stage) {
    case 'user_message':
      return [];
    case 'consent_check':
      return ['governance'];
    case 'state_persona':
      return ['persona', 'state'];
    case 'psyche_retrieval':
      return ['psyche'];
    case 'candidate_generation':
      return ['nexus_engine', 'psyche'];
    case 'governance_filter':
      return ['governance'];
    case 'deliberation':
      return ['nexus_engine', 'psyche', 'persona', 'cortex'];
    case 'experience_plan':
    case 'delivery':
      return ['experience'];
    case 'outcomes_evals':
      return ['cortex'];
    default:
      return [];
  }
}
