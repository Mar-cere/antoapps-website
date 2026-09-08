'use client';

import { useMemo } from 'react';
import { useObservatory } from '@/components/shell/ObservatoryProvider';
import { SimControls } from '@/components/live/SimControls';
import { Provenance } from '@/components/ui/Provenance';
import { StatusMark } from '@/components/ui/StatusMark';
import { COMPONENT_LABELS, STAGE_LABELS } from '@/lib/copy/labels';
import type { PipelineStageId } from '@/lib/data/types';

export function LiveView() {
  const { snapshot, scenario, selectedStageId, selectStage } = useObservatory();
  const trace = snapshot.traces[0];
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
      <SimControls />
      <p className="s">
        {scenario.content_minimized} · {scenario.subject_ref} · <Provenance kind="simulated" />
      </p>

      <div className="flow">
        <div className="flow-track">
          {trace?.spans.map((span, i) => (
            <button
              key={span.span_id}
              type="button"
              className="flow-node"
              aria-selected={selected?.stage_id === span.stage_id}
              onClick={() => selectStage(span.stage_id)}
            >
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <strong>{STAGE_LABELS[span.stage_id]}</strong>
                <span className="s" style={{ display: 'block' }}>
                  {COMPONENT_LABELS[span.component]} · {span.canonical_name}
                </span>
              </span>
              <StatusMark status={span.status} />
            </button>
          ))}
        </div>

        <aside className="panel inspector">
          <h3>Inspector</h3>
          {!selected ? (
            <div className="empty">Selecciona un nodo o inicia la simulación.</div>
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
              <dd>{COMPONENT_LABELS[selected.component]}</dd>
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
    </div>
  );
}
