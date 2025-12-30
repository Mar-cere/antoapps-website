'use client';

export default function Technologies() {
  return (
    <section id="tecnologias" className="technologies" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Tecnología de Vanguardia</h2>
        <p className="section-subtitle reveal-on-scroll">
          Construido con las mejores tecnologías para garantizar seguridad, privacidad y rendimiento
        </p>

        <div className="tech-grid" data-stagger>
          <div className="tech-category reveal-on-scroll" data-stagger-item>
            <h3>🤖 Inteligencia Artificial</h3>
            <ul className="tech-list">
              <li>GPT-5 Mini para conversaciones naturales</li>
              <li>Procesamiento de lenguaje natural avanzado</li>
              <li>Machine Learning para análisis emocional</li>
              <li>Detección de patrones en tiempo real</li>
            </ul>
          </div>

          <div className="tech-category reveal-on-scroll" data-stagger-item>
            <h3>🔒 Seguridad y Privacidad</h3>
            <ul className="tech-list">
              <li>Encriptación End-to-End (AES-256)</li>
              <li>Autenticación JWT segura</li>
              <li>Helmet con headers de seguridad</li>
              <li>Cumplimiento GDPR y HIPAA</li>
              <li>Rate limiting y protección DDoS</li>
            </ul>
          </div>

          <div className="tech-category reveal-on-scroll" data-stagger-item>
            <h3>📱 Plataforma Móvil</h3>
            <ul className="tech-list">
              <li>React Native multiplataforma</li>
              <li>Expo para desarrollo rápido</li>
              <li>Socket.IO para tiempo real</li>
              <li>AsyncStorage para datos locales</li>
              <li>Notificaciones push nativas</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <a href="/desarrollo" className="btn btn-secondary">
            Ver detalles técnicos →
          </a>
        </div>
      </div>
    </section>
  );
}
