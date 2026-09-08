'use client';

import { Fragment } from 'react';
import { TurnPicker } from '@/components/observatory/live/TurnPicker';
import { SimControls } from '@/components/observatory/live/SimControls';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { componentLabel, factLabel, stageLabel } from '@/lib/observatory/copy/labels';
import type { TraceEnvelope, TraceSpan } from '@/lib/observatory/data/types';

const HIDDEN_STRUCTURED = new Set(['transport', 'surface', 'packId', 'domainCandidate', 'intentCandidate']);

export function LiveView() {
  const {
    snapshot,
    selectedTrace,
    selectTrace,
    selectedStageId,
    selectStage,
    scenario,
    demoPlayback,
  } = useObservatory();
  const trace = selectedTrace;
  const selected =
    trace?.spans.find((span) => span.stage_id === selectedStageId) ??
    trace?.spans.find((span) => span.stage_id === snapshot.current_stage) ??
    trace?.spans[0] ??
    null;

  return (
    <div className="page">
      <header>
        <h2>En vivo</h2>
        <p>
          Recorrido de un turno: del mensaje a Cortex. Cada nodo es inspectable. Cortex evalúa
          después de la respuesta.
        </p>
      </header>
      {demoPlayback ? <SimControls /> : null}
      {demoPlayback ? (
        <p className="s">
          {scenario.content_minimized} · {scenario.subject_ref} · <Provenance kind="simulated" />
        </p>
      ) : (
        <p className="s">
          {trace
            ? `${trace.session_ref} · ${trace.subject_ref} · content ${trace.content_mode}`
            : 'Sin turnos publicados.'}{' '}
          {trace ? <Provenance kind={trace.provenance} /> : <Provenance kind="unavailable" />}
        </p>
      )}

      {!trace ? (
        <div className="empty">
          No hay turnos en este snapshot. El runtime debe publicar traces[] en GET /v1/observatory/snapshot.
          Contenido de conversación off.
        </div>
      ) : snapshot.traces.length > 1 ? (
        <div className="live-layout">
          <section className="panel">
            <h3>Turnos</h3>
            <TurnPicker traces={snapshot.traces} selectedId={trace.trace_id} onSelect={selectTrace} />
          </section>
          <LiveFlow trace={trace} selected={selected} onSelectStage={selectStage} demoPlayback={demoPlayback} />
        </div>
      ) : (
        <LiveFlow trace={trace} selected={selected} onSelectStage={selectStage} demoPlayback={demoPlayback} />
      )}
    </div>
  );
}

function LiveFlow({
  trace,
  selected,
  onSelectStage,
  demoPlayback,
}: {
  trace: TraceEnvelope;
  selected: TraceSpan | null;
  onSelectStage: (id: string) => void;
  demoPlayback: boolean;
}) {
  return (
    <div className="flow">
      <div className="flow-track">
        {trace.spans.map((span, i) => (
          <button
            key={span.span_id}
            type="button"
            className="flow-node"
            aria-selected={selected?.span_id === span.span_id}
            onClick={() => onSelectStage(span.stage_id)}
          >
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <strong>{stageLabel(span.stage_id)}</strong>
              <span className="s" style={{ display: 'block' }}>
                {componentLabel(span.component)} · {span.canonical_name}
              </span>
            </span>
            <StatusMark status={span.status} />
          </button>
        ))}
      </div>

      <aside className="panel inspector">
        <h3>Inspector</h3>
        {!selected ? (
          <div className="empty">
            {demoPlayback ? 'Selecciona un nodo o inicia la simulación.' : 'Selecciona un nodo del recorrido.'}
          </div>
        ) : (
          <SpanInspector span={selected} />
        )}
      </aside>
    </div>
  );
}

function SpanInspector({ span }: { span: TraceSpan }) {
  const entries = Object.entries(span.structured).filter(([key, value]) => {
    if (HIDDEN_STRUCTURED.has(key)) return false;
    if (value == null || value === '') return false;
    return true;
  });

  return (
    <dl>
      <dt>Qué ocurrió</dt>
      <dd>{span.what_happened}</dd>
      <dt>Estado</dt>
      <dd>
        <StatusMark status={span.status} />
      </dd>
      <dt>Duración</dt>
      <dd>{span.duration_ms == null ? 'Pendiente' : `${span.duration_ms} ms`}</dd>
      <dt>Resultado</dt>
      <dd>{factLabel(span.result)}</dd>
      <dt>Confianza</dt>
      <dd>{span.confidence == null ? 'No aplica' : span.confidence.toFixed(2)}</dd>
      <dt>Restricciones</dt>
      <dd>{span.constraints_applied.join(', ') || 'Ninguna'}</dd>
      <dt>Componente</dt>
      <dd>{componentLabel(span.component)}</dd>
      {entries.map(([key, value]) => (
        <Fragment key={key}>
          <dt>{key}</dt>
          <dd>{factLabel(value)}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
