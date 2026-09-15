'use client';

import { Fragment } from 'react';
import { TurnPicker } from '@/components/observatory/live/TurnPicker';
import { PipelineTape } from '@/components/observatory/live/PipelineTape';
import { SimControls } from '@/components/observatory/live/SimControls';
import { TurnDecisionBoard } from '@/components/observatory/decisiones/TurnDecisionBoard';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { TurnFilters } from '@/components/observatory/ui/TurnFilters';
import { TurnLede } from '@/components/observatory/ui/TurnLede';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { factLabel, structuredKeyLabel, TRACE_EVENT_LABELS } from '@/lib/observatory/copy/labels';
import { storyFromTrace, structuredEntries } from '@/lib/observatory/data/turnDecision';
import type { TraceEnvelope, TraceSpan } from '@/lib/observatory/data/types';

const HIDDEN_STRUCTURED = new Set(['transport', 'surface', 'packId']);

export function LiveView() {
  const {
    snapshot,
    selectedTrace,
    selectTrace,
    selectedStageId,
    selectStage,
    demoPlayback,
    filteredTraces,
    filters,
    setFilters,
  } = useObservatory();
  const trace = selectedTrace;
  const selected =
    trace?.spans.find((span) => span.stage_id === selectedStageId) ??
    trace?.spans.find((span) => span.canonical_name === snapshot.current_stage) ??
    trace?.spans[0] ??
    null;
  const story = trace ? storyFromTrace(trace) : null;

  return (
    <div className="page">
      <header>
        <h2>En vivo</h2>
        <p>Elige un turno y lee qué decidió Nexus, qué extra hubo y qué se silenció.</p>
      </header>
      {demoPlayback ? <SimControls /> : null}
      <TurnFilters value={filters} onChange={setFilters} count={filteredTraces.length} total={snapshot.traces.length} />

      {!trace ? (
        <div className="empty">
          {snapshot.traces.length === 0
            ? 'El runtime no publicó turnos en esta ventana.'
            : 'Ningún turno coincide con los filtros.'}
        </div>
      ) : (
        <div className="live-layout">
          <section className="turn-rail">
            <h3>Turnos</h3>
            <TurnPicker traces={filteredTraces} selectedId={trace.trace_id} onSelect={selectTrace} />
          </section>
          <div className="decision-main">
            {story ? (
              <>
                <TurnLede story={story} trace={trace} />
                <TurnDecisionBoard story={story} density="glance" />
              </>
            ) : null}
            <details className="obs-fold pipeline-fold">
              <summary>Línea de tiempo</summary>
              <LiveFlow trace={trace} selected={selected} onSelectStage={selectStage} />
            </details>
          </div>
        </div>
      )}
    </div>
  );
}

function LiveFlow({
  trace,
  selected,
  onSelectStage,
}: {
  trace: TraceEnvelope;
  selected: TraceSpan | null;
  onSelectStage: (id: string) => void;
}) {
  return (
    <div className="flow">
      <PipelineTape trace={trace} selectedId={selected?.stage_id} onSelect={onSelectStage} />
      <aside className="panel inspector">
        <h3>Qué emitió este paso</h3>
        {!selected ? <div className="empty">Elige un paso de la línea de tiempo.</div> : <SpanInspector span={selected} />}
      </aside>
    </div>
  );
}

function SpanInspector({ span }: { span: TraceSpan }) {
  const entries = structuredEntries(span).filter(([key]) => !HIDDEN_STRUCTURED.has(key));
  return (
    <dl>
      <dt>Qué ocurrió</dt>
      <dd>{span.what_happened}</dd>
      <dt>Evento</dt>
      <dd>{TRACE_EVENT_LABELS[span.canonical_name] ?? span.canonical_name}</dd>
      <dt>Estado</dt>
      <dd>
        <StatusMark status={span.status} />
      </dd>
      <dt>Duración</dt>
      <dd>{span.duration_ms == null ? 'Pendiente' : `${span.duration_ms} ms`}</dd>
      {entries.map(([key, value]) => (
        <Fragment key={key}>
          <dt>{structuredKeyLabel(key)}</dt>
          <dd>{Array.isArray(value) ? value.map((item) => factLabel(item)).join(' · ') || 'Ninguno' : factLabel(value)}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
