'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DownloadLink from '@/components/DownloadLink';
import AppStoreBadge from '@/components/AppStoreBadge';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import { appStoreHref } from '@/lib/download-links';
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
          <Link href={copy.privacyHref} className="btn btn-secondary btn-large">
            {copy.privacyLabel}
          </Link>
        </div>
        <div className="section-cta-row section-cta-row--flex">
          <AndroidEarlyAccessForm
            locale={locale}
            id="android-early-access-cta"
            placement="home_cta_android_early_access"
            page={copy.trackingPage}
            compact
            buttonLabel={copy.androidCta}
          />
        </div>
      </div>
    </section>
  );
}
