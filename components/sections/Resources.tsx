'use client';

import Link from 'next/link';

export default function Resources() {
  return (
    <section id="recursos" className="resources" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Recursos de Salud Mental</h2>
        <p className="section-subtitle reveal-on-scroll">
          Guías, artículos y herramientas para mejorar tu bienestar mental
        </p>

        <div className="resources-grid" data-stagger>
          <div className="resource-card reveal-on-scroll" data-stagger-item>
            <div className="resource-icon">🧘</div>
            <h3>Técnicas de Mindfulness</h3>
            <p>Aprende técnicas de atención plena para reducir el estrés y mejorar tu bienestar emocional.</p>
            <Link href="/recursos" className="resource-link" aria-label="Ver recursos de mindfulness">
              Ver más →
            </Link>
          </div>

          <div className="resource-card reveal-on-scroll" data-stagger-item>
            <div className="resource-icon">😰</div>
            <h3>Manejo de Ansiedad</h3>
            <p>Estrategias efectivas para manejar la ansiedad y el estrés con técnicas prácticas.</p>
            <Link href="/recursos" className="resource-link" aria-label="Ver recursos de ansiedad">
              Ver más →
            </Link>
          </div>

          <div className="resource-card reveal-on-scroll" data-stagger-item>
            <div className="resource-icon">💤</div>
            <h3>Mejora del Sueño</h3>
            <p>Consejos y técnicas para mejorar la calidad de tu sueño y descanso.</p>
            <Link href="/recursos" className="resource-link" aria-label="Ver recursos de sueño">
              Ver más →
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <Link href="/recursos" className="btn btn-primary">
            Ver biblioteca completa de recursos →
          </Link>
        </div>
      </div>
    </section>
  );
}
