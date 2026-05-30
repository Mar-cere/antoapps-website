'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';

export default function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = localeFromPathname(pathname ?? '') === 'en' ? 'en' : 'es';
  }, [pathname]);

  return null;
}
