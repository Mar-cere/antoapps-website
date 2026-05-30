import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';

export function localeFromPathname(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }
  return DEFAULT_LOCALE;
}

/** Ruta sin prefijo /en, para el selector de idioma. */
export function pathWithoutLocale(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname || '/';
}
