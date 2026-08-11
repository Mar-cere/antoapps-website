'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import { getHomeCtaCopy } from '@/lib/i18n/copy/home/cta';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';

export default function CTA() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname ?? '/');
  const copy = getHomeCtaCopy(locale);
  const hero = getHomeV2Copy(locale).hero;

  return (
    <section id="descargar" className="cta" data-fade-section lang={locale}>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
        <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>
        <div className="cta-buttons cta-buttons--stores">
          <PremiumStoreCtaPair
            locale={locale}
            copy={hero}
            trackingPage={copy.trackingPage}
            trackingPlacementPrefix="home_cta"
            trackingLabel="home_cta"
          />
          <Link href={copy.privacyHref} className="btn btn-secondary btn-large">
            {copy.privacyLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
