'use client';

import { useScrollAnimations } from '@/lib/hooks/useScrollAnimations';
import PricingCalculator from '@/components/ui/PricingCalculator';
import type { Locale } from '@/lib/i18n/config';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

type PricingProps = {
  locale?: Locale;
};

export default function Pricing({ locale = 'es' }: PricingProps) {
  useScrollAnimations();
  const copy = getHomeSectionsCopy(locale).pricing;

  return (
    <section id="precios" className="pricing" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
        <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>

        <div className="home-callout home-callout--compact reveal-on-scroll">
          <p className="home-callout__label">
            <strong>{copy.valueBanner.label}</strong>
          </p>
          <p className="home-callout__highlight">{copy.valueBanner.highlight}</p>
        </div>

        <PricingCalculator locale={locale} />
      </div>
    </section>
  );
}
