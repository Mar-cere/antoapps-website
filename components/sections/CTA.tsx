'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DownloadLink from '@/components/DownloadLink';
import AppStoreBadge from '@/components/AppStoreBadge';
import GooglePlayBadge from '@/components/GooglePlayBadge';
import { appStoreHref, googlePlayHref } from '@/lib/download-links';
import { getHomeCtaCopy } from '@/lib/i18n/copy/home/cta';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';

export default function CTA() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname ?? '/');
  const copy = getHomeCtaCopy(locale);

  return (
    <section id="descargar" className="cta" data-fade-section lang={locale}>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
        <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>
        <div className="cta-buttons">
          <DownloadLink
            href={appStoreHref()}
            className="store-badge-link"
            trackingPlacement="home_cta_store_badge"
            trackingPage={copy.trackingPage}
            trackingLabel="home_cta_badge"
            aria-label={copy.storeAria}
          >
            <AppStoreBadge locale={locale} />
          </DownloadLink>
          <DownloadLink
            href={googlePlayHref(locale)}
            className="store-badge-link"
            trackingPlacement="home_cta_play_store_badge"
            trackingPage={copy.trackingPage}
            trackingLabel="home_cta_play_badge"
            aria-label={copy.androidStoreAria}
          >
            <GooglePlayBadge locale={locale} />
          </DownloadLink>
          <Link href={copy.privacyHref} className="btn btn-secondary btn-large">
            {copy.privacyLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
