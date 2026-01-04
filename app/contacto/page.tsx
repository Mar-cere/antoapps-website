import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/contact.css';

export const metadata: Metadata = {
  title: 'Contacto - Anto | Estamos aquí para ayudarte',
  description:
    'Contáctanos para cualquier pregunta sobre Anto. Soporte técnico, consultas comerciales, o información sobre nuestros planes empresariales.',
  openGraph: {
    title: 'Contacto - Anto',
    description: 'Contáctanos para cualquier pregunta sobre Anto.',
    url: 'https://antoapps.com/contacto',
  },
};

export default function ContactoPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Contacto' }]} />

        <section className="contact-hero">
          <div className="container">
            <h1 className="contact-title reveal-on-scroll">Estamos aquí para ayudarte</h1>
            <p className="contact-subtitle reveal-on-scroll">
              ¿Tienes preguntas? Nos encantaría escucharte. Contáctanos y te responderemos lo antes
              posible.
            </p>
          </div>
        </section>

        <section className="contact-section" data-fade-section>
          <div className="container">
            <div className="contact-info-container">
              <div className="contact-info">
                <h2 className="section-title reveal-on-scroll">Información de contacto</h2>
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-icon">💼</div>
                    <div>
                      <h3>Desarrollador Principal</h3>
                      <p>Marcelo Ull Marambio</p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon">📧</div>
                    <div>
                      <h3>Email</h3>
                      <a href="mailto:marcelo.ull@antoapps.com">marcelo.ull@antoapps.com</a>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon">🌐</div>
                    <div>
                      <h3>Redes Sociales y Contacto</h3>
                      <div className="social-links">
                        <a
                          href="https://www.linkedin.com/in/marcelo-ull-marambio-7314a6177/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="https://t.me/marcere23"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          Telegram
                        </a>
                        <a
                          href="https://github.com/Mar-cere"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
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

