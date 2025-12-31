'use client';

export default function AIExplained() {
  return (
    <section id="como-funciona-ia" className="ai-explained" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Cómo Funciona Nuestra Inteligencia Artificial</h2>
        <p className="section-subtitle reveal-on-scroll">
          Tecnología de vanguardia diseñada específicamente para entender y responder a las emociones
          humanas
        </p>

        <div className="ai-process" data-stagger>
          <div className="ai-step reveal-on-scroll" data-stagger-item>
            <div className="ai-step-number">1</div>
            <div className="ai-step-content">
              <h3>Integración con OpenAI API</h3>
              <p>
                Conexión directa con GPT-5 Mini mediante API REST. Procesamiento de lenguaje natural
                que entiende contexto emocional, tono e intención. Las conversaciones se almacenan en
                MongoDB para mantener memoria contextual.
              </p>
              <div className="ai-tech">
                <span className="tech-badge">OpenAI GPT-5 Mini</span>
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">NLP</span>
              </div>
            </div>
          </div>

          <div className="ai-step reveal-on-scroll" data-stagger-item>
            <div className="ai-step-number">2</div>
            <div className="ai-step-content">
              <h3>Detección Automática de Crisis</h3>
              <p>
                Algoritmos que analizan patrones de lenguaje en tiempo real. Cuando se detectan señales
                de riesgo, se activan protocolos automáticos: notificaciones a contactos de confianza
                vía Twilio (WhatsApp/SMS) y SendGrid (emails), además de recursos de emergencia.
              </p>
              <div className="ai-tech">
                <span className="tech-badge">Análisis de Patrones</span>
                <span className="tech-badge">Twilio</span>
                <span className="tech-badge">SendGrid</span>
              </div>
            </div>
          </div>

          <div className="ai-step reveal-on-scroll" data-stagger-item>
            <div className="ai-step-number">3</div>
            <div className="ai-step-content">
              <h3>Comunicación en Tiempo Real</h3>
              <p>
                WebSockets con Socket.IO para respuestas instantáneas. El backend Node.js procesa
                mensajes, consulta la base de datos MongoDB para contexto histórico, y genera respuestas
                empáticas y personalizadas en menos de 2.5 segundos.
              </p>
              <div className="ai-tech">
                <span className="tech-badge">Socket.IO</span>
                <span className="tech-badge">WebSockets</span>
                <span className="tech-badge">Tiempo Real</span>
              </div>
            </div>
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

