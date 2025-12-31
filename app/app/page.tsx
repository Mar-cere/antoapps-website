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
                Una experiencia diseñada para tu bienestar mental, con tecnología de vanguardia y
                un enfoque centrado en ti
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
                <div className="insight-value">2.5s</div>
                <div className="insight-label">Tiempo promedio de respuesta</div>
                <p className="insight-description">
                  Nuestro asistente AI responde en menos de 2.5 segundos, garantizando una
                  experiencia fluida y natural
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">📊</div>
                <div className="insight-value">94%</div>
                <div className="insight-label">Precisión en detección emocional</div>
                <p className="insight-description">
                  Algoritmos avanzados de NLP que identifican con precisión tu estado emocional y
                  contexto
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">🛡️</div>
                <div className="insight-value">AES-256</div>
                <div className="insight-label">Encriptación de grado militar</div>
                <p className="insight-description">
                  Todas tus conversaciones están protegidas con el mismo nivel de seguridad que
                  instituciones financieras
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">⚡</div>
                <div className="insight-value">24/7</div>
                <div className="insight-label">Disponibilidad constante</div>
                <p className="insight-description">
                  Acceso inmediato cuando lo necesites, sin esperas ni horarios limitados
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">🧠</div>
                <div className="insight-value">100+</div>
                <div className="insight-label">Ejercicios de bienestar</div>
                <p className="insight-description">
                  Biblioteca completa de herramientas de mindfulness, meditación y relajación
                </p>
              </div>
              <div className="insight-card reveal-on-scroll" data-stagger-item>
                <div className="insight-icon">📈</div>
                <div className="insight-value">35%</div>
                <div className="insight-label">Reducción promedio de síntomas</div>
                <p className="insight-description">
                  Estudios demuestran reducción significativa en síntomas de depresión y ansiedad
                  tras 8 semanas de uso
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
                  <h3>Asistente AI con Memoria Contextual</h3>
                </div>
                <p>
                  El asistente recuerda conversaciones anteriores y se adapta a tu estilo de
                  comunicación, creando una experiencia verdaderamente personalizada.
                </p>
                <ul className="feature-list">
                  <li>Memoria de conversaciones a largo plazo</li>
                  <li>Adaptación a tu estilo de comunicación</li>
                  <li>Reconocimiento de patrones emocionales</li>
                  <li>Respuestas contextualmente relevantes</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">📈</div>
                  <h3>Análisis Predictivo de Bienestar</h3>
                </div>
                <p>
                  Machine Learning avanzado que identifica tendencias y patrones en tu bienestar,
                  permitiendo intervenciones proactivas.
                </p>
                <ul className="feature-list">
                  <li>Detección temprana de cambios emocionales</li>
                  <li>Alertas proactivas de bienestar</li>
                  <li>Recomendaciones personalizadas</li>
                  <li>Reportes semanales y mensuales</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">🔔</div>
                  <h3>Sistema de Notificaciones Inteligentes</h3>
                </div>
                <p>
                  Notificaciones que respetan tu espacio personal mientras te mantienen conectado
                  con tu bienestar.
                </p>
                <ul className="feature-list">
                  <li>Recordatorios personalizados de bienestar</li>
                  <li>Notificaciones de seguimiento emocional</li>
                  <li>Alertas de crisis (configurables)</li>
                  <li>Respeto por horarios y preferencias</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">🌐</div>
                  <h3>Sincronización Multi-Dispositivo</h3>
                </div>
                <p>
                  Accede a Anto desde cualquier dispositivo. Tus conversaciones y datos se
                  sincronizan de forma segura y encriptada.
                </p>
                <ul className="feature-list">
                  <li>Sincronización en tiempo real</li>
                  <li>Encriptación end-to-end</li>
                  <li>Historial completo disponible</li>
                  <li>Continuidad entre dispositivos</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">🎯</div>
                  <h3>Objetivos y Seguimiento Personalizado</h3>
                </div>
                <p>
                  Establece objetivos de bienestar y recibe seguimiento personalizado para alcanzar
                  tus metas.
                </p>
                <ul className="feature-list">
                  <li>Objetivos personalizables</li>
                  <li>Tracking de progreso visual</li>
                  <li>Celebración de logros</li>
                  <li>Ajuste automático de metas</li>
                </ul>
              </div>
              <div className="advanced-feature reveal-on-scroll" data-stagger-item>
                <div className="feature-header">
                  <div className="feature-icon">🔐</div>
                  <h3>Privacidad Granular</h3>
                </div>
                <p>
                  Control total sobre qué datos compartes y cómo se utilizan, con opciones de
                  privacidad detalladas.
                </p>
                <ul className="feature-list">
                  <li>Control de datos compartidos</li>
                  <li>Exportación de datos en cualquier momento</li>
                  <li>Eliminación completa de cuenta</li>
                  <li>Transparencia total en uso de datos</li>
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
                <h3>📱 Plataformas</h3>
                <ul>
                  <li>iOS 13.0 o superior</li>
                  <li>Android 8.0 (API 26) o superior</li>
                  <li>Optimizado para tablets</li>
                  <li>Compatibilidad con wearables (próximamente)</li>
                </ul>
              </div>
              <div className="tech-spec-card reveal-on-scroll" data-stagger-item>
                <h3>⚡ Rendimiento</h3>
                <ul>
                  <li>Tiempo de inicio: &lt;2 segundos</li>
                  <li>Respuesta del AI: &lt;2.5 segundos promedio</li>
                  <li>Tamaño de la app: &lt;50MB</li>
                  <li>Uso de batería optimizado</li>
                </ul>
              </div>
              <div className="tech-spec-card reveal-on-scroll" data-stagger-item>
                <h3>🔒 Seguridad</h3>
                <ul>
                  <li>Encriptación AES-256</li>
                  <li>Autenticación biométrica</li>
                  <li>Certificación SSL/TLS</li>
                  <li>Cumplimiento GDPR y HIPAA</li>
                </ul>
              </div>
              <div className="tech-spec-card reveal-on-scroll" data-stagger-item>
                <h3>🌍 Idiomas</h3>
                <ul>
                  <li>Español (completo)</li>
                  <li>Inglés (próximamente)</li>
                  <li>Portugués (próximamente)</li>
                  <li>Más idiomas en desarrollo</li>
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

