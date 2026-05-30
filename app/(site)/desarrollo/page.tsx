import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/development.css';

export const metadata: Metadata = {
  title: 'Desarrollo - Anto | Proceso de Desarrollo',
  description:
    'Conoce cómo se desarrolló Anto, las tecnologías utilizadas, el proceso de desarrollo y los desafíos técnicos superados.',
  openGraph: {
    title: 'Desarrollo - Anto',
    description: 'Conoce cómo se desarrolló Anto y las tecnologías utilizadas.',
    url: 'https://antoapps.com/desarrollo',
  },
};

export default function DesarrolloPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Desarrollo' }]} />

        <section className="development-hero" data-fade-section>
          <div className="container">
            <h1 className="development-title reveal-on-scroll">Proceso de Desarrollo</h1>
            <p className="development-subtitle reveal-on-scroll">
              Conoce cómo se construyó Anto desde cero, las tecnologías utilizadas y los desafíos
              técnicos superados.
            </p>
          </div>
        </section>

        <section className="development-content" data-fade-section>
          <div className="container">
            <div className="development-info">
              <h2>Desarrollador Principal</h2>
              <p>
                <strong>Marcelo Ull Marambio</strong>
              </p>
              <p>Desarrollador Full Stack especializado en aplicaciones móviles y web.</p>
              <div className="developer-links">
                <a
                  href="https://github.com/Mar-cere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/marcelo-ull-marambio-7314a6177/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  LinkedIn
                </a>
                <a
                  href="https://t.me/marcere23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Telegram
                </a>
                <a
                  href="mailto:marcelo.ull@antoapps.com"
                  className="btn btn-primary"
                >
                  Email
                </a>
              </div>
            </div>

            <div className="tech-stack">
              <h2>Stack Tecnológico Completo</h2>
              <p className="tech-stack-intro">
                Tecnologías reales utilizadas en el desarrollo de Anto según el{' '}
                <a
                  href="https://github.com/Mar-cere/Anto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-stack-link"
                >
                  repositorio oficial
                </a>
              </p>
              <div className="tech-grid">
                <div className="tech-category">
                  <h3>📱 Frontend Móvil</h3>
                  <ul>
                    <li>React Native (multiplataforma)</li>
                    <li>Expo SDK</li>
                    <li>React Navigation</li>
                    <li>AsyncStorage</li>
                    <li>Socket.IO Client</li>
                    <li>Notificaciones Push</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h3>⚡ Backend</h3>
                  <ul>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>MongoDB + Mongoose</li>
                    <li>Socket.IO (WebSockets)</li>
                    <li>Winston (Logging)</li>
                    <li>Sentry (Error Tracking)</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h3>🤖 Inteligencia Artificial</h3>
                  <ul>
                    <li>OpenAI GPT-5.4 Mini API</li>
                    <li>Procesamiento de lenguaje natural</li>
                    <li>Análisis emocional</li>
                    <li>Detección de patrones</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h3>🔒 Seguridad</h3>
                  <ul>
                    <li>JWT (Autenticación)</li>
                    <li>bcrypt (Hasheo)</li>
                    <li>Helmet (Headers)</li>
                    <li>Joi (Validación)</li>
                    <li>DOMPurify (Sanitización)</li>
                    <li>Rate Limiting</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h3>💳 Integraciones</h3>
                  <ul>
                    <li>Mercado Pago</li>
                    <li>SendGrid (Emails)</li>
                    <li>Twilio (WhatsApp/SMS)</li>
                    <li>OpenAI API</li>
                    <li>Sentry</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h3>✅ Calidad</h3>
                  <ul>
                    <li>97%+ tests pasando</li>
                    <li>Validación robusta</li>
                    <li>Backups automáticos</li>
                    <li>SSL/HTTPS</li>
                    <li>Estado: Producción</li>
                  </ul>
                </div>
              </div>
              <div className="section-cta-row">
                <a
                  href="https://github.com/Mar-cere/Anto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-large"
                >
                  Ver Repositorio en GitHub →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

