import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';

/** Locale de la ruta. `/pt` y `/pt/` son portugués de Brasil, no español. */
export function pathLocaleFromPathname(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }
  if (pathname === '/pt' || pathname === '/pt/' || pathname.startsWith('/pt/')) {
    return 'pt';
  }
  return DEFAULT_LOCALE;
}

/** Locale del sitio a partir de la ruta pública. */
export function localeFromPathname(pathname: string): Locale {
  return pathLocaleFromPathname(pathname);
}

/** Ruta sin prefijo /en ni /pt, para el selector de idioma. */
export function pathWithoutLocale(pathname: string): string {
  if (pathname === '/en' || pathname === '/pt' || pathname === '/pt/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  if (pathname.startsWith('/pt/')) return pathname.slice(3) || '/';
  return pathname || '/';
}
