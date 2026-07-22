'use client';

import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
import { appStoreHref } from '@/lib/download-links';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2PricingProps = {
  locale?: Locale;
};

/** Plan destacado + lista + CTA en una sola composición. */
export default function HomeV2Pricing({ locale = 'es' }: HomeV2PricingProps) {
  const { pricing, hero } = getHomeV2Copy(locale);
  const pagePath = locale === 'en' ? '/en' : '/';
  const featured = pricing.cards.find((card) => card.popular) ?? pricing.cards[0];
  const others = pricing.cards.filter((card) => card !== featured);

  return (
    <section id="precios" className="home-v2-pricing" aria-labelledby="home-v2-pricing-title" data-fade-section>
      <div className="home-landing-container home-v2-pricing__layout">
        <div className="home-v2-pricing__head">
          <h2 id="home-v2-pricing-title" className="home-v2-pricing__title">
            {pricing.title}
          </h2>
          <p className="home-v2-pricing__sub">{pricing.subtitle}</p>
        </div>

        <div className="home-v2-pricing__body">
          <div className="home-v2-pricing__featured">
            <span className="home-v2-pricing__badge">{pricing.popularBadge}</span>
            <p className="home-v2-pricing__period">{featured.period}</p>
            <p className="home-v2-pricing__amount">{featured.price}</p>
            <p className="home-v2-pricing__unit">{featured.unit}</p>
          </div>

          <ul className="home-v2-pricing__list">
            {others.map((card) => (
              <li
                key={card.period}
                className={`home-v2-pricing__row${card.save ? ' home-v2-pricing__row--save' : ''}`}
              >
                <span className="home-v2-pricing__row-period">{card.period}</span>
                <span className="home-v2-pricing__row-price">
                  {card.price}
                  <span className="home-v2-pricing__row-unit"> {card.unit}</span>
                </span>
                {card.save ? <span className="home-v2-pricing__row-save">{card.save}</span> : null}
              </li>
            ))}
          </ul>

          <div className="home-v2-pricing__cta">
            <PremiumStoreCta
              storeHref={appStoreHref()}
              storeLabel={hero.ctaStoreLabel}
              storeName={hero.ctaStoreText}
              badge={hero.ctaBadge}
              ariaLabel={hero.storeAria}
              trackingPlacement="home_pricing_store_cta"
              trackingPage={pagePath}
              trackingLabel="home_pricing"
            />
            <p className="home-v2-pricing__micro">{pricing.ctaMicro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
