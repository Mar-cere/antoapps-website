'use client';

import Link from 'next/link';
import { APP_VERSION, APP_VERSION_LABEL } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getAppPageCopy } from '@/lib/i18n/copy/app';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/app-page.css';

function fillVars(text: string): string {
  return text.replaceAll('{version}', APP_VERSION).replaceAll('{versionLabel}', APP_VERSION_LABEL);
}

type AppPageContentProps = {
  locale: Locale;
};

export default function AppPageContent({ locale }: AppPageContentProps) {
  const copy = getAppPageCopy(locale);

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <Header />
      <main lang={locale}>
        <Breadcrumbs
          items={[
            { label: copy.breadcrumbs.homeLabel, href: copy.breadcrumbs.homeHref },
            { label: copy.breadcrumbs.currentLabel },
          ]}
        />

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
            </div>
          </div>
        </section>

        <section className="app-what-is" data-fade-section>
          <div className="container container--narrow">
            <h2 className="section-title reveal-on-scroll">{copy.whatIs.title}</h2>
            <p className="app-what-is__body reveal-on-scroll">{copy.whatIs.body}</p>
          </div>
        </section>

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
              <Link href={copy.cta.downloadHref} className="btn btn-primary btn-large">
                {copy.cta.downloadLabel}
              </Link>
              <Link href={copy.cta.contactHref} className="btn btn-secondary btn-large">
                {copy.cta.contactLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
