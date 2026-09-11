'use client';

import { TurnPicker } from '@/components/observatory/live/TurnPicker';
import { PipelineTape } from '@/components/observatory/live/PipelineTape';
import { TurnDecisionBoard } from '@/components/observatory/decisiones/TurnDecisionBoard';
import { CopyRef } from '@/components/observatory/ui/CopyRef';
import { ObservatoryLegend } from '@/components/observatory/ui/ObservatoryLegend';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { TurnFilters } from '@/components/observatory/ui/TurnFilters';
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
        <p>
          Qué decidió Nexus en este turno: Engine, Experience, extras y mute. DecisionRecord de colección sigue
          vacío a propósito. Sin texto de conversación.
        </p>
      </header>
      <ObservatoryLegend />
      <TurnFilters value={filters} onChange={setFilters} count={filteredTraces.length} total={snapshot.traces.length} />

      {!selectedTrace || !story ? (
        <div className="empty">
          {snapshot.traces.length === 0
            ? 'No hay turnos en este snapshot. El runtime publica traces[] en GET /v1/observatory/snapshot.'
            : 'Ningún turno coincide con los filtros.'}
        </div>
      ) : (
        <div className="decision-layout">
          <section className="turn-rail">
            <h3>Turnos</h3>
            <TurnPicker traces={filteredTraces} selectedId={selectedTrace.trace_id} onSelect={selectTrace} />
          </section>
          <div className="decision-main">
            <section className="decision-lead">
              <div className="row-between">
                <CopyRef label="sesión" value={selectedTrace.session_ref} />
                <Provenance kind={selectedTrace.provenance} />
              </div>
              <p className="decision-headline">{story.headline}</p>
              <p className="s">
                <CopyRef label="sujeto" value={selectedTrace.subject_ref} /> · content {selectedTrace.content_mode}
                {story.split ? ' · Engine y sombra no coinciden' : ''} · {factLabel(story.transport)}
              </p>
            </section>
            <TurnDecisionBoard story={story} />
            <dl className="inspector decision-facts">
              <dt>Consentimiento</dt>
              <dd>
                {story.consentPurposeCount == null
                  ? 'Sin consent.checked en este turno.'
                  : `${story.consentPurposeCount} decisions de finalidad. Purpose-deny no entra en muteFlags.`}
              </dd>
              <dt>State (candidato)</dt>
              <dd>
                {factLabel(story.claimType)} · activación {factLabel(story.activationBand)} · carga{' '}
                {factLabel(story.loadBand)} · apertura {factLabel(story.opennessBand)} · tiempo {factLabel(story.timeBand)}
              </dd>
              <dt>Trajectory</dt>
              <dd>{factLabel(story.directionBand)}</dd>
              <dt>Persona</dt>
              <dd>{factLabel(story.personaGrant)}</dd>
              <dt>Sombra relacional</dt>
              <dd>
                {sliceLabel(story.slice)} · {factLabel(story.stance)}. Series separadas; no hay KPI pareja OR desahogo.
              </dd>
              <dt>TTFT</dt>
              <dd>{story.ttftMs == null ? 'No medida' : `${story.ttftMs} ms. Cortex no entra aquí.`}</dd>
            </dl>
            <section className="decision-orbit">
              <h3>Cinta de pipeline</h3>
              <PipelineTape trace={selectedTrace} selectedId={selectedSpan?.stage_id} onSelect={selectStage} />
              {selectedSpan ? <p className="s">{selectedSpan.what_happened}</p> : null}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
