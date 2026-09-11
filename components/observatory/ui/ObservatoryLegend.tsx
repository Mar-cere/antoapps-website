export function ObservatoryLegend() {
  return (
    <section className="obs-legend" aria-label="Leyenda de lectura">
      <p>
        <strong>Candidato</strong> es una banda o domainCandidate del turno. No es un hecho clínico.
      </p>
      <p>
        <strong>Hecho de runtime</strong> es un evento emitido: choice, muteFlags, extras.mode, safetyRoute.
      </p>
      <p>
        <strong>runtime</strong> decide ahora. <strong>shadow</strong> observa y no muta. <strong>applied</strong> el
        canary mutó o habría mutado el payload.
      </p>
      <p>
        <strong>live_trace</strong> sale de nexus_turn_traces. <strong>derived</strong> es recuento del projector.{' '}
        <strong>unavailable</strong> no está en este poll. <strong>script_offline</strong> es Cortex / ReviewCases /
        gates, no Render /health.
      </p>
    </section>
  );
}
