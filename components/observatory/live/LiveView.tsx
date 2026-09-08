'use client';

import { useMemo } from 'react';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { SimControls } from '@/components/observatory/live/SimControls';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { componentLabel, stageLabel } from '@/lib/observatory/copy/labels';
import type { PipelineStageId } from '@/lib/observatory/data/types';

export function LiveView() {
  const { snapshot, scenario, selectedStageId, selectStage, demoPlayback } = useObservatory();
  const traces = snapshot.traces;
  const trace = traces[0];
  const selected = useMemo(() => {
    const id = (selectedStageId as PipelineStageId | null) ?? snapshot.current_stage;
    return trace?.spans.find((s) => s.stage_id === id) ?? null;
  }, [selectedStageId, snapshot.current_stage, trace]);

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
      ) : (
        <div className="flow">
          <div className="flow-track">
            {trace.spans.map((span, i) => (
              <button
                key={span.span_id}
                type="button"
                className="flow-node"
                aria-selected={selected?.stage_id === span.stage_id}
                onClick={() => selectStage(span.stage_id)}
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
              <dl>
                <dt>Qué ocurrió</dt>
                <dd>{selected.what_happened}</dd>
                <dt>Estado</dt>
                <dd>
                  <StatusMark status={selected.status} />
                </dd>
                <dt>Duración</dt>
                <dd>{selected.duration_ms == null ? 'Pendiente' : `${selected.duration_ms} ms`}</dd>
                <dt>Resultado</dt>
                <dd className="kv">{selected.result}</dd>
                <dt>Confianza</dt>
                <dd>{selected.confidence == null ? 'No aplica' : selected.confidence.toFixed(2)}</dd>
                <dt>Restricciones</dt>
                <dd>{selected.constraints_applied.join(', ') || 'Ninguna'}</dd>
                <dt>Componente</dt>
                <dd>{componentLabel(selected.component)}</dd>
                <dt>Datos estructurados</dt>
                <dd>
                  <pre className="kv" style={{ whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(selected.structured, null, 2)}
                  </pre>
                </dd>
              </dl>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
