import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
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

        <section className="development-hero">
          <div className="container">
            <h1 className="section-title reveal-on-scroll">Proceso de Desarrollo</h1>
            <p className="section-subtitle reveal-on-scroll">
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
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <p style={{ color: 'var(--secondary-color)', marginBottom: 'var(--spacing-xs)' }}>
                  <strong style={{ color: 'var(--white)' }}>Email Corporativo:</strong>{' '}
                  <a href="mailto:marcelo.ull@antoapps.com" style={{ color: 'var(--primary-color)' }}>
                    marcelo.ull@antoapps.com
                  </a>
                </p>
                <p style={{ color: 'var(--secondary-color)' }}>
                  <strong style={{ color: 'var(--white)' }}>Email Personal:</strong>{' '}
                  <a href="mailto:marcelo0.nicolas@gmail.com" style={{ color: 'var(--primary-color)' }}>
                    marcelo0.nicolas@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="tech-stack">
              <h2>Stack Tecnológico</h2>
              <div className="tech-grid">
                <div className="tech-category">
                  <h3>Frontend</h3>
                  <ul>
                    <li>React Native</li>
                    <li>Next.js</li>
                    <li>TypeScript</li>
                    <li>CSS Modules</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h3>Backend</h3>
                  <ul>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>MongoDB</li>
                    <li>WebSockets</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h3>IA</h3>
                  <ul>
                    <li>GPT-5 Mini</li>
                    <li>OpenAI API</li>
                    <li>NLP</li>
                  </ul>
                </div>
              </div>
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

