'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

const SECURITY_ICONS = ['🔐', '🛡️', '🔒'];

type SecurityProps = {
  locale?: Locale;
};

export default function Security({ locale = 'es' }: SecurityProps) {
  const copy = getHomeSectionsCopy(locale).security;

  return (
    <section id="seguridad" className="security-detailed" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
        <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>

        <div className="security-grid" data-stagger>
          {copy.cards.map((card, index) => (
            <div key={card.title} className="security-card reveal-on-scroll" data-stagger-item data-magnetic="0.1">
              <div className="security-icon">{SECURITY_ICONS[index]}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul className="security-features">
                {card.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="section-cta-row">
          <Link href="/seguridad" className="btn btn-secondary">
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
