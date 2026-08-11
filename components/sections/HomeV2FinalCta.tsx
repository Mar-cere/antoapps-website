'use client';

import Image from 'next/image';
import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import { appStoreHref } from '@/lib/download-links';

type HomeV2FinalCtaProps = {
  locale?: Locale;
};

/** Cierre peak-end: foto distinta del hero + un CTA primario (App Store). */
export default function HomeV2FinalCta({ locale = 'es' }: HomeV2FinalCtaProps) {
  const copy = getHomeV2Copy(locale);
  const pagePath = locale === 'en' ? '/en' : '/';
  const hero = copy.hero;

  return (
    <section className="home-v2-final-cta" aria-labelledby="home-v2-final-cta-title" data-fade-section>
      <div className="home-v2-final-cta__media" aria-hidden="true">
        <Image
          src={getEditorialImagePath('sleeplessNight')}
          alt=""
          fill
          className="home-v2-final-cta__bg"
          sizes="100vw"
          quality={80}
        />
        <div className="home-v2-final-cta__scrim" />
      </div>
      <div className="home-landing-container home-v2-final-cta__inner">
        <h2 id="home-v2-final-cta-title" className="home-v2-final-cta__title">
          {copy.finalCta.title}
        </h2>
        <p className="home-v2-final-cta__sub">{copy.finalCta.subtitle}</p>
        <PremiumStoreCta
          store="apple"
          storeHref={appStoreHref()}
          storeLabel={hero.ctaStoreLabel}
          storeName={hero.ctaStoreText}
          badge={hero.ctaBadge}
          ariaLabel={hero.storeAria}
          trackingPlacement="home_final_app_store"
          trackingPage={pagePath}
          trackingLabel="home_final_cta_ios"
        />
        <p className="home-v2-final-cta__micro">{hero.ctaMicro}</p>
      </div>
      <span className="sr-only">{copy.finalCta.imageAlt}</span>
    </section>
  );
}
