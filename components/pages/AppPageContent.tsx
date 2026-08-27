'use client';

import Link from 'next/link';
import { APP_VERSION, APP_VERSION_LABEL } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getAppPageCopy } from '@/lib/i18n/copy/app';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AppScreenshots from '@/components/sections/AppScreenshots';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import '@/styles/pages/home-landing-final.css';
import '@/styles/utils/hl-chrome-wrapper.css';
import '@/styles/components/app-page.css';

function fillVars(text: string): string {
  return text.replaceAll('{version}', APP_VERSION).replaceAll('{versionLabel}', APP_VERSION_LABEL);
}

type AppPageContentProps = {
  locale: Locale;
};

export default function AppPageContent({ locale }: AppPageContentProps) {
  const copy = getAppPageCopy(locale);
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
      <div className="hl-chrome-wrapper">
        <HomeMinimalNav locale={locale} />
        <main lang={locale}>
          <section className="app-hero" data-fade-section>
          <div className="container">
            <div className="app-hero-content">
              <h1 className="app-hero-title reveal-on-scroll">{copy.hero.title}</h1>
              <p className="app-hero-subtitle reveal-on-scroll">{fillVars(copy.hero.subtitle)}</p>
              <div className="app-hero-badges reveal-on-scroll">
                <span className="app-badge">📌 {fillVars(copy.hero.badges.versionLabel)}</span>
                <span className="app-badge">{copy.hero.badges.availability}</span>
                <span className="app-badge">{copy.hero.badges.privacy}</span>
                <span className="app-badge">{copy.hero.badges.languages}</span>
              </div>
              <div className="app-hero-stores reveal-on-scroll">
                <PremiumStoreCtaPair
                  locale={locale}
                  copy={storePair}
                  trackingPage={pagePath}
                  trackingPlacementPrefix="app_hero"
                  trackingLabel="app_page"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="app-what-is" data-fade-section>
          <div className="container container--narrow">
            <h2 className="section-title reveal-on-scroll">{copy.whatIs.title}</h2>
            <p className="app-what-is__body reveal-on-scroll">{copy.whatIs.body}</p>
          </div>
        </section>

        <AppScreenshots
          locale={locale}
          title={copy.screenshots.title}
          subtitle={copy.screenshots.subtitle}
        />

        <section className="app-benefits" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.benefits.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.benefits.subtitle}</p>
            <div className="insights-grid" data-stagger>
              {copy.benefits.cards.map((card) => (
                <div key={card.label} className="insight-card reveal-on-scroll" data-stagger-item>
                  <div className="insight-icon">{card.icon}</div>
                  <div className="insight-label">{card.label}</div>
                  <p className="insight-description">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="app-updates" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.latestUpdates.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.latestUpdates.subtitle}</p>
            <div className="insights-grid insights-grid--compact" data-stagger>
              {copy.latestUpdates.cards.map((card) => (
                <div key={card.label} className="insight-card reveal-on-scroll" data-stagger-item>
                  <div className="insight-icon">{card.icon}</div>
                  <div className="insight-label">{card.label}</div>
                  <p className="insight-description">{card.description}</p>
                </div>
              ))}
            </div>
            <div className="screenshots-note reveal-on-scroll">
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

        <section className="app-features-link" data-fade-section>
          <div className="container container--narrow">
            <h2 className="section-title reveal-on-scroll">{copy.featuresLink.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.featuresLink.subtitle}</p>
            <div className="app-features-link__action reveal-on-scroll">
              <Link href={copy.featuresLink.href} className="btn btn-secondary btn-large">
                {copy.featuresLink.label}
              </Link>
            </div>
          </div>
        </section>

        <section className="app-cta" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.cta.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.cta.subtitle}</p>
            <div className="app-cta-buttons reveal-on-scroll">
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

        <section className="app-disclaimer" data-fade-section>
          <div className="container">
            <p className="disclaimer-text reveal-on-scroll">{disclaimer}</p>
          </div>
        </section>
      </main>
      <HomeMinimalFooter locale={locale} switchPath="/app" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
