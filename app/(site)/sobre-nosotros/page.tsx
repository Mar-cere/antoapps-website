import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/about.css';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Anto | Nuestra Misión y Visión',
  description:
    'Conoce la historia, misión y valores de Anto. Descubre cómo estamos transformando el acceso a la salud mental con tecnología de vanguardia.',
  openGraph: {
    title: 'Sobre Nosotros - Anto',
    description: 'Conoce la historia, misión y valores de Anto.',
    url: 'https://antoapps.com/sobre-nosotros',
  },
};

export default function SobreNosotrosPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Sobre Nosotros' }]} />

        <section className="about-hero" data-fade-section>
          <div className="container">
            <h1 className="about-title reveal-on-scroll">Sobre Anto</h1>
            <p className="about-subtitle reveal-on-scroll">
              Transformando el acceso a la salud mental, una conversación a la vez
            </p>
          </div>
        </section>

        <section className="about-story" data-fade-section>
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2 className="section-title reveal-on-scroll">Nuestra Historia</h2>
                <p className="reveal-on-scroll">
                  Anto nació de una simple pero poderosa idea:{' '}
                  <strong>la salud mental debe ser accesible para todos</strong>, sin importar
                  dónde vivas, cuánto ganes, o qué hora sea.
                </p>
                <p className="reveal-on-scroll">
                  Reconocimos que millones de personas en todo el mundo enfrentan barreras
                  significativas para acceder a apoyo emocional profesional: costos prohibitivos,
                  largas listas de espera, estigma social, y limitaciones geográficas.
                </p>
                <p className="reveal-on-scroll">
                  Decidimos que la tecnología, específicamente la inteligencia artificial, podría
                  ser la solución para democratizar el acceso a la salud mental de calidad. Así
                  nació Anto: una aplicación que combina la empatía humana con la potencia de la IA
                  para ofrecer apoyo emocional 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-mission" data-fade-section>
          <div className="container">
            <div className="mission-grid">
              <div className="mission-card reveal-on-scroll">
                <h3>Nuestra Misión</h3>
                <p>
                  Democratizar el acceso a la salud mental de calidad mediante tecnología de
                  vanguardia, haciendo que el apoyo emocional esté disponible para todos, en
                  cualquier momento y lugar.
                </p>
              </div>
              <div className="mission-card reveal-on-scroll">
                <h3>Nuestra Visión</h3>
                <p>
                  Un mundo donde la salud mental sea tan accesible como la salud física, donde
                  nadie tenga que enfrentar sus desafíos emocionales solo.
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

