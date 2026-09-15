'use client';

import { TurnPicker } from '@/components/observatory/live/TurnPicker';
import { PipelineTape } from '@/components/observatory/live/PipelineTape';
import { TurnDecisionBoard } from '@/components/observatory/decisiones/TurnDecisionBoard';
import { ObservatoryLegend } from '@/components/observatory/ui/ObservatoryLegend';
import { TurnFilters } from '@/components/observatory/ui/TurnFilters';
import { TurnLede } from '@/components/observatory/ui/TurnLede';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { factLabel, sliceLabel } from '@/lib/observatory/copy/labels';
import { storyFromTrace } from '@/lib/observatory/data/turnDecision';

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
            <TurnPicker traces={filteredTraces} selectedId={selectedTrace.trace_id} onSelect={selectTrace} />
          </section>
          <div className="decision-main">
            <TurnLede story={story} trace={selectedTrace} />
            <TurnDecisionBoard story={story} density="full" />
            <dl className="inspector decision-facts">
              <dt>Consentimiento</dt>
              <dd>
                {story.consentPurposeCount == null
                  ? 'Este turno no trajo consentimiento.'
                  : `${story.consentPurposeCount} finalidades. El deny de purpose no silencia extras.`}
              </dd>
              <dt>Estado</dt>
              <dd>
                {factLabel(story.claimType)} · activación {factLabel(story.activationBand)} · carga{' '}
                {factLabel(story.loadBand)} · apertura {factLabel(story.opennessBand)} · tiempo {factLabel(story.timeBand)}
              </dd>
              <dt>Trayectoria</dt>
              <dd>{factLabel(story.directionBand)}</dd>
              <dt>Persona</dt>
              <dd>{factLabel(story.personaGrant)}</dd>
              <dt>Relación (sombra)</dt>
              <dd>
                {sliceLabel(story.slice)} · {factLabel(story.stance)}
              </dd>
              <dt>TTFT</dt>
              <dd>{story.ttftMs == null ? 'No medida' : `${story.ttftMs} ms`}</dd>
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
