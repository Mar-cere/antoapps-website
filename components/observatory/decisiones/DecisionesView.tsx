'use client';

import { TurnPicker } from '@/components/observatory/live/TurnPicker';
import { WeekReadingNote } from '@/components/observatory/ui/WeekReadingNote';
import { PipelineTape } from '@/components/observatory/live/PipelineTape';
import { TurnDecisionBoard } from '@/components/observatory/decisiones/TurnDecisionBoard';
import { ObservatoryLegend } from '@/components/observatory/ui/ObservatoryLegend';
import { TurnFilters } from '@/components/observatory/ui/TurnFilters';
import { TurnLede } from '@/components/observatory/ui/TurnLede';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { factLabel, isEmptyFact, sliceLabel } from '@/lib/observatory/copy/labels';
import { storyFromTrace } from '@/lib/observatory/data/turnDecision';

function ContextItem({ label, value }: { label: string; value: string | null | undefined }) {
  if (isEmptyFact(value)) return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function DecisionesView() {
  const { snapshot, selectedTrace, selectTrace, selectStage, selectedStageId, filteredTraces, filters, setFilters } =
    useObservatory();
  const story = selectedTrace ? storyFromTrace(selectedTrace) : null;
  const selectedSpan =
    story?.path.find((span) => span.stage_id === selectedStageId) ?? story?.path[0] ?? null;

  return (
    <div className="page">
      <header>
        <h2>Decisiones</h2>
        <p>Las cuatro decisiones del turno, con el detalle. Sin texto de conversación.</p>
      </header>
      <TurnFilters value={filters} onChange={setFilters} count={filteredTraces.length} total={snapshot.traces.length} />

      {!selectedTrace || !story ? (
        <div className="empty">
          {snapshot.traces.length === 0
            ? 'El runtime no publicó turnos en esta ventana.'
            : 'Ningún turno coincide con los filtros.'}
        </div>
      ) : (
        <div className="decision-layout">
          <section className="turn-rail">
            <h3>Turnos</h3>
            <WeekReadingNote stories={filteredTraces.map(storyFromTrace)} />
            <TurnPicker traces={filteredTraces} selectedId={selectedTrace.trace_id} onSelect={selectTrace} />
          </section>
          <div className="decision-main">
            <TurnLede story={story} trace={selectedTrace} />
            <TurnDecisionBoard story={story} density="full" />
            <dl className="turn-context" aria-label="Contexto del turno">
              <ContextItem
                label="Consentimiento"
                value={
                  story.consentPurposeCount == null ? null : `${story.consentPurposeCount} finalidades`
                }
              />
              <ContextItem
                label="Estado"
                value={[
                  factLabel(story.claimType),
                  isEmptyFact(factLabel(story.activationBand)) ? null : `activación ${factLabel(story.activationBand)}`,
                  isEmptyFact(factLabel(story.loadBand)) ? null : `carga ${factLabel(story.loadBand)}`,
                  isEmptyFact(factLabel(story.opennessBand)) ? null : `apertura ${factLabel(story.opennessBand)}`,
                  isEmptyFact(factLabel(story.timeBand)) ? null : factLabel(story.timeBand),
                ]
                  .filter(Boolean)
                  .join(' · ') || null}
              />
              <ContextItem label="Trayectoria" value={isEmptyFact(factLabel(story.directionBand)) ? null : factLabel(story.directionBand)} />
              <ContextItem label="Persona" value={isEmptyFact(factLabel(story.personaGrant)) ? null : factLabel(story.personaGrant)} />
              <ContextItem
                label="Relación"
                value={
                  !story.slice || story.slice === 'none'
                    ? factLabel(story.stance)
                    : `${sliceLabel(story.slice)} · ${factLabel(story.stance)}`
                }
              />
              <ContextItem label="TTFT" value={story.ttftMs == null ? null : `${story.ttftMs} ms`} />
            </dl>
            <details className="obs-fold pipeline-fold">
              <summary>Línea de tiempo</summary>
              <PipelineTape trace={selectedTrace} selectedId={selectedSpan?.stage_id} onSelect={selectStage} />
              {selectedSpan ? <p className="s">{selectedSpan.what_happened}</p> : null}
            </details>
            <ObservatoryLegend />
          </div>
        </div>
      )}
    </div>
  );
}
