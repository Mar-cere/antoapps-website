'use client';

import Image from 'next/image';
import Link from 'next/link';
import { APP_VERSION, APP_VERSION_LABEL } from '@/lib/app-version';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getAppPageCopy } from '@/lib/i18n/copy/app';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import HomeV2Reveal from '@/components/sections/HomeV2Reveal';
import {
  HomeV2ChatExcerpt,
  HomeV2GuideExcerpt,
} from '@/components/sections/HomeV2ProductFigure';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/app-page.css';

function fillVars(text: string): string {
  return text.replaceAll('{version}', APP_VERSION).replaceAll('{versionLabel}', APP_VERSION_LABEL);
}

type AppPageContentProps = {
  locale: Locale;
};

export default function AppPageContent({ locale }: AppPageContentProps) {
  const copy = getAppPageCopy(locale);
  const home = getHomeV2Copy(locale);
  const nav = home.nav;
  const product = home.product;
  const trial = getTrialCopy(locale);
  const storePair = {
    ctaStoreLabel: locale === 'en' ? 'Download on' : 'Descargar en',
    ctaStoreText: copy.cta.appStoreLabel,
    ctaBadge: trial.short,
    storeAria: copy.cta.appStoreAria,
    ctaPlayLabel: locale === 'en' ? 'Get it on' : 'Disponible en',
    ctaPlayText: copy.cta.playLabel,
    ctaPlayBadge: trial.short,
    androidStoreAria: copy.cta.playAria,
  };
  const pagePath = locale === 'en' ? '/en/app' : '/app';
  const disclaimer =
    locale === 'en'
      ? 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.'
      : 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.';

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <div className="home-v2-shell app-shell">
        <HomeV2Reveal />
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
          ctaAria={nav.ctaAria}
        />
        <main id="main-content" className="home-landing-page home-landing-page--v2 app-page" lang={locale}>
          <section className="app-hero">
            <div className="home-landing-container">
              <div className="app-hero__grid">
                <div className="app-hero__copy" data-home-reveal>
                  <h1 className="app-hero__title">{copy.hero.title}</h1>
                  <p className="app-hero__support">{fillVars(copy.hero.subtitle)}</p>
                  <div className="app-hero__stores">
                    <PremiumStoreCtaPair
                      locale={locale}
                      copy={storePair}
                      trackingPage={pagePath}
                      trackingPlacementPrefix="app_hero"
                      trackingLabel="app_page"
                    />
                  </div>
                </div>
                <HomeV2ChatExcerpt product={product} />
              </div>
            </div>
          </section>

          <section className="app-what-is" aria-labelledby="app-what-title">
            <div className="home-landing-container app-what-is__layout">
              <div data-home-reveal>
                <h2 id="app-what-title" className="app-section-title">
                  {copy.whatIs.title}
                </h2>
                <p className="app-what-is__body">{copy.whatIs.body}</p>
              </div>
              <figure className="app-what-is__figure" data-home-reveal="image">
                <Image
                  src={getEditorialImagePath('morningPause')}
                  alt={copy.whatIs.imageAlt}
                  width={1600}
                  height={900}
                  className="app-what-is__img"
                  sizes="(max-width: 959px) 100vw, 46vw"
                  quality={85}
                />
              </figure>
            </div>
          </section>

          <section className="app-inside" aria-labelledby="app-inside-title">
            <div className="home-landing-container">
              <div className="app-inside__head" data-home-reveal>
                <h2 id="app-inside-title" className="app-section-title">
                  {copy.screenshots.title}
                </h2>
                <p className="app-section-support">{copy.screenshots.subtitle}</p>
              </div>
              <div className="app-inside__pair">
                <HomeV2GuideExcerpt product={product} />
                <ul className="app-rows">
                  {copy.benefits.cards.map((card) => (
                    <li key={card.label}>
                      <h3>{card.label}</h3>
                      <p>{card.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="app-updates" aria-labelledby="app-updates-title">
            <div className="home-landing-container">
              <h2 id="app-updates-title" className="app-section-title" data-home-reveal>
                {copy.latestUpdates.title}
              </h2>
              <p className="app-section-support">{copy.latestUpdates.subtitle}</p>
              <ul className="app-rows app-rows--updates">
                {copy.latestUpdates.cards.map((card) => (
                  <li key={card.label}>
                    <h3>{card.label}</h3>
                    <p>{card.description}</p>
                  </li>
                ))}
              </ul>
              <p className="app-updates__note">
                {copy.latestUpdates.note.beforeChangelog}{' '}
                <Link href={copy.latestUpdates.note.changelogHref} className="app-inline-link">
                  {copy.latestUpdates.note.changelogLabel}
                </Link>
                {copy.latestUpdates.note.betweenChangelogBienvenida}{' '}
                <Link href={copy.latestUpdates.note.bienvenidaHref} className="app-inline-link">
                  {copy.latestUpdates.note.bienvenidaLabel}
                </Link>
                {copy.latestUpdates.note.betweenBienvenidaPrivacidad}{' '}
                <Link href={copy.latestUpdates.note.privacidadHref} className="app-inline-link">
                  {copy.latestUpdates.note.privacidadLabel}
                </Link>
                {copy.latestUpdates.note.afterPrivacidad}
              </p>
              <p className="app-updates__more">
                <Link href={copy.featuresLink.href} className="app-inline-link">
                  {copy.featuresLink.label}
                </Link>
                <Link href={copy.featuresLink.resourcesHref} className="app-inline-link">
                  {copy.featuresLink.resourcesLabel}
                </Link>
              </p>
            </div>
          </section>

          <section className="app-cta">
            <div className="home-landing-container">
              <h2 className="section-title">{copy.cta.title}</h2>
              <p className="section-subtitle">{copy.cta.subtitle}</p>
              <div className="app-cta-buttons">
                <PremiumStoreCtaPair
                  locale={locale}
                  copy={storePair}
                  trackingPage={pagePath}
                  trackingPlacementPrefix="app_cta"
                  trackingLabel="app_page"
                />
                <Link href={copy.cta.contactHref} className="btn btn-secondary btn-large">
                  {copy.cta.contactLabel}
                </Link>
              </div>
            </div>
          </section>

          <section className="app-disclaimer">
            <div className="home-landing-container">
              <p className="disclaimer-text">{disclaimer}</p>
            </div>
          </section>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/app" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
