import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/comparison.css';

export const metadata: Metadata = {
  title: 'Comparar - Anto vs Otras Apps | Comparación Completa',
  description:
    'Compara Anto con otras apps de salud mental. Descubre por qué Anto es la mejor opción para tu bienestar mental.',
  openGraph: {
    title: 'Comparar - Anto vs Otras Apps',
    description: 'Compara Anto con otras opciones de salud mental.',
    url: 'https://antoapps.com/comparar',
  },
};

export default function CompararPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Comparar' }]} />

        <section className="comparison-hero" data-fade-section>
          <div className="container">
            <h1 className="comparison-title reveal-on-scroll">Compara Anto con Otras Opciones</h1>
            <p className="comparison-subtitle reveal-on-scroll">
              Encuentra la mejor solución para tus necesidades de salud mental
            </p>
          </div>
        </section>

        <section className="comparison-section" data-fade-section>
          <div className="container">
            <div className="apps-comparison">
              <div className="app-comparison-card">
                <div className="app-header">
                  <h3>Anto</h3>
                </div>
                <div className="app-features">
                  <div className="feature-row">
                    <span className="feature-label">Asistente AI Terapéutico</span>
                    <span className="feature-value">✅ Avanzado</span>
                  </div>
                  <div className="feature-row">
                    <span className="feature-label">Disponibilidad</span>
                    <span className="feature-value">✅ 24/7</span>
                  </div>
                  <div className="feature-row">
                    <span className="feature-label">Privacidad</span>
                    <span className="feature-value">✅ Encriptación E2E</span>
                  </div>
                  <div className="feature-row">
                    <span className="feature-label">Precio</span>
                    <span className="feature-value">✅ Accesible</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="comparison-advantages">
              <h2 className="section-title reveal-on-scroll">Ventajas de Anto</h2>
              <div className="advantages-grid">
                <div className="advantage-card reveal-on-scroll">
                  <h3>IA Avanzada</h3>
                  <p>Asistente terapéutico con GPT-5 Mini para conversaciones más naturales</p>
                </div>
                <div className="advantage-card reveal-on-scroll">
                  <h3>Disponibilidad 24/7</h3>
                  <p>Acceso inmediato cuando lo necesites, sin esperas</p>
                </div>
                <div className="advantage-card reveal-on-scroll">
                  <h3>Privacidad Total</h3>
                  <p>Encriptación de extremo a extremo para máxima seguridad</p>
                </div>
                <div className="advantage-card reveal-on-scroll">
                  <h3>Precios Accesibles</h3>
                  <p>Planes desde $990 CLP para hacer la salud mental accesible</p>
                </div>
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

