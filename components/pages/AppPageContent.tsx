'use client';

import Image from 'next/image';
import Link from 'next/link';
import { APP_VERSION, APP_VERSION_LABEL } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getAppPageCopy } from '@/lib/i18n/copy/app';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_WIDTH,
  getAppScreenshotAlt,
  getAppScreenshotPath,
} from '@/lib/assets/app-screenshots';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AppScreenshots from '@/components/sections/AppScreenshots';
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
  const nav = getHomeV2Copy(locale).nav;
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
                <div className="app-hero__copy">
                  <p className="app-hero__brand">anto.</p>
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
                <figure className="app-hero__figure">
                  <div className="app-hero__shot">
                    <Image
                      src={getAppScreenshotPath('chat')}
                      alt={getAppScreenshotAlt('chat', locale)}
                      width={APP_SCREENSHOT_WIDTH}
                      height={APP_SCREENSHOT_HEIGHT}
                      className="app-hero__shot-img"
                      sizes="(max-width: 959px) 70vw, 18rem"
                      priority
                    />
                  </div>
                </figure>
              </div>
            </div>
          </section>

          <section className="app-what-is">
            <div className="container">
              <h2 className="section-title">{copy.whatIs.title}</h2>
              <p className="app-what-is__body">{copy.whatIs.body}</p>
            </div>
          </section>

          <AppScreenshots
            locale={locale}
            title={copy.screenshots.title}
            subtitle={copy.screenshots.subtitle}
          />

          <section className="app-benefits">
            <div className="container">
              <h2 className="section-title">{copy.benefits.title}</h2>
              <p className="section-subtitle">{copy.benefits.subtitle}</p>
              <div className="insights-grid">
                {copy.benefits.cards.map((card) => (
                  <div key={card.label} className="insight-card">
                    <div className="insight-label">{card.label}</div>
                    <p className="insight-description">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="app-updates">
            <div className="container">
              <h2 className="section-title">{copy.latestUpdates.title}</h2>
              <p className="section-subtitle">{copy.latestUpdates.subtitle}</p>
              <div className="insights-grid insights-grid--compact">
                {copy.latestUpdates.cards.map((card) => (
                  <div key={card.label} className="insight-card">
                    <div className="insight-label">{card.label}</div>
                    <p className="insight-description">{card.description}</p>
                  </div>
                ))}
              </div>
              <div className="screenshots-note">
                <p>
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
              </div>
            </div>
          </section>

          <section className="app-features-link">
            <div className="container container--narrow">
              <h2 className="section-title">{copy.featuresLink.title}</h2>
              <p className="section-subtitle">{copy.featuresLink.subtitle}</p>
              <div className="app-features-link__action">
                <Link href={copy.featuresLink.href} className="btn btn-secondary btn-large">
                  {copy.featuresLink.label}
                </Link>
              </div>
            </div>
          </section>

          <section className="app-cta">
            <div className="container">
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
            <div className="container">
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
