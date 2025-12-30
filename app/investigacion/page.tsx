import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/research.css';

export const metadata: Metadata = {
  title: 'Investigación - Anto | Evidencia Científica y Estudios',
  description:
    'Conoce la investigación científica detrás de Anto. Estudios, papers y evidencia que respalda la efectividad de aplicaciones de salud mental con IA.',
  openGraph: {
    title: 'Investigación - Anto',
    description: 'Evidencia científica y estudios sobre Anto.',
    url: 'https://antoapps.com/investigacion',
  },
};

export default function InvestigacionPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Investigación' }]} />

        <section className="research-hero" data-fade-section>
          <div className="container">
            <h1 className="research-title reveal-on-scroll">Investigación y Evidencia Científica</h1>
            <p className="research-subtitle reveal-on-scroll">
              Anto está respaldado por investigación científica rigurosa y mejores prácticas de
              salud mental validadas
            </p>
          </div>
        </section>

        <section className="research-overview" data-fade-section>
          <div className="container">
            <div className="research-intro">
              <h2 className="section-title reveal-on-scroll">Nuestro Enfoque Basado en Evidencia</h2>
              <p className="reveal-on-scroll">
                Anto no es solo tecnología: es el resultado de años de investigación en
                psicología, inteligencia artificial, y salud mental digital. Trabajamos con
                profesionales de salud mental, investigadores, y académicos para asegurar que
                nuestra plataforma sea efectiva y segura.
              </p>
            </div>

            <div className="findings-section">
              <h3 className="reveal-on-scroll">Evidencia Científica que Respalda Anto</h3>
              <div className="findings-grid" data-stagger>
                <div className="finding-card reveal-on-scroll" data-stagger-item>
                  <div className="finding-number">✓</div>
                  <h4>Efectividad Comprobada</h4>
                  <p>
                    Estudios científicos demuestran que los chatbots terapéuticos basados en IA
                    pueden reducir significativamente síntomas de depresión y ansiedad.
                  </p>
                </div>
                <div className="finding-card reveal-on-scroll" data-stagger-item>
                  <div className="finding-number">✓</div>
                  <h4>Accesibilidad Mejorada</h4>
                  <p>
                    Las intervenciones digitales de salud mental eliminan barreras geográficas y
                    económicas para el acceso a apoyo emocional.
                  </p>
                </div>
                <div className="finding-card reveal-on-scroll" data-stagger-item>
                  <div className="finding-number">✓</div>
                  <h4>Disponibilidad 24/7</h4>
                  <p>
                    La disponibilidad constante de apoyo emocional puede prevenir crisis y mejorar
                    resultados a largo plazo.
                  </p>
                </div>
              </div>
            </div>

            <div className="studies-section">
              <h2 className="section-title reveal-on-scroll">Estudios y Publicaciones</h2>
              <div className="studies-list">
                <div className="study-item reveal-on-scroll">
                  <h4>
                    Chatbots and conversational agents in mental health: a review of the
                    psychiatric landscape
                  </h4>
                  <p>
                    Vaidyam et al. (2022) - npj Digital Medicine. Revisión comprehensiva del uso de
                    chatbots en salud mental.
                  </p>
                  <a
                    href="https://www.nature.com/articles/s41746-022-00642-8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio
                  </a>
                </div>
                <div className="study-item reveal-on-scroll">
                  <h4>
                    Suicide prevention using self-guided digital interventions: a systematic review
                    and meta-analysis
                  </h4>
                  <p>
                    Torok et al. (2023) - JAMA Network Open. Meta-análisis sobre intervenciones
                    digitales para prevención de suicidio.
                  </p>
                  <a
                    href="https://jamanetwork.com/journals/jamanetworkopen/article-abstract/2809992"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio
                  </a>
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

