'use client';

import Image from 'next/image';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

type HomeV2FinalCtaProps = {
  locale?: Locale;
};

/** Cierre peak-end: foto distinta del hero + par App Store / Google Play. */
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
        <PremiumStoreCtaPair
          locale={locale}
          copy={hero}
          trackingPage={pagePath}
          trackingPlacementPrefix="home_final"
          trackingLabel="home_final_cta"
        />
        <p className="home-v2-final-cta__micro">{hero.ctaMicro}</p>
      </div>
      <span className="sr-only">{copy.finalCta.imageAlt}</span>
    </section>
  );
}
