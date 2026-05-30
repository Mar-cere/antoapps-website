'use client';

import { usePathname } from 'next/navigation';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';
import {
  getOrganizationJsonLd,
  getSoftwareApplicationJsonLd,
  getWebSiteJsonLd,
} from '@/lib/i18n/copy/seo/json-ld';

export default function SiteJsonLd() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname ?? '/');

  const blocks = [
    getSoftwareApplicationJsonLd(locale),
    getOrganizationJsonLd(locale),
    getWebSiteJsonLd(locale),
  ];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
