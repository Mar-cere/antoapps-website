'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getSecurityPageCopy } from '@/lib/i18n/copy/pages/security';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/security-page.css';

type SecurityPageContentProps = {
  locale: Locale;
};

export default function SecurityPageContent({ locale }: SecurityPageContentProps) {
  const copy = getSecurityPageCopy(locale);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

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

        <section className="security-hero" data-fade-section>
          <div className="container">
            <h1 className="security-title reveal-on-scroll">{copy.hero.title}</h1>
            <p className="security-subtitle reveal-on-scroll">{copy.hero.subtitle}</p>
            <div className="security-badges reveal-on-scroll">
              {copy.hero.badges.map((badge) => (
                <span key={badge} className="badge-cert">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="security-overview" data-fade-section>
          <div className="container">
            <div className="security-intro">
              <h2 className="section-title reveal-on-scroll">{copy.overview.sectionTitle}</h2>
              <p className="reveal-on-scroll">{copy.overview.intro}</p>
            </div>

            <div className="certifications-section">
              <h3 className="reveal-on-scroll">{copy.overview.certificationsTitle}</h3>
              <div className="certifications-grid" data-stagger>
                {copy.overview.certifications.map((cert) => (
                  <div key={cert.title} className="cert-card reveal-on-scroll" data-stagger-item>
                    <div className="cert-icon">{cert.icon}</div>
                    <h4>{cert.title}</h4>
                    <p>{cert.description}</p>
                    {cert.linkHref && cert.linkLabel && (
                      <a
                        href={cert.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                      >
                        {cert.linkLabel}
                      </a>
                    )}
                    {cert.status && <span className="cert-status">{cert.status}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="security-measures" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.measures.sectionTitle}</h2>

            <div className="measures-grid" data-stagger>
              {copy.measures.items.map((measure) => (
                <div key={measure.title} className="measure-card reveal-on-scroll" data-stagger-item>
                  <div className="measure-icon">{measure.icon}</div>
                  <h3>{measure.title}</h3>
                  <p>{measure.description}</p>
                  <ul className="measure-details">
                    {measure.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="security-reports" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.reports.sectionTitle}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.reports.sectionSubtitle}</p>

            <div className="reports-grid" data-stagger>
              {copy.reports.items.map((report) => (
                <div key={report.title} className="report-card reveal-on-scroll" data-stagger-item>
                  <h3>{report.title}</h3>
                  <p>{report.description}</p>
                  {report.buttonHref && report.buttonLabel && (
                    <a href={report.buttonHref} className="btn btn-secondary">
                      {report.buttonLabel}
                    </a>
                  )}
                  {report.status && <span className="report-status">{report.status}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="security-faq" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.faq.sectionTitle}</h2>

            <div className="faq-list">
              {copy.faq.items.map((item, index) => {
                const isOpen = activeFaqIndex === index;

                return (
                  <div key={item.question} className={`faq-item ${isOpen ? 'active' : ''}`}>
                    <button type="button" className="faq-question" onClick={() => toggleFaq(index)}>
                      <span>{item.question}</span>
                      <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div className={`faq-answer ${isOpen ? 'active' : ''}`}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
