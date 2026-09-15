'use client';

import { SurveillancePanel } from '@/components/observatory/ui/SurveillancePanel';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { TRACE_EVENT_LABELS } from '@/lib/observatory/copy/labels';

export function CortexView() {
  const { snapshot, demoPlayback } = useObservatory();

  return (
    <div className="page">
      <header>
        <h2>Cortex</h2>
        <p>Esta vista no inventa vigilancia. Reviews, hipótesis y gates viven fuera de este poll.</p>
      </header>
      <SurveillancePanel surveillance={snapshot.surveillance} live={!demoPlayback} />

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="row-between">
          <h3>Sombras en los turnos</h3>
          <Provenance kind={demoPlayback ? 'simulated' : 'live_trace'} />
        </div>
        <p className="s">decision.shadowed y relational.shadowed pueden aparecer en el turno. Semantic Cortex no.</p>
        {snapshot.traces.length === 0 ? (
          <div className="empty">Sin turnos en esta ventana.</div>
        ) : (
          snapshot.traces.slice(0, 12).map((t) => {
            const shadows = t.spans.filter((s) => s.canonical_name.endsWith('.shadowed'));
            return (
              <div key={t.trace_id} className="alert">
                <span className="t">{t.session_ref}</span>
                <span className="s">
                  {shadows.length === 0
                    ? 'Sin sombras en este turno'
                    : shadows.map((s) => TRACE_EVENT_LABELS[s.canonical_name] ?? s.canonical_name).join(' · ')}
                  {' · '}
                  <Provenance kind={t.provenance} />
                </span>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
