'use client';

import { usePathname } from 'next/navigation';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';
import { getFaqPageJsonLd } from '@/lib/i18n/copy/seo/json-ld';

export default function FaqJsonLd() {
  const pathname = usePathname() ?? '/';
  const locale = localeFromPathname(pathname);
  const isHome = pathname === '/' || pathname === '/en';

  if (!isHome) {
    return null;
  }

  const block = getFaqPageJsonLd(locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
    />
  );
}
