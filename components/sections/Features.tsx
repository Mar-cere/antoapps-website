'use client';

import Link from 'next/link';
import StatsSection from './StatsSection';

export default function Features() {
  return (
    <>
      {/* Características Principales */}
      <section id="caracteristicas" className="features" data-fade-section>
        <div className="container">
          <h2 className="section-title reveal-on-scroll">Características Principales</h2>
          <p className="section-subtitle reveal-on-scroll">
            Todo lo que necesitas para tu bienestar mental en un solo lugar
          </p>
          <div className="features-grid" data-stagger>
            <div className="feature-card stagger-item" data-stagger-item>
              <div className="feature-icon icon-hover-enhanced">🤖</div>
              <h3>Asistente de IA (bienestar emocional)</h3>
              <p>
                Chat con GPT-5 Mini, tono profesional y práctico por defecto. Escalas validadas (PHQ-9,
                GAD-7), detección de distorsiones cognitivas y protocolos estructurados basados en
                evidencia; preferencias de estilo de respuesta cuando la app lo ofrece (v1.2+)
              </p>
            </div>
            <div className="feature-card stagger-item" data-stagger-item>
              <div className="feature-icon icon-hover-enhanced">🚨</div>
              <h3>Detección de Crisis</h3>
              <p>Identificación temprana de señales de crisis con apoyo inmediato</p>
            </div>
            <div className="feature-card stagger-item" data-stagger-item>
              <div className="feature-icon icon-hover-enhanced">📊</div>
              <h3>Análisis Emocional Avanzado</h3>
              <p>
                Seguimiento con escalas clínicas automáticas, detección de distorsiones cognitivas,
                reportes profesionales y estadísticas detalladas de tu progreso
              </p>
            </div>
            <div className="feature-card stagger-item" data-stagger-item>
              <div className="feature-icon icon-hover-enhanced">🧘</div>
              <h3>Herramientas de Bienestar</h3>
              <p>Ejercicios de mindfulness, meditación y técnicas de relajación</p>
            </div>
            <div className="feature-card stagger-item" data-stagger-item>
              <div className="feature-icon icon-hover-enhanced">🔒</div>
              <h3>Privacidad Total</h3>
              <p>Conversaciones completamente confidenciales y seguras</p>
            </div>
            <div className="feature-card stagger-item" data-stagger-item>
              <div className="feature-icon icon-hover-enhanced">⏰</div>
              <h3>Disponible 24/7</h3>
              <p>Acceso inmediato cuando lo necesites, sin esperas ni citas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <StatsSection />

      {/* Cómo Funciona */}
      <section id="como-funciona" className="how-it-works" data-fade-section>
        <div className="container">
          <h2 className="section-title reveal-on-scroll">Cómo Funciona</h2>
          <p className="section-subtitle reveal-on-scroll">
            En solo 4 pasos simples, comienza tu camino al bienestar. Anto está diseñado para ser
            intuitivo y accesible, sin importar tu nivel de experiencia con tecnología.
          </p>
          <div className="steps" data-stagger>
            <div className="step" data-stagger-item>
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Descarga la App</h3>
                <p>
                  Disponible gratis en App Store y Google Play. La descarga es rápida (menos de 50MB) y
                  la instalación toma menos de un minuto. Compatible con iOS 13+ y Android 8.0+.
                </p>
              </div>
            </div>
            <div className="step" data-stagger-item>
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Crea tu Perfil</h3>
                <p>
                  Configura tu perfil de forma privada y segura en menos de 2 minutos. Solo necesitas un
                  email y puedes empezar. Toda tu información está encriptada desde el primer momento.
                </p>
              </div>
            </div>
            <div className="step" data-stagger-item>
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Comienza a Chatear</h3>
                <p>
                  Inicia una conversación con nuestro asistente AI que entiende tus emociones. Puedes
                  escribir libremente, hacer preguntas, o usar nuestras guías de conversación sugeridas.
                </p>
              </div>
            </div>
            <div className="step" data-stagger-item>
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Recibe Apoyo Personalizado</h3>
                <p>
                  Obtén respuestas adaptadas, herramientas de bienestar y seguimiento continuo. El sistema
                  aprende de cada interacción para ofrecerte un apoyo cada vez más personalizado.
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 'var(--spacing-xl)',
              padding: 'var(--spacing-lg)',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              opacity: 1,
            }}
          >
            <h3
              style={{
                color: 'var(--white)',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '1.5rem',
              }}
            >
              💡 Consejo Pro
            </h3>
            <p
              style={{
                color: 'var(--secondary-color)',
                lineHeight: 1.7,
                fontSize: '1.0625rem',
              }}
            >
              Para obtener los mejores resultados, usa Anto regularmente. El asistente AI aprende más
              sobre ti con cada conversación, permitiéndole ofrecerte insights y recomendaciones cada vez
              más precisas. Muchos usuarios reportan mejoras significativas después de usar la app
              durante 2-3 semanas de forma consistente.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
