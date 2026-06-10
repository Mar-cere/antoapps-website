'use client';

import { BienvenidaV2TrustIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

const TRUST_ICONS = ['lock', 'no-card', 'chile'] as const;

type HomeHeroTrustProps = {
  locale?: Locale;
};

export default function HomeHeroTrust({ locale = 'es' }: HomeHeroTrustProps) {
  const items = getHomeLandingFinalCopy(locale).footerTrust.items;

  return (
    <ul className="home-landing-hero-trust" aria-label={locale === 'en' ? 'Trust signals' : 'Señales de confianza'}>
      {items.map((item, index) => (
        <li key={item.label} className="home-landing-hero-trust__item">
          <BienvenidaV2TrustIcon id={TRUST_ICONS[index]} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
