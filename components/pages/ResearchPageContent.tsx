'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getResearchPageCopy } from '@/lib/i18n/copy/pages/research';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/research.css';

type ResearchPageContentProps = {
  locale: Locale;
};

export default function ResearchPageContent({ locale }: ResearchPageContentProps) {
  const copy = getResearchPageCopy(locale);

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

        <section className="research-hero" data-fade-section>
          <div className="container">
            <h1 className="research-title reveal-on-scroll">{copy.hero.title}</h1>
            <p className="research-subtitle reveal-on-scroll">{copy.hero.subtitle}</p>
          </div>
        </section>

        <section className="research-overview" data-fade-section>
          <div className="container">
            <div className="research-intro">
              <h2 className="section-title reveal-on-scroll">{copy.overview.sectionTitle}</h2>
              <p className="reveal-on-scroll">{copy.overview.intro}</p>
            </div>

            <div className="findings-section">
              <h3 className="reveal-on-scroll">{copy.overview.findingsTitle}</h3>
              <div className="findings-grid" data-stagger>
                {copy.overview.findings.map((finding) => (
                  <div key={finding.title} className="finding-card reveal-on-scroll" data-stagger-item>
                    <div className="finding-number">{finding.icon}</div>
                    <h4>{finding.title}</h4>
                    <p>{finding.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="studies-section">
              <h2 className="section-title reveal-on-scroll">{copy.studies.sectionTitle}</h2>
              <p className="section-subtitle reveal-on-scroll section-subtitle--spaced">
                {copy.studies.sectionSubtitle}
              </p>
              <div className="studies-list">
                {copy.studies.items.map((study) => (
                  <div key={study.link} className="study-item reveal-on-scroll">
                    <div className="study-journal">{study.journal}</div>
                    <h4>{study.title}</h4>
                    <p className="study-authors">{study.authors}</p>
                    <p>{study.description}</p>
                    <div className="study-meta">
                      <span className="study-type">{study.studyType}</span>
                      <span className="study-impact">{study.impact}</span>
                    </div>
                    <a
                      href={study.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      {study.viewStudyLabel}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="research-methodology" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.methodology.sectionTitle}</h2>

            <div className="methodology-steps" data-stagger>
              {copy.methodology.steps.map((step, index) => (
                <div key={step.title} className="method-step reveal-on-scroll" data-stagger-item>
                  <div className="method-number">{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="research-references" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.references.sectionTitle}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.references.sectionSubtitle}</p>

            <div className="references-list">
              {copy.references.items.map((ref, index) => (
                <div key={ref.href} className="reference-item reveal-on-scroll">
                  <div className="reference-number">{index + 1}</div>
                  <div className="reference-content">
                    <p>{ref.citation}</p>
                    <a
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reference-link"
                    >
                      {ref.href}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="research-cta" data-fade-section>
          <div className="container">
            <div className="cta-content">
              <h2 className="reveal-on-scroll">{copy.cta.title}</h2>
              <p className="reveal-on-scroll">{copy.cta.description}</p>
              <div className="cta-buttons reveal-on-scroll">
                <Link href={copy.cta.contactHref} className="btn btn-primary btn-large">
                  {copy.cta.contactLabel}
                </Link>
                <a href={copy.cta.emailHref} className="btn btn-secondary btn-large">
                  {copy.cta.emailLabel}
                </a>
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
