'use client';

import { usePathname } from 'next/navigation';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';
import {
  getOrganizationJsonLd,
  getSoftwareApplicationJsonLd,
} from '@/lib/i18n/copy/seo/json-ld';

export default function SiteJsonLd() {
  const pathname = usePathname() ?? '/';
  const locale = localeFromPathname(pathname);
  const software = getSoftwareApplicationJsonLd(locale);
  const organization = getOrganizationJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
