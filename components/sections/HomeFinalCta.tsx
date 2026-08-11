'use client';

import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeFinalCtaProps = {
  locale?: Locale;
};

export default function HomeFinalCta({ locale = 'es' }: HomeFinalCtaProps) {
  const copy = getHomeLandingFinalCopy(locale);
  const { finalCta, hero } = copy;
  const pagePath = locale === 'en' ? '/en' : '/';

  return (
    <section
      className="home-landing-final-cta"
      aria-labelledby="home-final-cta-title"
      data-fade-section
    >
      <div className="home-landing-final-cta__glow" aria-hidden="true" />
      <div className="home-landing-final-cta__inner reveal-on-scroll">
        <h2 id="home-final-cta-title" className="home-landing-final-cta__title">
          {finalCta.title}
        </h2>
        <p className="home-landing-final-cta__sub">{finalCta.subtitle}</p>
        <PremiumStoreCtaPair
          locale={locale}
          copy={hero}
          trackingPage={pagePath}
          trackingPlacementPrefix="home_final"
          trackingLabel="home_final_cta"
        />
        <p className="home-landing-cta-micro">{hero.ctaMicro}</p>
      </div>
    </section>
  );
}
