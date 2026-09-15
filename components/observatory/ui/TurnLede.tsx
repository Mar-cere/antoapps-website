import { CopyRef } from '@/components/observatory/ui/CopyRef';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { factLabel } from '@/lib/observatory/copy/labels';
import { formatTurnWhen, type TurnDecisionStory } from '@/lib/observatory/data/turnDecision';
import type { TraceEnvelope } from '@/lib/observatory/data/types';

export function TurnLede({
  story,
  trace,
}: {
  story: TurnDecisionStory;
  trace: TraceEnvelope;
}) {
  return (
    <section className="decision-lead">
      <p className="decision-headline">{story.headline}</p>
      <p className="s">
        <CopyRef label="sesión" value={trace.session_ref} />
        {' · '}
        <CopyRef label="quién" value={trace.subject_ref} />
        {' · '}
        {formatTurnWhen(trace.started_at)}
        {' · '}
        {factLabel(story.surface)}
        {story.transport ? ` · ${factLabel(story.transport)}` : ''}
        {' · '}
        <Provenance kind={trace.provenance} />
      </p>
    </section>
  );
}
