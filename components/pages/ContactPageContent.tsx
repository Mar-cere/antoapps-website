'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getContactPageCopy } from '@/lib/i18n/copy/contact';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import ContactForm from '@/components/forms/ContactForm';
import '@/styles/pages/home-landing-final.css';
import '@/styles/utils/hl-chrome-wrapper.css';
import '@/styles/components/contact.css';

type ContactPageContentProps = {
  locale: Locale;
};

export default function ContactPageContent({ locale }: ContactPageContentProps) {
  const copy = getContactPageCopy(locale);
  const disclaimer =
    locale === 'en'
      ? 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.'
      : 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.';

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <div className="hl-chrome-wrapper">
        <HomeMinimalNav locale={locale} />
        <main lang={locale}>
          <section className="contact-hero">
          <div className="container">
            <h1 className="contact-title reveal-on-scroll">{copy.hero.title}</h1>
            <p className="contact-subtitle reveal-on-scroll">{copy.hero.subtitle}</p>
          </div>
        </section>

        <section className="contact-section" data-fade-section>
          <div className="container">
            <div className="contact-grid">
              <div className="contact-form-container">
                <h2 className="section-title reveal-on-scroll">{copy.formSection.title}</h2>
                <ContactForm copy={copy.formSection.form} locale={locale} />
              </div>

              <div className="contact-info reveal-on-scroll">
                <h2 className="section-title">{copy.contactInfo.title}</h2>

                <div className="contact-methods">
                  {copy.contactInfo.methods.map((method) => (
                    <div key={method.title} className="contact-method">
                      <div className="contact-icon">{method.icon}</div>
                      <h3>{method.title}</h3>
                      <p>{method.description}</p>
                      {method.email && (
                        <a href={`mailto:${method.email}`}>{method.email}</a>
                      )}
                      {method.githubLinks && (
                        <div className="developer-github-links">
                          {method.githubLinks.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="contact-social">
                  <h3>{copy.social.title}</h3>
                  <div className="social-links">
                    {copy.social.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-disclaimer" data-fade-section>
          <div className="container">
            <p className="disclaimer-text reveal-on-scroll">{disclaimer}</p>
          </div>
        </section>
      </main>

      <Link href="#contactForm" className="quick-contact-cta" aria-label={copy.quickCtaAria}>
        <div className="quick-contact-btn">💬</div>
      </Link>

      <HomeMinimalFooter locale={locale} switchPath="/contacto" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
