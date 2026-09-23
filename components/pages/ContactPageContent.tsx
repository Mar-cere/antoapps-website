'use client';

import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getContactPageCopy } from '@/lib/i18n/copy/contact';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import ContactForm from '@/components/forms/ContactForm';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/contact.css';

const FIGURE = {
  es: {
    alt: 'Escritorio de noche con lluvia en la ventana, libreta abierta y lámpara cálida',
  },
  en: {
    alt: 'Rainy night desk with an open notebook and a warm lamp',
  },
} as const;

type ContactPageContentProps = {
  locale: Locale;
};

export default function ContactPageContent({ locale }: ContactPageContentProps) {
  const copy = getContactPageCopy(locale);
  const nav = getHomeV2Copy(locale).nav;
  const disclaimer =
    locale === 'en'
      ? 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.'
      : 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.';

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <div className="home-v2-shell contact-shell">
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
          ctaAria={nav.ctaAria}
        />
        <main
          id="main-content"
          className="home-landing-page home-landing-page--v2 contact-page"
          lang={locale}
        >
          <div className="home-landing-container contact-page__shell">
            <header className="contact-page__masthead">
              <div className="contact-page__intro">
                <h1 className="contact-page__title">{copy.hero.title}</h1>
                <p className="contact-page__support">{copy.hero.subtitle}</p>
              </div>
              <figure className="contact-page__figure">
                <div className="contact-page__figure-frame">
                  <Image
                    src={getEditorialImagePath('deskRain')}
                    alt={FIGURE[locale].alt}
                    width={1536}
                    height={1024}
                    className="contact-page__figure-img"
                    sizes="(max-width: 959px) 100vw, 34rem"
                    priority
                  />
                </div>
              </figure>
            </header>

            <div className="contact-page__work">
              <ContactForm copy={copy.formSection.form} locale={locale} />
              <aside className="contact-page__aside">
                <a className="contact-page__mail" href="mailto:marcelo.ull@antoapps.com">
                  marcelo.ull@antoapps.com
                </a>
                <p className="contact-page__disclaimer">{disclaimer}</p>
              </aside>
            </div>
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/contacto" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
