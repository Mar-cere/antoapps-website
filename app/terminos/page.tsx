import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/privacy.css';

export const metadata: Metadata = {
  title: 'Términos de Servicio - Anto | Condiciones de Uso',
  description:
    'Términos y condiciones de uso de la aplicación Anto. Lee nuestras condiciones de servicio antes de usar la aplicación.',
  openGraph: {
    title: 'Términos de Servicio - Anto',
    description: 'Términos y condiciones de uso de la aplicación Anto.',
    url: 'https://antoapps.com/terminos',
  },
};

export default function TerminosPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Términos de Servicio' }]} />

        <section className="privacy-hero">
          <div className="container">
            <h1 className="privacy-title reveal-on-scroll">Términos de Servicio</h1>
            <p className="privacy-subtitle reveal-on-scroll">Última actualización: Enero 2025</p>
            <div className="privacy-badges reveal-on-scroll">
              <span className="badge-info">📋 Condiciones Legales</span>
              <span className="badge-info">⚖️ Términos de Uso</span>
              <span className="badge-info">🔐 Derechos y Obligaciones</span>
            </div>
          </div>
        </section>

        <section className="privacy-content">
          <div className="container">
            <div className="privacy-wrapper">
              <div className="privacy-section">
                <h2>1. Aceptación de los Términos</h2>
                <p>
                  Al acceder y utilizar la aplicación Anto (&quot;la Aplicación&quot; o &quot;el
                  Servicio&quot;), usted acepta estar sujeto a estos Términos de Servicio
                  (&quot;Términos&quot;). Si no está de acuerdo con alguna parte de estos términos,
                  no debe utilizar la Aplicación.
                </p>
                <p>
                  Estos Términos constituyen un acuerdo legalmente vinculante entre usted
                  (&quot;Usuario&quot; o &quot;usted&quot;) y Anto (&quot;nosotros&quot;,
                  &quot;nuestro&quot; o &quot;la Empresa&quot;).
                </p>
              </div>

              <div className="privacy-section">
                <h2>2. Uso del Servicio</h2>
                <p>
                  Anto es una aplicación de salud mental que proporciona apoyo emocional mediante
                  inteligencia artificial. El servicio está diseñado para complementar, no
                  reemplazar, el tratamiento profesional de salud mental.
                </p>
              </div>

              <div className="privacy-section">
                <h2>3. Contacto</h2>
                <p>
                  Para preguntas sobre estos términos, contáctanos en:{' '}
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

