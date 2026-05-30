'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

type AIExplainedProps = {
  locale?: Locale;
};

export default function AIExplained({ locale = 'es' }: AIExplainedProps) {
  const copy = getHomeSectionsCopy(locale).aiExplained;

  return (
    <section id="como-funciona-ia" className="ai-explained" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
        <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>

        <div className="ai-process" data-stagger>
          {copy.steps.map((step, index) => (
            <div key={step.title} className="ai-step reveal-on-scroll" data-stagger-item>
              <div className="ai-step-number">{index + 1}</div>
              <div className="ai-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="ai-tech">
                  {step.techBadges.map((badge) => (
                    <span key={badge} className="tech-badge">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta-row section-cta-row--spaced">
          <Link href={copy.ctaHref} className="btn btn-secondary">
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
