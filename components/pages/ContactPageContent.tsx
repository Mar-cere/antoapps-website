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
            <div className="contact-form-container">
              <ContactForm copy={copy.formSection.form} locale={locale} />
              <div className="contact-email-link">
                <a href="mailto:marcelo.ull@antoapps.com">marcelo.ull@antoapps.com</a>
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

      <HomeMinimalFooter locale={locale} switchPath="/contacto" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
