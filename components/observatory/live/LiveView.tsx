'use client';

import { Fragment } from 'react';
import { TurnPicker } from '@/components/observatory/live/TurnPicker';
import { PipelineTape } from '@/components/observatory/live/PipelineTape';
import { SimControls } from '@/components/observatory/live/SimControls';
import { TurnDecisionBoard } from '@/components/observatory/decisiones/TurnDecisionBoard';
import { CopyRef } from '@/components/observatory/ui/CopyRef';
import { ObservatoryLegend } from '@/components/observatory/ui/ObservatoryLegend';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { TurnFilters } from '@/components/observatory/ui/TurnFilters';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { componentLabel, factLabel, TRACE_EVENT_LABELS } from '@/lib/observatory/copy/labels';
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
    scenario,
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
        <p>
          Cinta del pipeline real: pre-LLM, generación, post-respuesta. Un grafo de 7 componentes todos
          in_progress no es este tablero. Content-off.
        </p>
      </header>
      {demoPlayback ? <SimControls /> : null}
      <ObservatoryLegend />
      <TurnFilters value={filters} onChange={setFilters} count={filteredTraces.length} total={snapshot.traces.length} />
      {demoPlayback ? (
        <p className="s">
          {scenario.content_minimized} · {scenario.subject_ref} · <Provenance kind="simulated" />
        </p>
      ) : (
        <p className="s">
          {trace ? (
            <>
              <CopyRef label="sesión" value={trace.session_ref} /> ·{' '}
              <CopyRef label="sujeto" value={trace.subject_ref} /> · content {trace.content_mode}{' '}
              <Provenance kind={trace.provenance} />
            </>
          ) : (
            <>
              Sin turnos publicados. <Provenance kind="unavailable" />
            </>
          )}
        </p>
      )}

      {!trace ? (
        <div className="empty">
          {snapshot.traces.length === 0
            ? 'No hay turnos en este snapshot. GET /v1/observatory/snapshot debe publicar traces[].'
            : 'Ningún turno coincide con los filtros.'}
        </div>
      ) : (
        <div className="live-layout">
          <section className="turn-rail">
            <h3>Turnos</h3>
            <TurnPicker traces={filteredTraces} selectedId={trace.trace_id} onSelect={selectTrace} />
          </section>
          <div className="decision-main">
            {story ? <TurnDecisionBoard story={story} /> : null}
            <LiveFlow trace={trace} selected={selected} onSelectStage={selectStage} />
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
      <div>
        <h3>Cinta de pipeline</h3>
        <PipelineTape trace={trace} selectedId={selected?.stage_id} onSelect={onSelectStage} />
      </div>
      <aside className="panel inspector">
        <h3>Inspector del span</h3>
        {!selected ? <div className="empty">Selecciona un span emitido.</div> : <SpanInspector span={selected} />}
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
      <dt>Componente</dt>
      <dd>{componentLabel(span.component)}</dd>
      {entries.map(([key, value]) => (
        <Fragment key={key}>
          <dt>{key}</dt>
          <dd>{Array.isArray(value) ? value.join(' · ') || 'Ninguno' : factLabel(value)}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
