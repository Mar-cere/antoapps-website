'use client';

import Link from 'next/link';
import { TurnDecisionBoard } from '@/components/observatory/decisiones/TurnDecisionBoard';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { SurveillancePanel } from '@/components/observatory/ui/SurveillancePanel';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { storyFromTrace } from '@/lib/observatory/data/turnDecision';

export function ResumenView() {
  const { snapshot, scenario, play, demoPlayback, selectedTrace, selectTrace } = useObservatory();
  const live = selectedTrace ?? snapshot.traces[0] ?? null;
  const story = live ? storyFromTrace(live) : null;

  return (
    <div className="page">
      <header>
        <h2>Resumen</h2>
        <p>Último turno publicado y lo que pide atención. El reloj del encabezado dice si hay un turno en curso.</p>
      </header>

      {live && story ? (
        <section className="resumen-turn" aria-label="Último turno">
          <p className="decision-headline">{story.headline}</p>
          <TurnDecisionBoard story={story} density="glance" />
          <div className="controls">
            <Link href="/observatorio/en-vivo">Elegir otro turno</Link>
            <Link href="/observatorio/decisiones">Ver el detalle</Link>
            {demoPlayback ? (
              <button className="primary" type="button" onClick={play}>
                Iniciar simulación
              </button>
            ) : (
              <button type="button" className="copy-ref" onClick={() => selectTrace(live.trace_id)}>
                Fijar este turno
              </button>
            )}
          </div>
        </section>
      ) : (
        <section className="panel">
          <div className="empty">
            {demoPlayback
              ? 'No hay turno simulado. Inicia la simulación o espera un snapshot live.'
              : 'El runtime no publicó turnos en esta ventana.'}
            <div className="controls" style={{ marginTop: 12 }}>
              {demoPlayback ? (
                <button className="primary" type="button" onClick={play}>
                  Iniciar simulación
                </button>
              ) : null}
              <Link href="/observatorio/en-vivo">Abrir En vivo</Link>
            </div>
          </div>
        </section>
      )}

      <div className="split">
        <section className="panel">
          <h3>Pide atención</h3>
          {snapshot.alerts.length === 0 ? (
            <div className="empty">Nada derivado en esta ventana.</div>
          ) : (
            snapshot.alerts.map((alert) => (
              <Link key={alert.alert_id} href={alert.href} className="alert" data-sev={alert.severity}>
                <span className="t">{alert.title}</span>
                <span className="s">{alert.detail}</span>
              </Link>
            ))
          )}
        </section>
        <SurveillancePanel surveillance={snapshot.surveillance} live={!demoPlayback} />
      </div>

      {snapshot.metrics.length > 0 ? (
        <section>
          <h3 style={{ margin: '0 0 8px' }}>Cuentas de esta ventana</h3>
          <div className="metrics">
            {snapshot.metrics.map((m) => (
              <article key={m.metric_id} className="metric">
                <p className="label">{m.label}</p>
                <p className="value">{m.value}</p>
                <Provenance kind={m.provenance} />
                <details className="obs-fold">
                  <summary>Qué cuenta</summary>
                  <p>{m.definition}</p>
                  <p>{m.caveat}</p>
                </details>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {scenario && demoPlayback ? <p className="s">Escenario de demo: {scenario.title}.</p> : null}
    </div>
  );
}
