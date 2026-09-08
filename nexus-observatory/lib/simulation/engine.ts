import type { PipelineStageId, ScenarioDefinition, SpanStatus, TraceSpan } from '@/lib/data/types';
import { STAGE_ORDER } from '@/lib/copy/labels';

/** Los ms de fixture son latencias de diseño. La UI las estira para que el recorrido se pueda seguir. */
export const DISPLAY_SCALE = 14;

export function displayDuration(ms: number): number {
  return ms * DISPLAY_SCALE;
}

export function totalDuration(scenario: ScenarioDefinition): number {
  return scenario.stages.reduce((sum, stage) => sum + displayDuration(stage.duration_ms), 0);
}

export function stageIndexAt(scenario: ScenarioDefinition, elapsedMs: number): number {
  if (elapsedMs <= 0) return -1;
  let acc = 0;
  for (let i = 0; i < scenario.stages.length; i += 1) {
    acc += displayDuration(scenario.stages[i].duration_ms);
    if (elapsedMs < acc) return i;
  }
  return scenario.stages.length - 1;
}

export function isFinished(scenario: ScenarioDefinition, elapsedMs: number): boolean {
  return elapsedMs >= totalDuration(scenario);
}

export function currentStageId(scenario: ScenarioDefinition, elapsedMs: number): PipelineStageId | null {
  const index = stageIndexAt(scenario, elapsedMs);
  if (index < 0) return null;
  return scenario.stages[index].stage_id;
}

export function liveSpans(scenario: ScenarioDefinition, elapsedMs: number): TraceSpan[] {
  const activeIndex = stageIndexAt(scenario, elapsedMs);
  let acc = 0;
  return scenario.stages.map((stage, index) => {
    const start = acc;
    const shown = displayDuration(stage.duration_ms);
    acc += shown;
    let status: SpanStatus = 'idle';
    let duration: number | null = null;
    if (activeIndex < 0) {
      status = 'idle';
    } else if (index < activeIndex) {
      status = stage.status_on_complete;
      duration = stage.duration_ms;
    } else if (index === activeIndex) {
      status = isFinished(scenario, elapsedMs) ? stage.status_on_complete : 'active';
      const progressed = Math.min(shown, Math.max(0, elapsedMs - start));
      duration = Math.round(progressed / DISPLAY_SCALE);
    }
    return {
      span_id: `sp_${scenario.id}_${index}`,
      canonical_name: stage.canonical_name,
      stage_id: stage.stage_id,
      component: stage.component,
      status,
      duration_ms: duration,
      confidence: status === 'idle' ? null : stage.confidence,
      result: status === 'idle' ? 'pendiente' : stage.result,
      constraints_applied: stage.constraints_applied,
      structured: stage.structured,
      what_happened: stage.what_happened,
    };
  });
}

export function stageStatus(spans: TraceSpan[], id: PipelineStageId): SpanStatus {
  return spans.find((s) => s.stage_id === id)?.status ?? 'idle';
}

export { STAGE_ORDER };
