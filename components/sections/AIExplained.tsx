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
              <h3>Análisis de Lenguaje Natural</h3>
              <p>
                Procesamiento de lenguaje natural (NLP) avanzado que entiende el contexto emocional, el tono
                y la intención de tus mensajes.
              </p>
              <div className="ai-tech">
                <span className="tech-badge">GPT-5 Mini</span>
                <span className="tech-badge">NLP Avanzado</span>
              </div>
            </div>
          </div>

          <div className="ai-step reveal-on-scroll" data-stagger-item>
            <div className="ai-step-number">2</div>
            <div className="ai-step-content">
              <h3>Detección de Patrones</h3>
              <p>
                Identifica patrones en tus conversaciones, reconociendo cambios emocionales y tendencias a lo
                largo del tiempo.
              </p>
              <div className="ai-tech">
                <span className="tech-badge">Machine Learning</span>
                <span className="tech-badge">Análisis Predictivo</span>
              </div>
            </div>
          </div>

          <div className="ai-step reveal-on-scroll" data-stagger-item>
            <div className="ai-step-number">3</div>
            <div className="ai-step-content">
              <h3>Respuestas Empáticas</h3>
              <p>
                Genera respuestas personalizadas, empáticas y contextualmente relevantes adaptadas a tu
                situación específica.
              </p>
              <div className="ai-tech">
                <span className="tech-badge">Personalización</span>
                <span className="tech-badge">Validación Emocional</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-features-box reveal-on-scroll" style={{ marginTop: 'var(--spacing-xl)' }}>
          <div className="ai-features-grid">
            <div className="ai-feature-item">
              <strong>Modelo:</strong> GPT-5 Mini optimizado
            </div>
            <div className="ai-feature-item">
              <strong>Velocidad:</strong> &lt;2 segundos promedio
            </div>
            <div className="ai-feature-item">
              <strong>Precisión:</strong> 94%+ detección emocional
            </div>
            <div className="ai-feature-item"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

