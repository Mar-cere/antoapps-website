'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getWhatsNewCopy } from '@/lib/i18n/copy/home/whats-new';

type WhatsNewProps = {
  locale?: Locale;
};

export default function WhatsNew({ locale = 'es' }: WhatsNewProps) {
  const copy = getWhatsNewCopy(locale);

  return (
    <section id="novedades" className="whats-new" data-fade-section>
      <div className="container">
        <div className="whats-new__header reveal-on-scroll">
          <span className="whats-new__badge">{copy.versionBadge}</span>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-subtitle">{copy.subtitle}</p>
        </div>

        <div className="whats-new__grid" data-stagger>
          {copy.items.map((item) => (
            <article key={item.title} className="whats-new__card reveal-on-scroll" data-stagger-item>
              <span className="whats-new__icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="whats-new__card-title">{item.title}</h3>
              <p className="whats-new__card-text">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="whats-new__cta reveal-on-scroll">
          <Link href={copy.cta.changelogHref} className="btn btn-secondary">
            {copy.cta.changelogLabel}
          </Link>
          <Link href={copy.cta.appHref} className="btn btn-primary">
            {copy.cta.appLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
