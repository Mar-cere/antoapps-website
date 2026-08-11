'use client';

import Image from 'next/image';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

type HomeV2FinalCtaProps = {
  locale?: Locale;
};

export default function HomeV2FinalCta({ locale = 'es' }: HomeV2FinalCtaProps) {
  const copy = getHomeV2Copy(locale);
  const pagePath = locale === 'en' ? '/en' : '/';

  return (
    <section className="home-v2-final-cta" aria-labelledby="home-v2-final-cta-title" data-fade-section>
      <div className="home-v2-final-cta__media" aria-hidden="true">
        <Image
          src={getEditorialImagePath('evening')}
          alt=""
          fill
          className="home-v2-final-cta__bg"
          sizes="100vw"
          quality={80}
        />
        <div className="home-v2-final-cta__scrim" />
      </div>
      <div className="home-landing-container home-v2-final-cta__inner reveal-on-scroll">
        <h2 id="home-v2-final-cta-title" className="home-v2-final-cta__title">
          {copy.finalCta.title}
        </h2>
        <p className="home-v2-final-cta__sub">{copy.finalCta.subtitle}</p>
        <PremiumStoreCtaPair
          locale={locale}
          copy={copy.hero}
          trackingPage={pagePath}
          trackingPlacementPrefix="home_final"
          trackingLabel="home_final_cta"
        />
        <p className="home-v2-final-cta__micro">{copy.hero.ctaMicro}</p>
      </div>
      <span className="sr-only">{copy.finalCta.imageAlt}</span>
    </section>
  );
}
