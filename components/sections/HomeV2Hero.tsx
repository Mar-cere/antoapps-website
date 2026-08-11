'use client';

import Image from 'next/image';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import HomeV2ChatVignette from '@/components/sections/HomeV2ChatVignette';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

type HomeV2HeroProps = {
  locale?: Locale;
};

/** Hero tipográfico + foto + chat. Motion: solo burbujas del chat. */
export default function HomeV2Hero({ locale = 'es' }: HomeV2HeroProps) {
  const copy = getHomeV2Copy(locale);
  const hero = copy.hero;
  const pagePath = locale === 'en' ? '/en' : '/';

  return (
    <section id="inicio" className="home-v2-hero" aria-labelledby="home-v2-hero-title">
      <div className="home-v2-hero__photo" aria-hidden="true">
        <Image
          src={getEditorialImagePath('evening')}
          alt=""
          fill
          priority
          className="home-v2-hero__photo-img"
          sizes="100vw"
          quality={80}
        />
        <div className="home-v2-hero__photo-scrim" />
      </div>
      <div className="home-v2-hero__wash" aria-hidden="true" />
      <div className="home-landing-container home-v2-hero__grid">
        <div className="home-v2-hero__copy">
          <p className="home-v2-hero__brand">{hero.brand}</p>
          <h1 id="home-v2-hero-title" className="home-v2-hero__title">
            {hero.titleLine1} <em>{hero.titleAccent}</em>
          </h1>
          <p className="home-v2-hero__support">{hero.support}</p>
        </div>

        <div className="home-v2-hero__media">
          <HomeV2ChatVignette thread={hero.chat} locale={locale} size="hero" />
        </div>

        <div className="home-v2-hero__cta">
          <PremiumStoreCtaPair
            locale={locale}
            copy={hero}
            trackingPage={pagePath}
            trackingPlacementPrefix="home_hero"
            trackingLabel="home_hero"
          />
          <p className="home-v2-hero__micro">{hero.ctaMicro}</p>
        </div>
      </div>
      <span className="sr-only">{hero.imageAlt}</span>
    </section>
  );
}
