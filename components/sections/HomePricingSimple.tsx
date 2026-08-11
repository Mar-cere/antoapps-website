'use client';

import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomePricingSimpleProps = {
  locale?: Locale;
};

export default function HomePricingSimple({ locale = 'es' }: HomePricingSimpleProps) {
  const copy = getHomeLandingFinalCopy(locale);
  const pricing = copy.pricing;
  const hero = copy.hero;
  const pagePath = locale === 'en' ? '/en' : '/';

  return (
    <section
      id="precios"
      className="home-landing-pricing"
      aria-labelledby="home-pricing-title"
      data-fade-section
    >
      <div className="home-landing-pricing__head reveal-on-scroll">
        <p className="home-landing-eyebrow">{pricing.eyebrow}</p>
        <h2 id="home-pricing-title" className="home-landing-cred__title">
          {pricing.title}
        </h2>
        <p className="home-landing-cred__sub">{pricing.subtitle}</p>
      </div>
      <div className="home-landing-price-grid">
        {pricing.cards.map((card) => (
          <div
            key={card.period}
            className={`home-landing-price-card reveal-on-scroll ${card.popular ? 'home-landing-price-card--featured' : ''}`}
            data-stagger-item
          >
            {card.popular && (
              <div className="home-landing-price-pop">
                <span>{pricing.popularBadge}</span>
              </div>
            )}
            <p className="home-landing-price-period">{card.period}</p>
            <p className="home-landing-price-amount">{card.price}</p>
            <p className="home-landing-price-unit">{card.unit}</p>
            {card.save && <p className="home-landing-price-save">{card.save}</p>}
          </div>
        ))}
      </div>
      <div className="home-landing-price-cta">
        <PremiumStoreCtaPair
          locale={locale}
          copy={hero}
          trackingPage={pagePath}
          trackingPlacementPrefix="home_pricing"
          trackingLabel="home_pricing_premium"
        />
        <p className="home-landing-cta-micro">{pricing.ctaMicro}</p>
      </div>
    </section>
  );
}
