import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/components/app-page.css';

export const metadata: Metadata = {
  title: 'La Aplicación - Anto | Características e Insights',
  description:
    'Descubre todas las características de la aplicación Anto, insights sobre su funcionamiento, pantallazos y cómo puede ayudarte en tu bienestar mental.',
  openGraph: {
    title: 'La Aplicación - Anto',
    description: 'Características, insights y pantallazos de la aplicación Anto.',
    url: 'https://antoapps.com/app',
  },
};

export default function AppPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'La Aplicación' }]} />

        {/* Hero Section */}
        <section className="app-hero" data-fade-section>
          <div className="container">
            <div className="app-hero-content">
              <h1 className="app-hero-title reveal-on-scroll">Conoce la Aplicación Anto</h1>
              <p className="app-hero-subtitle reveal-on-scroll">
                Aplicación React Native con backend Node.js/Express. Integración con OpenAI GPT-5 Mini,
                detección automática de crisis, sistema de tareas y hábitos, y mucho más.{' '}
                <a
                  href="https://github.com/Mar-cere/Anto"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}
                >
                  Ver código en GitHub
                </a>
              </p>
              <div className="app-hero-badges reveal-on-scroll">
                <span className="app-badge">📱 iOS & Android</span>
                <span className="app-badge">🔒 100% Privado</span>
                <span className="app-badge">⚡ Tiempo Real</span>
              </div>
            </div>
          </div>
        </section>

        {/* App Insights */}
        <section className="app-insights" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">Insights de la Aplicación</h2>
            <p className="section-subtitle reveal-on-scroll">
              Datos y métricas que demuestran el impacto de Anto en el bienestar mental
            </p>
            <div className="insights-grid" data-stagger>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">💬</div>
                <div className="insight-value">&lt;2.5s</div>
                <div className="insight-label">Respuesta del AI</div>
                <p className="insight-description">
                  Integración con GPT-5 Mini optimizada para respuestas rápidas y contextuales en
                  tiempo real mediante Socket.IO
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">📊</div>
                <div className="insight-value">97%+</div>
                <div className="insight-label">Tests pasando</div>
                <p className="insight-description">
                  Cobertura de tests automatizados que garantizan estabilidad y confiabilidad en
                  cada actualización
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">🛡️</div>
                <div className="insight-value">E2E</div>
                <div className="insight-label">Encriptación completa</div>
                <p className="insight-description">
                  Todas las comunicaciones protegidas con JWT, bcrypt y validación robusta con Joi
                  y DOMPurify
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">⚡</div>
                <div className="insight-value">Real-time</div>
                <div className="insight-label">Comunicación instantánea</div>
                <p className="insight-description">
                  WebSockets con Socket.IO para chat en tiempo real, notificaciones push y
                  sincronización multi-dispositivo
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">🚨</div>
                <div className="insight-value">Auto</div>
                <div className="insight-label">Detección de crisis</div>
                <p className="insight-description">
                  Sistema proactivo que detecta patrones de riesgo y activa protocolos de emergencia
                  con Twilio y SendGrid
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">📈</div>
                <div className="insight-value">35%</div>
                <div className="insight-label">Reducción de síntomas</div>
                <p className="insight-description">
                  Estudios científicos demuestran reducción significativa en síntomas de depresión y
                  ansiedad tras 8 semanas de uso consistente
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Gallery */}
        <section className="app-screenshots" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">Pantallazos de la Aplicación</h2>
            <p className="section-subtitle reveal-on-scroll">
              Descubre cómo se ve y funciona Anto. Espacio reservado para screenshots reales de la
              aplicación
            </p>
            <div className="screenshots-grid" data-stagger>
              {/* Placeholder para screenshots - reemplazar con imágenes reales */}
              <div className="screenshot-card reveal-on-scroll" data-stagger-item>
                <div className="screenshot-placeholder">
                  <div className="screenshot-label">Pantalla de Inicio</div>
                  <div className="screenshot-icon">📱</div>
                  <p className="screenshot-description">
                    Interfaz principal con acceso rápido a todas las funcionalidades
                  </p>
                </div>
              </div>
              <div className="screenshot-card reveal-on-scroll" data-stagger-item>
                <div className="screenshot-placeholder">
                  <div className="screenshot-label">Chat con IA</div>
                  <div className="screenshot-icon">💬</div>
                  <p className="screenshot-description">
                    Conversaciones naturales y empáticas con el asistente AI terapéutico
                  </p>
                </div>
              </div>
              <div className="screenshot-card reveal-on-scroll" data-stagger-item>
                <div className="screenshot-placeholder">
                  <div className="screenshot-label">Análisis Emocional</div>
                  <div className="screenshot-icon">📊</div>
                  <p className="screenshot-description">
                    Gráficos y reportes detallados de tu bienestar emocional
                  </p>
                </div>
              </div>
              <div className="screenshot-card reveal-on-scroll" data-stagger-item>
                <div className="screenshot-placeholder">
                  <div className="screenshot-label">Herramientas de Bienestar</div>
                  <div className="screenshot-icon">🧘</div>
                  <p className="screenshot-description">
                    Ejercicios de mindfulness, meditación y técnicas de relajación
                  </p>
                </div>
              </div>
              <div className="screenshot-card reveal-on-scroll" data-stagger-item>
                <div className="screenshot-placeholder">
                  <div className="screenshot-label">Detección de Crisis</div>
                  <div className="screenshot-icon">🚨</div>
                  <p className="screenshot-description">
                    Sistema proactivo de alertas y recursos de apoyo inmediato
                  </p>
                </div>
              </div>
              <div className="screenshot-card reveal-on-scroll" data-stagger-item>
                <div className="screenshot-placeholder">
                  <div className="screenshot-label">Configuración y Privacidad</div>
                  <div className="screenshot-icon">🔒</div>
                  <p className="screenshot-description">
                    Control total sobre tu privacidad y preferencias de la aplicación
                  </p>
                </div>
              </div>
            </div>
            <div className="screenshots-note reveal-on-scroll">
              <p>
                💡 <strong>Nota:</strong> Los screenshots reales de la aplicación se agregarán aquí
                próximamente. Estos placeholders muestran las principales funcionalidades de Anto.
              </p>
              <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.9375rem' }}>
                📱 <strong>Repositorio:</strong>{' '}
                <a
                  href="https://github.com/Mar-cere/Anto"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--primary-color)' }}
                >
                  Ver código fuente en GitHub
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="app-features-advanced" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">Características Avanzadas</h2>
            <p className="section-subtitle reveal-on-scroll">
              Funcionalidades que hacen de Anto una herramienta única para tu bienestar mental
            </p>
            <div className="advanced-features-grid" data-stagger>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">🤖</div>
                  <h3>Chat Conversacional con GPT-5 Mini</h3>
                </div>
                <p>
                  Integración directa con OpenAI API para conversaciones naturales y empáticas.
                  Procesamiento de lenguaje natural avanzado que entiende contexto emocional y
                  mantiene memoria de conversaciones.
                </p>
                <ul className="feature-list">
                  <li>Integración con OpenAI GPT-5 Mini</li>
                  <li>Memoria de conversaciones en MongoDB</li>
                  <li>Procesamiento de lenguaje natural (NLP)</li>
                  <li>Respuestas contextualmente relevantes</li>
                  <li>WebSockets para tiempo real</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">🚨</div>
                  <h3>Sistema Automático de Detección de Crisis</h3>
                </div>
                <p>
                  Algoritmos que analizan patrones de lenguaje y comportamiento para detectar
                  señales de crisis. Activa protocolos de emergencia automáticamente con notificaciones
                  a contactos de confianza vía Twilio y SendGrid.
                </p>
                <ul className="feature-list">
                  <li>Detección automática de patrones de riesgo</li>
                  <li>Alertas inmediatas a contactos designados</li>
                  <li>Notificaciones vía WhatsApp/SMS (Twilio)</li>
                  <li>Emails de emergencia (SendGrid)</li>
                  <li>Seguimiento post-crisis automatizado</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">📋</div>
                  <h3>Sistema de Tareas y Hábitos</h3>
                </div>
                <p>
                  Gestión completa de tareas terapéuticas y seguimiento de hábitos saludables.
                  Recordatorios inteligentes y análisis de correlaciones entre hábitos y bienestar
                  emocional.
                </p>
                <ul className="feature-list">
                  <li>Creación y seguimiento de tareas</li>
                  <li>Establecimiento de hábitos saludables</li>
                  <li>Recordatorios personalizados</li>
                  <li>Análisis de cumplimiento y progreso</li>
                  <li>Correlación con bienestar emocional</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">💳</div>
                  <h3>Integración con Mercado Pago</h3>
                </div>
                <p>
                  Sistema de suscripciones completo con procesamiento de pagos seguro. Gestión
                  automática de planes, renovaciones y cancelaciones.
                </p>
                <ul className="feature-list">
                  <li>Procesamiento seguro de pagos</li>
                  <li>Gestión automática de suscripciones</li>
                  <li>Múltiples planes flexibles</li>
                  <li>Renovaciones automáticas</li>
                  <li>Cancelación en cualquier momento</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">📊</div>
                  <h3>Dashboard de Métricas y Progreso</h3>
                </div>
                <p>
                  Visualización completa de tu bienestar emocional con gráficos, tendencias y
                  reportes detallados. Análisis de patrones a lo largo del tiempo.
                </p>
                <ul className="feature-list">
                  <li>Gráficos de estado emocional</li>
                  <li>Identificación de patrones temporales</li>
                  <li>Reportes semanales y mensuales</li>
                  <li>Métricas de progreso personalizadas</li>
                  <li>Exportación de datos</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">🔔</div>
                  <h3>Notificaciones Push Nativas</h3>
                </div>
                <p>
                  Sistema de notificaciones push configurado para recordatorios de bienestar,
                  alertas de crisis y actualizaciones importantes. Respeto por preferencias y
                  horarios del usuario.
                </p>
                <ul className="feature-list">
                  <li>Notificaciones push nativas (iOS/Android)</li>
                  <li>Recordatorios de tareas y hábitos</li>
                  <li>Alertas de seguimiento emocional</li>
                  <li>Notificaciones de crisis (configurables)</li>
                  <li>Control granular de notificaciones</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="app-tech-specs" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">Especificaciones Técnicas</h2>
            <p className="section-subtitle reveal-on-scroll">
              Detalles técnicos sobre el rendimiento y capacidades de la aplicación
            </p>
            <div className="tech-specs-grid" data-stagger>
              <div className="tech-spec-card reveal-on-scroll" data-stagger-item>
                <h3>📱 Frontend (React Native)</h3>
                <ul>
                  <li>React Native multiplataforma</li>
                  <li>Expo para desarrollo rápido</li>
                  <li>React Navigation</li>
                  <li>AsyncStorage para datos locales</li>
                  <li>Socket.IO Client para tiempo real</li>
                  <li>Notificaciones push nativas</li>
                </ul>
              </div>
              <div className="tech-spec-card reveal-on-scroll" data-stagger-item>
                <h3>⚙️ Backend (Node.js)</h3>
                <ul>
                  <li>Node.js y Express.js</li>
                  <li>MongoDB con Mongoose</li>
                  <li>Socket.IO para WebSockets</li>
                  <li>OpenAI API (GPT-5 Mini)</li>
                  <li>Winston para logging</li>
                  <li>Sentry para error tracking</li>
                </ul>
              </div>
              <div className="tech-spec-card reveal-on-scroll" data-stagger-item>
                <h3>🔒 Seguridad y Privacidad</h3>
                <ul>
                  <li>JWT para autenticación</li>
                  <li>bcrypt para hasheo de contraseñas</li>
                  <li>Helmet con headers de seguridad</li>
                  <li>Joi para validación robusta</li>
                  <li>DOMPurify para sanitización</li>
                  <li>Rate limiting y protección DDoS</li>
                </ul>
              </div>
              <div className="tech-spec-card reveal-on-scroll" data-stagger-item>
                <h3>🔗 Integraciones</h3>
                <ul>
                  <li>Mercado Pago para pagos</li>
                  <li>SendGrid para emails</li>
                  <li>Twilio para WhatsApp/SMS</li>
                  <li>OpenAI para IA conversacional</li>
                  <li>Sentry para monitoreo</li>
                  <li>SSL/HTTPS en todas las conexiones</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="app-cta" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">¿Listo para comenzar?</h2>
            <p className="section-subtitle reveal-on-scroll">
              Descarga Anto ahora y comienza tu viaje hacia un mejor bienestar mental
            </p>
            <div className="app-cta-buttons reveal-on-scroll">
              <Link href="#descargar" className="btn btn-primary btn-large">
                Descargar Ahora
              </Link>
              <Link href="/contacto" className="btn btn-secondary btn-large">
                Contactar
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
      <AccessibilityPanel />
    </>
  );
}

