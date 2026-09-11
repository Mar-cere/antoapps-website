import { TRACE_EVENT_LABELS } from '@/lib/observatory/copy/labels';
import { pipelineSlots } from '@/lib/observatory/data/turnDecision';
import type { TraceEnvelope } from '@/lib/observatory/data/types';

export function TurnParticipation({ trace }: { trace: TraceEnvelope }) {
  const present = pipelineSlots(trace).filter((slot) => slot.status === 'present');
  if (present.length === 0) {
    return <div className="empty">Este turno no trajo spans reconocidos.</div>;
  }
  return (
    <ol className="participation-strip" aria-label="Eventos emitidos en este turno">
      {present.map((slot) => (
        <li key={slot.eventType}>
          <strong>{TRACE_EVENT_LABELS[slot.eventType] ?? slot.eventType}</strong>
          <span className="s">{slot.eventType}</span>
        </li>
      ))}
    </ol>
  );
}
