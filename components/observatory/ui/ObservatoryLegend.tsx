export function ObservatoryLegend() {
  return (
    <details className="obs-fold">
      <summary>Cómo leer este tablero</summary>
      <div className="obs-legend">
        <p>El dato grande es lo que pasó. Lo demás es contexto.</p>
        <p>
          <strong>Candidato</strong> es una banda estimada, no un hecho clínico.{' '}
          <strong>No llegó al chat</strong> significa que extras calculó y no cambió el mensaje.{' '}
          <strong>Canary activo</strong> significa que extras está en modo applied; si dice que no insertó, el
          payload no trajo extra.
        </p>
        <p>Cortex, reviews y gates no viven en este poll. No se rellenan con ceros.</p>
      </div>
    </details>
  );
}
