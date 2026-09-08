'use client';

import Link from 'next/link';
import { useObservatory } from '@/components/shell/ObservatoryProvider';
import { Provenance } from '@/components/ui/Provenance';
import { StatusMark } from '@/components/ui/StatusMark';
import { COMPONENT_LABELS, STAGE_LABELS } from '@/lib/copy/labels';
import type { ComponentId } from '@/lib/data/types';

const SWATCH: Record<ComponentId, string> = {
  psyche: 'var(--psyche)',
  persona: 'var(--persona)',
  state: 'var(--state)',
  cortex: 'var(--cortex)',
  nexus_engine: 'var(--nexus)',
  experience: 'var(--experience)',
  governance: 'var(--governance)',
};

export function ResumenView() {
  const { snapshot, scenario, play } = useObservatory();
  const sprint = snapshot.program.sprints.find((s) => s.sprint_no === snapshot.program.current_sprint);
  const live = snapshot.traces[0];
  const featured = snapshot.components.filter((c) =>
    ['psyche', 'persona', 'state', 'cortex', 'nexus_engine', 'experience', 'governance'].includes(c.id)
  );

  return (
    <div className="page">
      <header>
        <h2>Resumen</h2>
        <p>
          Qué está haciendo Nexus ahora, quién participa, qué se construye y dónde hay alerta.
          Nada de esto es producción: cada cifra lleva procedencia.
        </p>
      </header>

      <section className="band" aria-label="Estado general">
        <article>
          <p className="k">¿Nexus está activo?</p>
          <p className="v">
            <StatusMark status={snapshot.system_lifecycle} />
          </p>
          <p className="d">Runtime simulado. El motor de producción aún no existe (Sprint 7).</p>
        </article>
        <article>
          <p className="k">¿Qué está procesando?</p>
          <p className="v">{snapshot.system_lifecycle === 'idle' ? 'Nada en este momento' : scenario.title}</p>
          <p className="d">{snapshot.processing}</p>
        </article>
        <article>
          <p className="k">¿En qué etapa?</p>
          <p className="v">{snapshot.stage_label}</p>
          <p className="d">
            {snapshot.current_stage
              ? `Span canónico: ${STAGE_LABELS[snapshot.current_stage]}`
              : 'Cortex evalúa después de responder, nunca en el primer token.'}
          </p>
        </article>
        <article>
          <p className="k">¿Qué estamos construyendo?</p>
          <p className="v">Sprint {snapshot.program.current_sprint}</p>
          <p className="d">{sprint?.title}. {snapshot.program.phase_title}</p>
        </article>
      </section>

      <div className="split">
        <section className="panel">
          <div className="row-between">
            <h3>Sesión o proceso activo</h3>
            <Provenance kind="simulated" />
          </div>
          {snapshot.system_lifecycle === 'idle' ? (
            <div className="empty">
              No hay turno en curso. Inicia una simulación para ver el recorrido, o sigue las
              decisiones ya inspectables.
              <div className="controls" style={{ marginTop: 12 }}>
                <button className="primary" type="button" onClick={play}>
                  Iniciar simulación
                </button>
                <Link href="/en-vivo">Abrir En vivo</Link>
              </div>
            </div>
          ) : (
            <>
              <p>
                {scenario.content_minimized}
              </p>
              <p className="session-id">
                {scenario.subject_ref} · {scenario.session_ref} · {live?.trace_id}
              </p>
              <div className="mini-flow" aria-label="Etapas del turno">
                {live?.spans.map((span) => (
                  <button key={span.span_id} type="button" data-status={span.status} disabled>
                    {STAGE_LABELS[span.stage_id]}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="panel">
          <div className="row-between">
            <h3>Sprint actual</h3>
            <span className={`rag ${sprint?.rag}`}>{sprint?.rag}</span>
          </div>
          <p className="t">{sprint?.title}</p>
          <p className="s">{sprint?.rag_reason}</p>
          <p className="s">Capacidad: {sprint?.owner_capability}. Persona: {sprint?.owner_person}.</p>
          <div style={{ marginTop: 12 }}>
            <Link href="/roadmap">Ver programa completo</Link>
          </div>
        </section>
      </div>

      <section>
        <div className="row-between" style={{ marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>Componentes</h3>
          <span className="s">Participación del turno simulado, no madurez de producción</span>
        </div>
        <div className="comp-map">
          {featured.map((c) => (
            <article key={c.id} className={`comp-cell ${c.id === 'nexus_engine' ? 'wide' : ''}`}>
              <header>
                <span className="row-between" style={{ gap: 8 }}>
                  <span className="swatch" style={{ background: SWATCH[c.id] }} />
                  <h3>{COMPONENT_LABELS[c.id]}</h3>
                </span>
                <StatusMark status={c.lifecycle} />
              </header>
              <p>{c.role}</p>
              <p>{c.participating ? 'Participa ahora' : 'No está en el span actual'}.</p>
              <p>{c.program_status === 'planned_active' ? 'Programa: trabajo actual' : 'Programa: no implementado'}. {c.sprint_ref}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="split">
        <section className="panel">
          <h3>Alertas</h3>
          {snapshot.alerts.length === 0 ? (
            <div className="empty">No hay alertas en esta simulación.</div>
          ) : (
            snapshot.alerts.map((alert) => (
              <Link key={alert.alert_id} href={alert.href} className="alert" data-sev={alert.severity}>
                <span className="t">{alert.title}</span>
                <span className="s">{alert.detail}</span>
              </Link>
            ))
          )}
        </section>
        <section className="panel">
          <h3>Actividad reciente</h3>
          {snapshot.activity.map((item) => (
            <div key={item.activity_id} className="alert">
              <span className="t">{item.title}</span>
              <span className="s">{item.detail}</span>
            </div>
          ))}
        </section>
      </div>

      <section>
        <h3 style={{ margin: '0 0 8px' }}>Métricas principales</h3>
        <div className="metrics">
          {snapshot.metrics.map((m) => (
            <article key={m.metric_id} className="metric">
              <p className="label">{m.label}</p>
              <p className="value">{m.value}</p>
              <Provenance kind={m.provenance} />
              <details>
                <summary>Qué significa</summary>
                <p>{m.definition}</p>
                <p>{m.caveat}</p>
                <p>Familia: {m.family}. Engagement no se usa como beneficio.</p>
              </details>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
