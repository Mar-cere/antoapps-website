'use client';

import { BienvenidaV2TrustIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

const TRUST_ICONS = ['lock', 'no-card', 'chile'] as const;

type HomeFooterTrustProps = {
  locale?: Locale;
};

export default function HomeFooterTrust({ locale = 'es' }: HomeFooterTrustProps) {
  const copy = getHomeLandingFinalCopy(locale).footerTrust;

  return (
    <section className="home-landing-footer-trust" aria-label={copy.disclaimer}>
      <ul className="home-landing-footer-trust__list">
        {copy.items.map((item, index) => (
          <li key={item.label} className="home-landing-footer-trust__item">
            <BienvenidaV2TrustIcon id={TRUST_ICONS[index]} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <p className="home-landing-footer-trust__legal">{copy.disclaimer}</p>
    </section>
  );
}
