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
  return STAGE_LABELS[id as PipelineStageId] ?? id;
}

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

export const PROVENANCE_LABELS: Record<'simulated' | 'unavailable' | 'derived', string> = {
  simulated: 'Simulado',
  unavailable: 'Aún no disponible',
  derived: 'Vista derivada',
};

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
