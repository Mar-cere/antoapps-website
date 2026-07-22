'use client';

import Image from 'next/image';
import Link from 'next/link';
import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
import HomeV2ChatVignette from '@/components/sections/HomeV2ChatVignette';
import { appStoreHref } from '@/lib/download-links';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

type HomeV2HeroProps = {
  locale?: Locale;
};

/** Hero tipográfico + foto de atmósfera + viñeta de chat. */
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
          <p className="home-v2-hero__brand home-v2-enter" style={{ '--home-v2-i': 0 } as React.CSSProperties}>
            {hero.brand}
          </p>
          <h1
            id="home-v2-hero-title"
            className="home-v2-hero__title home-v2-enter"
            style={{ '--home-v2-i': 1 } as React.CSSProperties}
          >
            {hero.titleLine1} <em>{hero.titleAccent}</em>
          </h1>
          <p
            className="home-v2-hero__support home-v2-enter"
            style={{ '--home-v2-i': 2 } as React.CSSProperties}
          >
            {hero.support}
          </p>
        </div>

        <div
          className="home-v2-hero__media home-v2-enter home-v2-enter--media"
          style={{ '--home-v2-i': 3 } as React.CSSProperties}
        >
          <HomeV2ChatVignette thread={hero.chat} locale={locale} size="hero" />
        </div>

        <div
          className="home-v2-hero__cta home-v2-enter"
          style={{ '--home-v2-i': 4 } as React.CSSProperties}
        >
          <PremiumStoreCta
            storeHref={appStoreHref()}
            storeLabel={hero.ctaStoreLabel}
            storeName={hero.ctaStoreText}
            badge={hero.ctaBadge}
            ariaLabel={hero.storeAria}
            trackingPlacement="home_hero_store_cta"
              trackingPage={pagePath}
              trackingLabel="home_hero"
          />
          <p className="home-v2-hero__micro">{hero.ctaMicro}</p>
          <Link href="#android" className="home-v2-hero__android">
            {hero.androidLink}
          </Link>
        </div>
      </div>
      <span className="sr-only">{hero.imageAlt}</span>
    </section>
  );
}
