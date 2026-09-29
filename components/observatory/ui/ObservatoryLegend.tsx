export function ObservatoryLegend() {
  return (
    <details className="obs-fold">
      <summary>Cómo leer este tablero</summary>
      <div className="obs-legend">
        <p>El dato grande es lo que pasó. Lo demás es contexto.</p>
        <p>
          <strong>Candidato</strong> es una banda estimada, no un hecho clínico.{' '}
          <strong>No insertó</strong> significa que extras calculó y el chat no cambió.{' '}
          <strong>Podía insertar</strong> es el modo applied: el canary está vivo aunque el payload haya quedado vacío.
        </p>
        <p>Cortex, reviews y gates no viven en este poll. No se rellenan con ceros.</p>
      </div>
    </details>
  );
}
