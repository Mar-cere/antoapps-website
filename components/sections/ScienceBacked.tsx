'use client';

import { useScrollAnimations } from '@/lib/hooks/useScrollAnimations';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

type ScienceBackedProps = {
  locale?: Locale;
};

export default function ScienceBacked({ locale = 'es' }: ScienceBackedProps) {
  useScrollAnimations();
  const copy = getHomeSectionsCopy(locale).scienceBacked;

  return (
    <section id="investigacion" className="science-backed" data-fade-section>
      <div className="container">
        <div className="science-header">
          <div className="science-badge">🔬</div>
          <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
          <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>
        </div>

        <div className="studies-preview-grid" data-stagger>
          {copy.studies.map((study) => (
            <div key={study.title} className="study-preview-card reveal-on-scroll stagger-item" data-stagger-item>
              <div className="study-preview-badge">{study.badge}</div>
              <h3>{study.title}</h3>
              <p className="study-preview-authors">{study.authors}</p>
              <p className="study-preview-abstract">{study.abstract}</p>
              <div className="study-preview-metrics">
                {study.metrics.map((metric) => (
                  <span key={metric} className="metric-badge">
                    {metric}
                  </span>
                ))}
              </div>
              <a
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="study-link"
              >
                {study.linkText}
              </a>
            </div>
          ))}
        </div>

        <div className="science-cta reveal-on-scroll">
          <Link href="/investigacion" className="btn btn-primary btn-large">
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
