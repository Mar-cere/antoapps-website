'use client';

import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { EPISTEMIC_LABELS, EVALUATOR_QUESTIONS } from '@/lib/observatory/copy/labels';

export function CortexView() {
  const { snapshot, demoPlayback } = useObservatory();
  const completed = snapshot.eval_queue.filter((e) => e.status === 'completed').length;
  const pending = snapshot.eval_queue.filter((e) => e.status === 'queued' || e.status === 'pending' || e.status === 'running');
  const failed = snapshot.eval_queue.filter((e) => e.status === 'failed');
  const lagValues = snapshot.eval_queue.map((e) => e.lag_ms).filter((n): n is number => n != null);
  const lag = lagValues.length ? Math.max(...lagValues) : null;

  return (
    <div className="page">
      <header>
        <h2>Cortex</h2>
        <p>
          Observación y aprendizaje después del turno. Una correlación no es una política. Un
          outcome inferido no es un outcome confirmado. Engagement no es beneficio.
        </p>
      </header>

      <section className="legend">
        {Object.entries(EPISTEMIC_LABELS).map(([k, label]) => (
          <span key={k} className={`epistemic ${k}`}>
            {label}
          </span>
        ))}
      </section>

      <section className="band" aria-label="Salud de Cortex">
        <article>
          <p className="k">Cola de evaluaciones</p>
          <p className="v">{pending.length} pendientes</p>
          <p className="d">
            {completed} completadas en este snapshot. Eval Mesh de producción es Sprint 12.
          </p>
        </article>
        <article>
          <p className="k">Retraso de evaluación</p>
          <p className="v">{lag == null ? 'No disponible' : `${lag} ms${demoPlayback ? ' (sim)' : ''}`}</p>
          <p className="d">No debe afectar TTFT. Cortex fuera del camino crítico.</p>
        </article>
        <article>
          <p className="k">Deuda de revisión</p>
          <p className="v">{snapshot.review_debt.value}</p>
          <p className="d">{snapshot.review_debt.note ?? 'Casos humanos, no FIFO puro.'}</p>
        </article>
        <article>
          <p className="k">Frescura de evidencia</p>
          <p className="v">{snapshot.evidence_freshness.value}</p>
          <p className="d">{snapshot.evidence_freshness.note}</p>
        </article>
      </section>

      <div className="three">
        <section className="panel">
          <h3>Trazas recientes</h3>
          {snapshot.traces.length === 0 ? (
            <div className="empty">Sin trazas en este snapshot.</div>
          ) : (
            snapshot.traces.map((t) => (
              <div key={t.trace_id} className="alert">
                <span className="t">{t.trace_id}</span>
                <span className="s">
                  {t.session_ref} · content {t.content_mode} · {t.spans.length} spans ·{' '}
                  <Provenance kind={t.provenance} />
                </span>
              </div>
            ))
          )}
        </section>
        <section className="panel">
          <h3>Eval Mesh</h3>
          {snapshot.eval_queue.length === 0 ? (
            <div className="empty">Sin evaluaciones en este snapshot. Eval Mesh es Sprint 12.</div>
          ) : (
            snapshot.eval_queue.map((e) => (
              <div key={e.eval_id} className="alert">
                <span className="t">{e.evaluator}</span>
                <span className="s">
                  {EVALUATOR_QUESTIONS[e.evaluator]} · {e.trace_ref}
                </span>
                <StatusMark
                  status={
                    e.status === 'completed'
                      ? 'completed'
                      : e.status === 'failed'
                        ? 'failed'
                        : e.status === 'running'
                          ? 'active'
                          : 'queued'
                  }
                />
              </div>
            ))
          )}
        </section>
        <section className="panel">
          <h3>Errores o anomalías</h3>
          {failed.length === 0 ? (
            <div className="empty">
              {demoPlayback
                ? 'Sin fallos de evaluator en el turno activo. Hay un fallo simulado en outcome de pareja.'
                : 'Sin fallos de evaluator en este snapshot.'}
            </div>
          ) : (
            failed.map((e) => (
              <div key={e.eval_id} className="alert" data-sev="failed">
                <span className="t">{e.evaluator} falló</span>
                <span className="s">No se edita el evento original. Se puede invalidar y recomputar.</span>
              </div>
            ))
          )}
          {snapshot.drift.map((d) => (
            <div key={d.monitor_id} className="alert">
              <span className="t">{d.name}</span>
              <span className="s">{d.detail}</span>
              <Provenance kind={d.provenance} />
            </div>
          ))}
        </section>
      </div>

      <div className="two">
        <section className="panel">
          <h3>Hipótesis y estado epistémico</h3>
          {snapshot.hypotheses.length === 0 ? (
            <div className="empty">Sin hipótesis en este snapshot.</div>
          ) : (
            snapshot.hypotheses.map((h) => (
              <article key={h.hypothesis_id} className="alert">
                <span className={`epistemic ${h.epistemic_status}`}>{EPISTEMIC_LABELS[h.epistemic_status]}</span>
                <p className="t">{h.title}</p>
                <p className="s">{h.cohort}</p>
                <p className="s">{h.proposed_test}</p>
                <p className="s">Incertidumbre: {h.uncertainty}</p>
              </article>
            ))
          )}
        </section>
        <section className="panel">
          <h3>Experimentos</h3>
          {snapshot.experiments.length === 0 ? (
            <div className="empty">Sin experimentos en este snapshot.</div>
          ) : (
            snapshot.experiments.map((e) => (
              <div key={e.experiment_id} className="alert">
                <span className="t">{e.status}</span>
                <p className="s">{e.hypothesis}</p>
                <p className="s">Primaria: {e.primary}</p>
                <p className="s">Guardrails: {e.guardrails.join(', ')}</p>
                <Provenance kind={e.provenance} />
              </div>
            ))
          )}
        </section>
      </div>

      <div className="two">
        <section className="panel">
          <h3>Outcomes</h3>
          {snapshot.outcomes.length === 0 ? (
            <div className="empty">Sin outcomes en este snapshot.</div>
          ) : (
            snapshot.outcomes.map((o) => (
              <div key={o.event_id} className="alert">
                <span className="t">
                  {o.horizon} · {o.outcome_type}
                </span>
                <span className="s">{o.definition}</span>
                <span className="s">
                  valor {o.value ?? 'n/a'} · fuente {o.source} · {o.missingness_reason ?? 'sin missingness'}
                </span>
                <Provenance kind={o.provenance} />
              </div>
            ))
          )}
        </section>
        <section className="panel">
          <h3>Señales de autonomía</h3>
          {snapshot.autonomy.length === 0 ? (
            <div className="empty">Sin señales de autonomía en este snapshot.</div>
          ) : (
            snapshot.autonomy.map((a) => (
              <div key={a.dimension} className="alert">
                <span className="t">{a.dimension}</span>
                <span className="s">Sano: {a.healthy_signal}</span>
                <span className="s">Riesgo: {a.risk_signal}</span>
                <span className="s">{a.current}</span>
                <Provenance kind={a.provenance} />
              </div>
            ))
          )}
        </section>
      </div>

      <section className="panel">
        <h3>Casos que requieren revisión humana</h3>
        {snapshot.reviews.length === 0 ? (
          <div className="empty">No hay ReviewCase en este snapshot.</div>
        ) : (
          snapshot.reviews.map((r) => (
            <article key={r.case_id} className="alert">
              <span className={`epistemic ${r.epistemic_status}`}>{EPISTEMIC_LABELS[r.epistemic_status]}</span>
              <p className="t">
                {r.case_id} · {r.trigger} · {r.impact_class}
              </p>
              <p className="s">
                Prioridad {r.review_priority} · vence {r.due_at} · {r.requested_decision}
              </p>
              <p className="s">Paquete: {r.evidence_pack.join(', ')} · PII {r.pii_mode}</p>
              <p className="s">SEV y IG no se convierten entre sí. Este caso no es una política aprobada.</p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
