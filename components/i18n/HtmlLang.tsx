'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { htmlLanguage } from '@/lib/i18n/config';
import { pathLocaleFromPathname } from '@/lib/i18n/path-from-pathname';

export default function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = htmlLanguage(pathLocaleFromPathname(pathname ?? ''));
  }, [pathname]);

  return null;
}
