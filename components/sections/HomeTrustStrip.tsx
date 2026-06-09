'use client';

import { BienvenidaV2TrustIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';
import type { Locale } from '@/lib/i18n/config';
import { getHomeHeroCopy } from '@/lib/i18n/copy/home-hero';

type HomeTrustStripProps = {
  locale?: Locale;
};

export default function HomeTrustStrip({ locale = 'es' }: HomeTrustStripProps) {
  const copy = getHomeHeroCopy(locale);

  return (
    <div className="home-trust-strip" aria-label={copy.starsAria}>
      <ul className="home-trust-strip__list">
        {copy.trustItems.map((item) => (
          <li key={item.label} className="home-trust-strip__item">
            <BienvenidaV2TrustIcon id={item.icon} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
