import type { ObservatorySnapshot, TraceEnvelope } from '@/lib/data/types';
import { PROGRAM } from '@/lib/data/fixtures/program';
import { SCENARIOS } from '@/lib/data/fixtures/scenarios';
import {
  AUTONOMY,
  COMPONENTS,
  DRIFT,
  EVAL_QUEUE,
  EXPERIMENTS,
  METRICS,
  STATIC_ACTIVITY,
  STATIC_ALERTS,
  STATIC_HYPOTHESES,
  STATIC_REVIEWS,
} from '@/lib/data/fixtures/observatory';

export function buildTrace(scenarioId: (typeof SCENARIOS)[number]['id']): TraceEnvelope {
  const scenario = SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) throw new Error(`Escenario desconocido: ${scenarioId}`);
  return {
    trace_id: scenario.decision.trace_ref,
    session_ref: scenario.session_ref,
    subject_ref: scenario.subject_ref,
    schema_version: 'trace_v1_sim',
    content_mode: 'off',
    started_at: '2026-09-08T13:40:00Z',
    completed_at: '2026-09-08T13:41:12Z',
    current_stage: 'outcomes_evals',
    spans: scenario.stages.map((stage, index) => ({
      span_id: `sp_${scenario.id}_${index}`,
      canonical_name: stage.canonical_name,
      stage_id: stage.stage_id,
      component: stage.component,
      status: stage.status_on_complete,
      duration_ms: stage.duration_ms,
      confidence: stage.confidence,
      result: stage.result,
      constraints_applied: stage.constraints_applied,
      structured: stage.structured,
      what_happened: stage.what_happened,
    })),
    provenance: 'simulated',
  };
}

export function buildStaticSnapshot(): ObservatorySnapshot {
  return {
    mode: 'simulation',
    system_lifecycle: 'idle',
    processing: 'Ningún turno en curso. Esta vista usa fixtures. Nexus no está en producción.',
    stage_label: 'En espera',
    current_stage: null,
    last_updated: PROGRAM.last_updated,
    components: COMPONENTS,
    alerts: STATIC_ALERTS,
    metrics: METRICS,
    activity: STATIC_ACTIVITY,
    program: PROGRAM,
    traces: SCENARIOS.map((s) => buildTrace(s.id)),
    decisions: SCENARIOS.map((s) => s.decision),
    plans: SCENARIOS.map((s) => s.experience),
    outcomes: SCENARIOS.flatMap((s) => s.outcomes),
    reviews: STATIC_REVIEWS,
    eval_queue: EVAL_QUEUE,
    hypotheses: STATIC_HYPOTHESES,
    experiments: EXPERIMENTS,
    drift: DRIFT,
    autonomy: AUTONOMY,
    evidence_freshness: {
      value: 'Sin surveillance en runtime',
      provenance: 'unavailable',
      note: 'Sprint 17.',
    },
    review_debt: {
      value: '1 ReviewCase IG1 abierto (simulado)',
      provenance: 'simulated',
    },
  };
}
