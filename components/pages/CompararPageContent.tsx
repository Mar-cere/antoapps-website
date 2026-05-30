'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getCompararPageCopy } from '@/lib/i18n/copy/comparar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/comparison.css';

type CompararPageContentProps = {
  locale: Locale;
};

export default function CompararPageContent({ locale }: CompararPageContentProps) {
  const copy = getCompararPageCopy(locale);

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

        <section className="comparison-hero" data-fade-section>
          <div className="container">
            <h1 className="comparison-title reveal-on-scroll">{copy.hero.title}</h1>
            <p className="comparison-subtitle reveal-on-scroll">{copy.hero.subtitle}</p>
          </div>
        </section>

        <section className="comparison-section" data-fade-section>
          <div className="container">
            <div className="comparison-content active" id="apps">
              <div className="apps-comparison">
                <div className="app-comparison-card reveal-on-scroll">
                  <div className="app-header">
                    <Image
                      src="/assets/images/antoIcon.png"
                      alt={copy.comparison.anto.logoAlt}
                      width={50}
                      height={50}
                      className="app-logo"
                    />
                    <h3>{copy.comparison.anto.name}</h3>
                  </div>
                  <div className="app-features">
                    {copy.comparison.anto.features.map((row) => (
                      <div key={row.label} className="feature-row">
                        <span className="feature-label">{row.label}</span>
                        <span className="feature-value">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={copy.comparison.anto.ctaHref} className="btn btn-primary btn-block">
                    {copy.comparison.anto.ctaLabel}
                  </Link>
                </div>

                <div className="app-comparison-card reveal-on-scroll">
                  <div className="app-header">
                    <div className="app-placeholder" aria-hidden="true">
                      {copy.comparison.others.placeholderIcon}
                    </div>
                    <h3>{copy.comparison.others.title}</h3>
                  </div>
                  <div className="app-features">
                    {copy.comparison.others.features.map((row) => (
                      <div key={row.label} className="feature-row">
                        <span className="feature-label">{row.label}</span>
                        <span className="feature-value">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="app-note">
                    <p>{copy.comparison.others.note}</p>
                  </div>
                </div>
              </div>

              <div className="comparison-advantages">
                <h3 className="reveal-on-scroll">{copy.comparison.advantagesTitle}</h3>
                <div className="advantages-grid" data-stagger>
                  {copy.comparison.advantages.map((item) => (
                    <div key={item.title} className="advantage-item reveal-on-scroll" data-stagger-item>
                      <div className="advantage-icon" aria-hidden="true">
                        {item.icon}
                      </div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="comparison-cta" data-fade-section>
          <div className="container">
            <div className="cta-content">
              <h2 className="reveal-on-scroll">{copy.cta.title}</h2>
              <p className="reveal-on-scroll">{copy.cta.subtitle}</p>
              <div className="cta-buttons reveal-on-scroll">
                <Link href={copy.cta.downloadHref} className="btn btn-primary btn-large">
                  {copy.cta.downloadLabel}
                </Link>
                <Link href={copy.cta.salesHref} className="btn btn-secondary btn-large">
                  {copy.cta.salesLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
