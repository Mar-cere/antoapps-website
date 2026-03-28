import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/security-page.css';

export const metadata: Metadata = {
  title: 'Seguridad - Anto | Protección de Datos de Grado Militar',
  description:
    'Conoce todas las medidas de seguridad que implementamos en Anto. Encriptación E2E, certificaciones, auditorías y compliance con GDPR, HIPAA y más.',
  openGraph: {
    title: 'Seguridad - Anto',
    description: 'Protección de datos de grado militar en Anto.',
    url: 'https://antoapps.com/seguridad',
  },
};

export default function SeguridadPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Seguridad' }]} />

        <section className="security-hero" data-fade-section>
          <div className="container">
            <h1 className="security-title reveal-on-scroll">Seguridad de Grado Militar</h1>
            <p className="security-subtitle reveal-on-scroll">
              Tu privacidad y seguridad son nuestra máxima prioridad. Implementamos las mejores
              prácticas de la industria para proteger tus datos.
            </p>
            <div className="security-badges reveal-on-scroll">
              <span className="badge-cert">🔒 AES-256</span>
              <span className="badge-cert">🛡️ GDPR</span>
              <span className="badge-cert">⚖️ HIPAA</span>
              <span className="badge-cert">✅ SOC 2</span>
              <span className="badge-cert">🔐 ISO 27001</span>
            </div>
          </div>
        </section>

        <section className="security-overview" data-fade-section>
          <div className="container">
            <div className="security-intro">
              <h2 className="section-title reveal-on-scroll">Nuestro Compromiso con la Seguridad</h2>
              <p className="reveal-on-scroll">
                En Anto, entendemos que los datos de salud mental son extremadamente sensibles. Por
                eso, hemos construido nuestra plataforma desde cero con seguridad como prioridad
                fundamental. Cada byte de información está protegido con múltiples capas de
                seguridad.
              </p>
            </div>

            <div className="security-features">
              <div className="security-feature-card reveal-on-scroll">
                <h3>Encriptación de Extremo a Extremo</h3>
                <p>
                  Todos tus datos están encriptados con AES-256, el mismo estándar usado por
                  instituciones financieras y militares.
                </p>
              </div>
              <div className="security-feature-card reveal-on-scroll">
                <h3>Cumplimiento Regulatorio</h3>
                <p>
                  Cumplimos con GDPR, HIPAA y otras regulaciones internacionales de protección de
                  datos.
                </p>
              </div>
              <div className="security-feature-card reveal-on-scroll">
                <h3>Auditorías Regulares</h3>
                <p>
                  Realizamos auditorías de seguridad regulares para identificar y corregir
                  vulnerabilidades.
                </p>
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

