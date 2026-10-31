'use client';

import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { htmlLanguage, localePath } from '@/lib/i18n/config';
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
import '@/styles/components/contact-layout.css';

const FIGURE = {
  es: {
    alt: 'Escritorio de noche con lluvia en la ventana, libreta abierta y lámpara cálida',
  },
  en: {
    alt: 'Rainy night desk with an open notebook and a warm lamp',
  },
  pt: {
    alt: 'Escrivaninha à noite com chuva na janela, caderno aberto e abajur aceso',
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
      : locale === 'pt'
        ? 'A Anto não substitui terapia nem atendimento clínico profissional. Se você estiver em crise, procure ajuda de emergência no seu país.'
        : 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.';
  const crisisLabel =
    locale === 'en'
      ? 'Emergency lines by country'
      : locale === 'pt'
        ? 'Linhas de emergência por país'
        : 'Líneas de emergencia por país';
  const crisisHref = 'https://findahelpline.com/';

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
          lang={htmlLanguage(locale)}
        >
          <div className="home-landing-container contact-page__shell">
            <header className="contact-page__masthead">
              <div className="contact-page__intro">
                <h1 className="contact-page__title">{copy.hero.title}</h1>
                <p className="contact-page__support">{copy.hero.subtitle}</p>
              </div>
            </header>

            <div className="contact-page__work">
              <ContactForm copy={copy.formSection.form} locale={locale} />
              <aside className="contact-page__aside">
                <a className="contact-page__mail" href="mailto:marcelo.ull@antoapps.com">
                  marcelo.ull@antoapps.com
                </a>
                <p className="contact-page__disclaimer">
                  {disclaimer}{' '}
                  <a
                    href={crisisHref}
                    className="contact-page__crisis"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {crisisLabel}
                  </a>
                </p>
              </aside>
            </div>

            <figure className="contact-page__figure">
              <div className="contact-page__figure-frame">
                <Image
                  src={getEditorialImagePath('deskRain')}
                  alt={FIGURE[locale].alt}
                  width={1536}
                  height={1024}
                  className="contact-page__figure-img"
                  sizes="(max-width: 959px) 100vw, min(72rem, 100vw)"
                />
              </div>
            </figure>
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/contacto" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
