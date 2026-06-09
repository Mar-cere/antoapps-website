'use client';

import type { Locale } from '@/lib/i18n/config';
import { FeatureIcon } from '@/components/icons/FeatureIcons';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

type FeaturesProps = {
  locale?: Locale;
};

export default function Features({ locale = 'es' }: FeaturesProps) {
  const copy = getHomeSectionsCopy(locale);

  return (
    <>
      <section id="caracteristicas" className="features" data-fade-section>
        <div className="container">
          <h2 className="section-title reveal-on-scroll">{copy.features.title}</h2>
          <p className="section-subtitle reveal-on-scroll">{copy.features.subtitle}</p>
          <div className="features-grid" data-stagger>
            {copy.features.cards.map((card) => (
              <div key={card.title} className="feature-card stagger-item" data-stagger-item>
                <div className="feature-icon icon-hover-enhanced" aria-hidden="true">
                  <FeatureIcon id={card.icon} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="how-it-works" data-fade-section>
        <div className="container">
          <h2 className="section-title reveal-on-scroll">{copy.howItWorks.title}</h2>
          <p className="section-subtitle reveal-on-scroll">{copy.howItWorks.subtitle}</p>
          <div className="steps" data-stagger>
            {copy.howItWorks.steps.map((step, index) => (
              <div key={step.title} className="step" data-stagger-item>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="home-callout">
            <h3 className="home-callout__title">{copy.howItWorks.proTip.title}</h3>
            <p className="home-callout__text">{copy.howItWorks.proTip.description}</p>
          </div>
        </div>
      </section>
    </>
  );
}
