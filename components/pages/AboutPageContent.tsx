'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getAboutPageCopy } from '@/lib/i18n/copy/pages/about';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/about.css';

type AboutPageContentProps = {
  locale: Locale;
};

function renderStoryParagraph(text: string, emphasis: string, isFirst: boolean) {
  if (!isFirst) {
    return text;
  }

  const emphasisIndex = text.indexOf(emphasis);
  if (emphasisIndex === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, emphasisIndex)}
      <strong>{emphasis}</strong>
      {text.slice(emphasisIndex + emphasis.length)}
    </>
  );
}

export default function AboutPageContent({ locale }: AboutPageContentProps) {
  const copy = getAboutPageCopy(locale);

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

        <section className="about-hero" data-fade-section>
          <div className="container">
            <h1 className="about-title reveal-on-scroll">{copy.hero.title}</h1>
            <p className="about-subtitle reveal-on-scroll">{copy.hero.subtitle}</p>
          </div>
        </section>

        <section className="about-story" data-fade-section>
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2 className="section-title reveal-on-scroll">{copy.story.sectionTitle}</h2>
                {copy.story.paragraphs.map((paragraph, index) => (
                  <p key={index} className="reveal-on-scroll">
                    {renderStoryParagraph(paragraph, copy.story.emphasis, index === 0)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-mission" data-fade-section>
          <div className="container">
            <div className="mission-grid" data-stagger>
              {copy.mission.cards.map((card) => (
                <div key={card.title} className="mission-card reveal-on-scroll" data-stagger-item>
                  <div className="mission-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-values" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.values.sectionTitle}</h2>
            <div className="values-grid" data-stagger>
              {copy.values.items.map((value) => (
                <div key={value.title} className="value-item reveal-on-scroll" data-stagger-item>
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-process" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.process.sectionTitle}</h2>
            <div className="process-steps" data-stagger>
              {copy.process.steps.map((step) => (
                <div key={step.number} className="process-step reveal-on-scroll" data-stagger-item>
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-commitment" data-fade-section>
          <div className="container">
            <div className="commitment-content">
              <h2 className="section-title reveal-on-scroll">{copy.commitment.sectionTitle}</h2>
              <div className="commitment-grid" data-stagger>
                {copy.commitment.items.map((item) => (
                  <div key={item.title} className="commitment-item reveal-on-scroll" data-stagger-item>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-cta" data-fade-section>
          <div className="container">
            <div className="cta-content">
              <h2 className="reveal-on-scroll">{copy.cta.title}</h2>
              <p className="reveal-on-scroll">{copy.cta.description}</p>
              <div className="cta-buttons reveal-on-scroll">
                <Link href={copy.cta.downloadHref} className="btn btn-primary btn-large">
                  {copy.cta.downloadLabel}
                </Link>
                <Link href={copy.cta.contactHref} className="btn btn-secondary btn-large">
                  {copy.cta.contactLabel}
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
