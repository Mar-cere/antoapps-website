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
              <li>OpenAI GPT-5 Mini API integrada</li>
              <li>Procesamiento de lenguaje natural (NLP)</li>
              <li>Análisis emocional en tiempo real</li>
              <li>Detección automática de patrones de crisis</li>
              <li>Memoria contextual de conversaciones</li>
            </ul>
          </div>

          <div className="tech-category reveal-on-scroll" data-stagger-item>
            <h3>📱 Frontend (React Native)</h3>
            <ul className="tech-list">
              <li>React Native multiplataforma (iOS/Android)</li>
              <li>Expo SDK para desarrollo rápido</li>
              <li>React Navigation para navegación</li>
              <li>AsyncStorage para persistencia local</li>
              <li>Socket.IO Client para tiempo real</li>
              <li>Notificaciones push nativas</li>
            </ul>
          </div>

          <div className="tech-category reveal-on-scroll" data-stagger-item>
            <h3>⚡ Backend (Node.js/Express)</h3>
            <ul className="tech-list">
              <li>Node.js runtime con Express.js</li>
              <li>MongoDB con Mongoose ODM</li>
              <li>Socket.IO para WebSockets</li>
              <li>Winston para logging estructurado</li>
              <li>Sentry para error tracking</li>
              <li>APIs RESTful bien documentadas</li>
            </ul>
          </div>

          <div className="tech-category reveal-on-scroll" data-stagger-item>
            <h3>🔒 Seguridad y Privacidad</h3>
            <ul className="tech-list">
              <li>JWT para autenticación segura</li>
              <li>bcrypt para hasheo de contraseñas</li>
              <li>Helmet con headers de seguridad</li>
              <li>Joi para validación robusta</li>
              <li>DOMPurify para sanitización</li>
              <li>Rate limiting y protección DDoS</li>
            </ul>
          </div>

          <div className="tech-category reveal-on-scroll" data-stagger-item>
            <h3>💳 Integraciones y Servicios</h3>
            <ul className="tech-list">
              <li>Mercado Pago para procesamiento de pagos</li>
              <li>SendGrid para emails transaccionales</li>
              <li>Twilio para WhatsApp y SMS</li>
              <li>OpenAI API para IA conversacional</li>
              <li>Sentry para monitoreo de errores</li>
            </ul>
          </div>

          <div className="tech-category reveal-on-scroll" data-stagger-item>
            <h3>✅ Calidad y Confiabilidad</h3>
            <ul className="tech-list">
              <li>97%+ de tests automatizados pasando</li>
              <li>Validación exhaustiva con Joi</li>
              <li>Sanitización de todos los inputs</li>
              <li>Backups automáticos de MongoDB</li>
              <li>SSL/HTTPS en todas las conexiones</li>
              <li>Estado: Listo para producción</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-8)' }}>
          <a href="/desarrollo" className="btn btn-secondary">
            Ver detalles técnicos completos →
          </a>
        </div>
      </div>
    </section>
  );
}
