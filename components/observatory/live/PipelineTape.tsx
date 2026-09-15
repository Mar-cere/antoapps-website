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
  const preAll = PIPELINE_PRE_LLM.map((eventType) => byType.get(eventType)).filter((slot): slot is PipelineSlot => Boolean(slot));
  const postAll = PIPELINE_POST_RESPONSE.map((eventType) => byType.get(eventType)).filter(
    (slot): slot is PipelineSlot => Boolean(slot)
  );
  const failed = byType.get('turn.failed');
  const postWithFail = failed?.status === 'present' ? insertAfter(postAll, 'turn.completed', failed) : postAll;
  const pre = preAll.filter((slot) => slot.status === 'present');
  const post = postWithFail.filter((slot) => slot.status === 'present');
  const absent = [...preAll, ...postWithFail].filter((slot) => slot.status !== 'present');

  return (
    <div className="pipeline-board" aria-label="Línea de tiempo del turno">
      <section className="pipeline-phase">
        <h4>Antes de generar</h4>
        <SlotList slots={pre} selectedId={selectedId} onSelect={onSelect} empty="Nada emitido antes del modelo." />
      </section>
      <p className="pipeline-gen" role="note">
        Aquí el modelo genera. No es un evento de traza.
      </p>
      <section className="pipeline-phase">
        <h4>Después de responder</h4>
        <SlotList slots={post} selectedId={selectedId} onSelect={onSelect} empty="Nada emitido después de la respuesta." />
      </section>
      {absent.length > 0 ? (
        <details className="obs-fold">
          <summary>
            {absent.length} {absent.length === 1 ? 'paso no emitido' : 'pasos no emitidos'}
          </summary>
          <ul className="pipeline-absent">
            {absent.map((slot) => (
              <li key={slot.eventType}>
                {TRACE_EVENT_LABELS[slot.eventType] ?? slot.eventType}
                {slot.eventType === 'safety.routed' ? ' — solo si hay crisis' : ''}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
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
  empty,
}: {
  slots: PipelineSlot[];
  selectedId?: string | null;
  onSelect?: (stageId: string) => void;
  empty: string;
}) {
  if (slots.length === 0) {
    return <p className="s">{empty}</p>;
  }
  return (
    <ol className="pipeline-tape" aria-label="Eventos emitidos">
      {slots.map((slot) => {
        const label = TRACE_EVENT_LABELS[slot.eventType] ?? slot.eventType;
        const selected = slot.span != null && slot.span.stage_id === selectedId;
        if (!slot.span) return null;
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
