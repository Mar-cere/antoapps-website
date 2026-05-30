'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { getUiCopy, type SharedUiCopy } from '@/lib/i18n/copy/ui';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';

export function useLocaleFromPath(): Locale {
  const pathname = usePathname();
  return localeFromPathname(pathname ?? '/');
}

export function useUiCopy(): SharedUiCopy {
  const locale = useLocaleFromPath();
  return getUiCopy(locale);
}
