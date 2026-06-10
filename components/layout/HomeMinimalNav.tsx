'use client';

import Image from 'next/image';
import Link from 'next/link';
import DownloadLink from '@/components/DownloadLink';
import { appStoreHref } from '@/lib/download-links';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeMinimalNavProps = {
  locale: Locale;
};

export default function HomeMinimalNav({ locale }: HomeMinimalNavProps) {
  const copy = getHomeLandingFinalCopy(locale);
  const homeHref = locale === 'en' ? '/en' : '/';
  const pagePath = homeHref;

  return (
    <header className="home-landing-nav" role="banner">
      <nav className="home-landing-nav__inner" aria-label={copy.minimalNav.aria}>
        <Link href={homeHref} className="home-landing-nav__brand" aria-label={copy.minimalNav.logoAria}>
          <span className="home-landing-nav__icon" aria-hidden="true">
            <Image
              src="/assets/images/antoIcon.png"
              alt=""
              width={28}
              height={28}
              className="home-landing-nav__logo"
              priority
            />
          </span>
          <span className="home-landing-nav__name">Anto</span>
        </Link>
        <DownloadLink
          href={appStoreHref()}
          className="home-landing-nav__cta"
          trackingPlacement="home_minimal_nav_cta"
          trackingPage={pagePath}
          trackingLabel="home_minimal_nav"
          aria-label={copy.hero.storeAria}
        >
          {copy.minimalNav.cta}
        </DownloadLink>
      </nav>
    </header>
  );
}
