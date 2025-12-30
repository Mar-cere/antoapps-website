'use client';

import Link from 'next/link';

export default function Pricing() {
  return (
    <section id="precios" className="pricing" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Planes y Precios</h2>
        <p className="section-subtitle reveal-on-scroll">
          Elige la duración que mejor se adapte a tus necesidades. Todos los planes incluyen todas las
          funcionalidades: asistente AI, análisis emocional, detección de crisis, herramientas de bienestar
          y soporte 24/7.
        </p>
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)',
            padding: 'var(--spacing-md)',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{ color: 'var(--secondary-color)', marginBottom: 'var(--spacing-xs)' }}>
            <strong style={{ color: 'var(--primary-color)' }}>💰 Mejor Valor</strong>
          </p>
          <p style={{ color: 'var(--white)', fontSize: '1.0625rem' }}>
            Ahorra hasta un 17% con planes de mayor duración. Todos los planes incluyen las mismas
            funcionalidades premium.
          </p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>1 Semana</h3>
              <div className="pricing-price">
                <span className="price">$990</span>
                <span className="currency">CLP</span>
              </div>
              <div className="pricing-period">Plan de prueba</div>
            </div>
            <ul className="pricing-features">
              <li>✓ Acceso completo al asistente AI</li>
              <li>✓ Análisis emocional avanzado</li>
              <li>✓ Detección de crisis proactiva</li>
              <li>✓ Herramientas de bienestar</li>
              <li>✓ Soporte 24/7</li>
            </ul>
            <Link href="#descargar" className="btn btn-secondary btn-block">
              Comenzar Ahora
            </Link>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>1 Mes</h3>
              <div className="pricing-price">
                <span className="price">$3.990</span>
                <span className="currency">CLP</span>
              </div>
              <div className="pricing-period">Plan mensual</div>
            </div>
            <ul className="pricing-features">
              <li>✓ Acceso completo al asistente AI</li>
              <li>✓ Análisis emocional avanzado</li>
              <li>✓ Detección de crisis proactiva</li>
              <li>✓ Herramientas de bienestar</li>
              <li>✓ Soporte 24/7</li>
            </ul>
            <Link href="#descargar" className="btn btn-secondary btn-block">
              Comenzar Ahora
            </Link>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-badge">Más Popular</div>
            <div className="pricing-header">
              <h3>3 Meses</h3>
              <div className="pricing-price">
                <span className="price">$11.990</span>
                <span className="currency">CLP</span>
              </div>
              <div className="pricing-period">Ahorra 10%</div>
            </div>
            <ul className="pricing-features">
              <li>✓ Acceso completo al asistente AI</li>
              <li>✓ Análisis emocional avanzado</li>
              <li>✓ Detección de crisis proactiva</li>
              <li>✓ Herramientas de bienestar</li>
              <li>✓ Soporte 24/7</li>
            </ul>
            <Link href="#descargar" className="btn btn-primary btn-block">
              Comenzar Ahora
            </Link>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>6 Meses</h3>
              <div className="pricing-price">
                <span className="price">$20.990</span>
                <span className="currency">CLP</span>
              </div>
              <div className="pricing-period">Ahorra 12%</div>
            </div>
            <ul className="pricing-features">
              <li>✓ Acceso completo al asistente AI</li>
              <li>✓ Análisis emocional avanzado</li>
              <li>✓ Detección de crisis proactiva</li>
              <li>✓ Herramientas de bienestar</li>
              <li>✓ Soporte 24/7</li>
            </ul>
            <Link href="#descargar" className="btn btn-secondary btn-block">
              Comenzar Ahora
            </Link>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>1 Año</h3>
              <div className="pricing-price">
                <span className="price">$39.990</span>
                <span className="currency">CLP</span>
              </div>
              <div className="pricing-period">Ahorra 17%</div>
            </div>
            <ul className="pricing-features">
              <li>✓ Acceso completo al asistente AI</li>
              <li>✓ Análisis emocional avanzado</li>
              <li>✓ Detección de crisis proactiva</li>
              <li>✓ Herramientas de bienestar</li>
              <li>✓ Soporte 24/7</li>
            </ul>
            <Link href="#descargar" className="btn btn-secondary btn-block">
              Comenzar Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
