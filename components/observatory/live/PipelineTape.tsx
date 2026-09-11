import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { PIPELINE_POST_RESPONSE, PIPELINE_PRE_LLM, TRACE_EVENT_LABELS } from '@/lib/observatory/copy/labels';
import { pipelineSlots, type PipelineSlot } from '@/lib/observatory/data/turnDecision';
import type { TraceEnvelope } from '@/lib/observatory/data/types';

export function PipelineTape({
  trace,
  selectedId,
  onSelect,
}: {
  trace: TraceEnvelope;
  selectedId?: string | null;
  onSelect?: (stageId: string) => void;
}) {
  const slots = pipelineSlots(trace);
  const byType = new Map(slots.map((slot) => [slot.eventType, slot]));
  const pre = PIPELINE_PRE_LLM.map((eventType) => byType.get(eventType)).filter((slot): slot is PipelineSlot => Boolean(slot));
  const post = PIPELINE_POST_RESPONSE.map((eventType) => byType.get(eventType)).filter(
    (slot): slot is PipelineSlot => Boolean(slot)
  );
  const failed = byType.get('turn.failed');

  return (
    <div className="pipeline-board" aria-label="Pipeline del turno">
      <section className="pipeline-phase">
        <h4>Pre-LLM · puede entrar en TTFT</h4>
        <SlotList slots={pre} selectedId={selectedId} onSelect={onSelect} />
      </section>
      <p className="pipeline-gen" role="note">
        Generación LLM o plantilla hard-stop. No es evento de traza. conversation_progression_v1 es cálculo CPU, no
        span. Cortex no entra aquí.
      </p>
      <section className="pipeline-phase">
        <h4>Post-respuesta · no entra en TTFT</h4>
        <SlotList
          slots={failed?.status === 'present' ? insertAfter(post, 'turn.completed', failed) : post}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </section>
    </div>
  );
}

function insertAfter(slots: PipelineSlot[], eventType: string, extra: PipelineSlot): PipelineSlot[] {
  const index = slots.findIndex((slot) => slot.eventType === eventType);
  if (index < 0) return [...slots, extra];
  return [...slots.slice(0, index + 1), extra, ...slots.slice(index + 1)];
}

function SlotList({
  slots,
  selectedId,
  onSelect,
}: {
  slots: PipelineSlot[];
  selectedId?: string | null;
  onSelect?: (stageId: string) => void;
}) {
  return (
    <ol className="pipeline-tape" aria-label="Spans del tramo">
      {slots.map((slot) => {
        const label = TRACE_EVENT_LABELS[slot.eventType] ?? slot.eventType;
        const selected = slot.span != null && slot.span.stage_id === selectedId;
        if (!slot.span) {
          return (
            <li key={slot.eventType} className="pipeline-slot" data-status={slot.status}>
              <strong>{label}</strong>
              <span className="s">
                {slot.status === 'optional_absent'
                  ? slot.eventType === 'safety.routed'
                    ? 'No emitido (solo si hay transición de crisis)'
                    : slot.eventType === 'turn.failed'
                      ? 'No emitido (el turno cerró)'
                      : 'No exigido en este cierre'
                  : 'No emitido en este turno'}
              </span>
            </li>
          );
        }
        const inner = (
          <>
            <strong>{label}</strong>
            <StatusMark status={slot.span.status} />
          </>
        );
        if (!onSelect) {
          return (
            <li key={slot.eventType} className="pipeline-slot" data-status="present">
              {inner}
            </li>
          );
        }
        return (
          <li key={slot.eventType} className="pipeline-slot" data-status="present" data-selected={selected ? 'yes' : 'no'}>
            <button type="button" aria-selected={selected} onClick={() => onSelect(slot.span!.stage_id)}>
              {inner}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
