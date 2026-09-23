'use client';

import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getAboutPageCopy } from '@/lib/i18n/copy/pages/about';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/about.css';

type AboutPageContentProps = {
  locale: Locale;
};

export default function AboutPageContent({ locale }: AboutPageContentProps) {
  const copy = getAboutPageCopy(locale);
  const nav = getHomeV2Copy(locale).nav;
  const homeHero = getHomeLandingFinalCopy(locale).hero;
  const pagePath = locale === 'en' ? '/en/sobre-nosotros' : '/sobre-nosotros';
  const storeCopy = {
    ...homeHero,
    ctaBadge: copy.storeBadge,
    ctaPlayBadge: copy.storeBadge,
  };

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <div className="home-v2-shell about-shell">
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
          ctaAria={nav.ctaAria}
        />
        <main
          id="main-content"
          className="home-landing-page home-landing-page--v2 about-page"
          lang={locale}
        >
          <article className="about-page__article">
            <div className="home-landing-container">
              <div className="about-page__masthead">
                <header className="about-page__header">
                  <p className="about-page__brand">anto.</p>
                  <h1 className="about-page__title">{copy.h1}</h1>
                  <p className="about-page__lede">{copy.lede}</p>
                </header>
                <figure className="about-page__figure">
                  <div className="about-page__figure-frame">
                    <Image
                      src={copy.figure.src}
                      alt={copy.figure.alt}
                      width={copy.figure.width}
                      height={copy.figure.height}
                      className="about-page__figure-img"
                      sizes="(max-width: 959px) 100vw, 38rem"
                      priority
                    />
                  </div>
                  <figcaption className="about-page__figure-caption">{copy.figure.caption}</figcaption>
                </figure>
              </div>

              <div className="about-page__reading">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="about-page__body">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="about-page__close">
                <div className="about-page__stores">
                  <PremiumStoreCtaPair
                    locale={locale}
                    copy={storeCopy}
                    trackingPage={pagePath}
                    trackingPlacementPrefix="about"
                    trackingLabel="about_stores"
                  />
                  <p className="about-page__micro">{copy.microcopy}</p>
                </div>
                <p className="about-page__disclaimer">{copy.disclaimer}</p>
              </div>
            </div>
          </article>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/sobre-nosotros" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
