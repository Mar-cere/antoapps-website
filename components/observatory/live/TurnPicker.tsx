'use client';

import { choiceLabel } from '@/lib/observatory/copy/labels';
import { formatTurnWhen, storyFromTrace } from '@/lib/observatory/data/turnDecision';
import type { TraceEnvelope } from '@/lib/observatory/data/types';

type TurnPickerProps = {
  traces: TraceEnvelope[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function TurnPicker({ traces, selectedId, onSelect }: TurnPickerProps) {
  if (traces.length === 0) {
    return <div className="empty">No hay turnos publicados en este snapshot.</div>;
  }

  return (
    <div className="list turn-picker" role="listbox" aria-label="Turnos publicados">
      {traces.map((trace) => {
        const story = storyFromTrace(trace);
        const selected = trace.trace_id === selectedId;
        return (
          <button
            key={trace.trace_id}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onSelect(trace.trace_id)}
          >
            <span className="t">
              <span className="turn-star" data-choice={story.engineChoice ?? ''} aria-hidden="true" />
              {choiceLabel(story.engineChoice)}
            </span>
            <span className="s">
              {formatTurnWhen(trace.started_at)} · {trace.session_ref}
            </span>
          </button>
        );
      })}
    </div>
  );
}
