import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/privacy.css';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Anto',
  description:
    'Política de privacidad de Anto. Conoce cómo protegemos y manejamos tus datos personales.',
  openGraph: {
    title: 'Política de Privacidad - Anto',
    description: 'Conoce cómo protegemos y manejamos tus datos personales.',
    url: 'https://antoapps.com/privacidad',
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Privacidad' }]} />

        <section className="privacy-hero">
          <div className="container">
            <h1 className="section-title reveal-on-scroll">Política de Privacidad</h1>
            <p className="section-subtitle reveal-on-scroll">
              Última actualización: Enero 2025
            </p>
          </div>
        </section>

        <section className="privacy-content" data-fade-section>
          <div className="container">
            <div className="privacy-grid">
              <div className="privacy-section">
                <h2>Información que Recopilamos</h2>
                <p>
                  Recopilamos información que nos proporcionas directamente cuando usas nuestros
                  servicios.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Cómo Usamos tu Información</h2>
                <p>
                  Utilizamos la información recopilada para proporcionar, mantener y mejorar
                  nuestros servicios.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Seguridad</h2>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu
                  información personal.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Contacto</h2>
                <p>
                  Para preguntas sobre esta política de privacidad, contáctanos en:{' '}
                  <a href="mailto:marcelo.ull@antoapps.com">marcelo.ull@antoapps.com</a>
                </p>
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

