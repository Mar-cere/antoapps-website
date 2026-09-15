'use client';

import { MuteChips } from '@/components/observatory/ui/MuteChips';
import { choiceLabel, factLabel } from '@/lib/observatory/copy/labels';
import { domainLine, pickerExtrasLine } from '@/lib/observatory/copy/turnReading';
import { formatTurnWhen, storyFromTrace } from '@/lib/observatory/data/turnDecision';
import type { TraceEnvelope } from '@/lib/observatory/data/types';

type TurnPickerProps = {
  traces: TraceEnvelope[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function TurnPicker({ traces, selectedId, onSelect }: TurnPickerProps) {
  if (traces.length === 0) {
    return <div className="empty">No hay turnos en esta selección.</div>;
  }

  return (
    <div className="list turn-picker" role="listbox" aria-label="Turnos publicados">
      {traces.map((trace) => {
        const story = storyFromTrace(trace);
        const selected = trace.trace_id === selectedId;
        const domain = domainLine(story);
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
            <span className="turn-extra">{pickerExtrasLine(story)}</span>
            <span className="s">
              {formatTurnWhen(trace.started_at)} · {factLabel(story.surface)}
              {domain ? ` · ${domain}` : ''}
            </span>
            <MuteChips flags={story.muteFlags} />
          </button>
        );
      })}
    </div>
  );
}
