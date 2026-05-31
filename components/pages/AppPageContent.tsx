'use client';

import Image from 'next/image';
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
              <p className="app-hero-subtitle reveal-on-scroll">
                {fillVars(copy.hero.subtitle)}{' '}
                <a
                  href="https://github.com/Mar-cere/Anto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-inline-link"
                >
                  {copy.hero.githubLinkText}
                </a>
              </p>
              <div className="app-hero-badges reveal-on-scroll">
                <span className="app-badge">📌 {fillVars(copy.hero.badges.versionLabel)}</span>
                <span className="app-badge">{copy.hero.badges.earlyAccess}</span>
                <span className="app-badge">{copy.hero.badges.privacy}</span>
                <span className="app-badge">{copy.hero.badges.realtime}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="app-insights" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.latestUpdates.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.latestUpdates.subtitle}</p>
            <div className="insights-grid" data-stagger>
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

        <section className="app-insights" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.insights.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.insights.subtitle}</p>
            <div className="insights-grid" data-stagger>
              {copy.insights.cards.map((card) => (
                <div key={card.label} className="insight-card reveal-on-scroll" data-stagger-item>
                  <div className="insight-icon">{card.icon}</div>
                  {card.value && <div className="insight-value">{card.value}</div>}
                  <div className="insight-label">{card.label}</div>
                  <p className="insight-description">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="app-screenshots" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.screenshots.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.screenshots.subtitle}</p>
            <div className="screenshots-grid" data-stagger>
              {copy.screenshots.items.map((item) => (
                <div key={item.label} className="screenshot-card reveal-on-scroll" data-stagger-item>
                  {item.hasImage ? (
                    <>
                      <Image
                        src="/assets/images/hero/phone-mockup-landing.webp"
                        alt={item.imageAlt ?? item.label}
                        width={375}
                        height={812}
                        className="screenshot-image"
                        quality={95}
                      />
                      <div className="screenshot-info">
                        <div className="screenshot-label">{item.label}</div>
                        <p className="screenshot-description">{item.description}</p>
                      </div>
                    </>
                  ) : (
                    <div className="screenshot-placeholder">
                      <div className="screenshot-label">{item.label}</div>
                      <div className="screenshot-icon">{item.icon}</div>
                      <p className="screenshot-description">{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="screenshots-note reveal-on-scroll">
              <p>
                {copy.screenshots.note.noteLabel} <strong>{copy.screenshots.note.noteBody}</strong>
              </p>
              <p className="screenshots-note__repo">
                {copy.screenshots.note.repoLabel}{' '}
                <a
                  href="https://github.com/Mar-cere/Anto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-inline-link"
                >
                  {copy.screenshots.note.repoLinkText}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="app-features-advanced" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.advancedFeatures.title}</h2>
            <p className="section-subtitle reveal-on-scroll">
              {copy.advancedFeatures.subtitle}
              <strong className="app-version-highlight">
                ✨ {fillVars(copy.advancedFeatures.versionHighlight)}
              </strong>
            </p>
            <div className="advanced-features-grid" data-stagger>
              {copy.advancedFeatures.features.map((feature) => (
                <div key={feature.title} className="advanced-feature reveal-on-scroll" data-stagger-item>
                  <div className="feature-header">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                  </div>
                  <p>{feature.description}</p>
                  <ul className="feature-list">
                    {feature.listItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="app-tech-specs" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.techSpecs.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.techSpecs.subtitle}</p>
            <div className="tech-specs-grid" data-stagger>
              {copy.techSpecs.cards.map((card) => (
                <div key={card.title} className="tech-spec-card reveal-on-scroll" data-stagger-item>
                  <h3>{card.title}</h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
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
