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
            <div className="feature-card" data-stagger-item data-magnetic="0.15">
              <div className="feature-icon">🤖</div>
              <h3>Asistente AI Terapéutico</h3>
              <p>Conversaciones inteligentes y empáticas adaptadas a tu situación emocional</p>
            </div>
            <div className="feature-card" data-stagger-item data-magnetic="0.15">
              <div className="feature-icon">🚨</div>
              <h3>Detección de Crisis</h3>
              <p>Identificación temprana de señales de crisis con apoyo inmediato</p>
            </div>
            <div className="feature-card" data-stagger-item data-magnetic="0.15">
              <div className="feature-icon">📊</div>
              <h3>Análisis Emocional</h3>
              <p>Seguimiento detallado de tu estado emocional y progreso</p>
            </div>
            <div className="feature-card" data-stagger-item data-magnetic="0.15">
              <div className="feature-icon">🧘</div>
              <h3>Herramientas de Bienestar</h3>
              <p>Ejercicios de mindfulness, meditación y técnicas de relajación</p>
            </div>
            <div className="feature-card" data-stagger-item data-magnetic="0.15">
              <div className="feature-icon">🔒</div>
              <h3>Privacidad Total</h3>
              <p>Conversaciones completamente confidenciales y seguras</p>
            </div>
            <div className="feature-card" data-stagger-item data-magnetic="0.15">
              <div className="feature-icon">⏰</div>
              <h3>Disponible 24/7</h3>
              <p>Acceso inmediato cuando lo necesites, sin esperas ni citas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <StatsSection />

      {/* Características Detalladas */}
      <section className="features-detailed" data-fade-section>
        <div className="container">
          <h2 className="section-title reveal-on-scroll">Descubre todas las capacidades de Anto</h2>
          <p className="section-subtitle reveal-on-scroll">
            Una plataforma completa para tu bienestar mental
          </p>

          <div className="feature-detail-grid" data-stagger id="featureDetailsGrid">
            <div className="feature-detail-card reveal-on-scroll" data-stagger-item data-magnetic="0.1">
              <div className="feature-detail-icon">💬</div>
              <h3>Chat Inteligente con IA</h3>
              <p>
                Asistente AI con procesamiento de lenguaje natural avanzado que entiende el contexto
                emocional y se adapta a tu estilo de comunicación.
              </p>
              <ul className="feature-list">
                <li>Respuestas contextuales y empáticas</li>
                <li>Memoria de conversaciones</li>
              </ul>
            </div>

            <div className="feature-detail-card reveal-on-scroll" data-stagger-item data-magnetic="0.1">
              <div className="feature-detail-icon">📈</div>
              <h3>Análisis Emocional Avanzado</h3>
              <p>
                Monitorea tu bienestar con análisis detallados, identificación de patrones y reportes
                personalizados de tu progreso.
              </p>
              <ul className="feature-list">
                <li>Gráficos de estado emocional</li>
                <li>Identificación de patrones</li>
                <li>Reportes semanales y mensuales</li>
              </ul>
            </div>

            <div className="feature-detail-card reveal-on-scroll" data-stagger-item data-magnetic="0.1">
              <div className="feature-detail-icon">🛡️</div>
              <h3>Seguridad y Privacidad</h3>
              <p>
                Encriptación de extremo a extremo con estándares de grado militar. Cumplimiento GDPR,
                HIPAA y todas las regulaciones internacionales.
              </p>
              <ul className="feature-list">
                <li>Encriptación E2E (AES-256)</li>
                <li>Autenticación de dos factores</li>
                <li>Certificaciones de seguridad</li>
              </ul>
            </div>

            <div className="feature-detail-card reveal-on-scroll" data-stagger-item data-magnetic="0.1">
              <div className="feature-detail-icon">🧘</div>
              <h3>Biblioteca de Bienestar</h3>
              <p>
                100+ ejercicios de mindfulness, meditaciones guiadas y técnicas de relajación diseñadas
                por profesionales de salud mental.
              </p>
              <ul className="feature-list">
                <li>Ejercicios de mindfulness</li>
                <li>Meditaciones guiadas</li>
                <li>Recursos educativos</li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <Link href="/comparar" className="btn btn-secondary">
              Ver todas las características →
            </Link>
          </div>
        </div>
      </section>

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
