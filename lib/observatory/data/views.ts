import type { ObservatorySnapshot, TraceEnvelope } from '@/lib/observatory/data/types';
import { PROGRAM } from '@/lib/observatory/data/fixtures/program';
import { RUNTIME_TURNS } from '@/lib/observatory/data/fixtures/runtimeTurns';
import { SCENARIOS } from '@/lib/observatory/data/fixtures/scenarios';
import { COMPONENTS } from '@/lib/observatory/data/fixtures/observatory';
import { enrichScenarioSpans } from '@/lib/observatory/data/simRuntime';

export function buildTrace(scenarioId: (typeof SCENARIOS)[number]['id']): TraceEnvelope {
  const scenario = SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) throw new Error(`Escenario desconocido: ${scenarioId}`);
  const spans = enrichScenarioSpans(
    scenario.id,
    scenario.stages.map((stage, index) => ({
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
    }))
  );
  return {
    trace_id: scenario.decision.trace_ref,
    session_ref: scenario.session_ref,
    subject_ref: scenario.subject_ref,
    schema_version: 'trace_v1_sim',
    content_mode: 'off',
    started_at: '2026-09-08T13:40:00Z',
    completed_at: '2026-09-08T13:41:12Z',
    current_stage: 'turn.completed',
    spans,
    pack_id: 'sim',
    surface: 'registered',
    transport: 'http',
    provenance: 'simulated',
  };
}

export function buildStaticSnapshot(): ObservatorySnapshot {
  return {
    mode: 'simulation',
    system_lifecycle: 'idle',
    in_flight: false,
    last_event_at: RUNTIME_TURNS[0]?.completed_at ?? null,
    pack_id: 'ia-14',
    processing: 'En espera. Esta vista usa fixtures. No es un turno live ni /health.',
    stage_label: 'En espera',
    current_stage: null,
    last_updated: PROGRAM.last_updated,
    components: COMPONENTS,
    alerts: [
      {
        alert_id: 'extras_applied_soft_landing',
        severity: 'warning',
        title: 'Canary de extras con mute soft_landing',
        detail:
          'Fixture: extras.mode=applied y muteFlags.soft_landing. El canary está vivo; el inventario gobernado puede estar vacío.',
        related_component: 'experience',
        href: '/observatorio/decisiones',
        provenance: 'simulated',
      },
    ],
    metrics: [],
    activity: [],
    program: PROGRAM,
    traces: [...RUNTIME_TURNS, ...SCENARIOS.map((s) => buildTrace(s.id))],
    decisions: [],
    plans: [],
    outcomes: [],
    reviews: [],
    eval_queue: [],
    hypotheses: [],
    experiments: [],
    drift: [],
    autonomy: [],
    surveillance: {
      provenance: 'simulated',
      source: 'script_offline',
      command: 'node backend/scripts/reportNexusReviewCases.js --days=7',
      note: 'Fixtures. Cortex, Evidence Surveillance y launch gates no salen del poll live. En ops: correr el script.',
    },
    evidence_freshness: {
      value: 'Sin surveillance en este projector',
      provenance: 'unavailable',
      note: 'Sprint 17. No se lee warehouse de Cortex aquí.',
    },
    review_debt: {
      value: 'Sin ReviewCase en este projector',
      provenance: 'unavailable',
      note: 'El ReviewCase de fixtures no se presenta como live.',
    },
  };
}
