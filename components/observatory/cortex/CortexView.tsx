'use client';

import { SurveillancePanel } from '@/components/observatory/ui/SurveillancePanel';
import { ObservatoryLegend } from '@/components/observatory/ui/ObservatoryLegend';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';

export function CortexView() {
  const { snapshot, demoPlayback } = useObservatory();

  return (
    <div className="page">
      <header>
        <h2>Cortex</h2>
        <p>
          La vigilancia no vive en el poll de Render. Este projector deja reviews, hipótesis, eval_queue,
          experimentos y drift vacíos a propósito.
        </p>
      </header>
      <ObservatoryLegend />
      <SurveillancePanel surveillance={snapshot.surveillance} live={!demoPlayback} />

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="row-between">
          <h3>Trazas de sombra en el snapshot live</h3>
          <Provenance kind={demoPlayback ? 'simulated' : 'live_trace'} />
        </div>
        <p className="s">
          decision.shadowed y relational.shadowed sí pueden aparecer en cada turno. Semantic Cortex
          (proposeSemanticHypotheses) y ReviewCases no.
        </p>
        {snapshot.traces.length === 0 ? (
          <div className="empty">Sin trazas en este snapshot.</div>
        ) : (
          snapshot.traces.slice(0, 12).map((t) => (
            <div key={t.trace_id} className="alert">
              <span className="t">{t.session_ref}</span>
              <span className="s">
                {t.subject_ref} · {t.spans.filter((s) => s.canonical_name.endsWith('.shadowed')).length} sombras ·{' '}
                <Provenance kind={t.provenance} />
              </span>
            </div>
          ))
        )}
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h3>Lo que no se finge</h3>
        <ul className="plain-list">
          <li>reviews[] vacío — no hay ReviewCase en este projector</li>
          <li>hypotheses[] vacío — Semantic Cortex es script_offline</li>
          <li>eval_queue[] vacío — Eval Mesh de producción no se lee aquí</li>
          <li>experiments[] y drift[] vacíos — no hay canary porcentual ni bandits en este tablero</li>
          <li>LG5 skipped · LG6 blocked · nunca status approved</li>
        </ul>
        <p className="s">
          Deuda de revisión: {snapshot.review_debt.value}. Frescura: {snapshot.evidence_freshness.value}.
        </p>
      </section>
    </div>
  );
}
