import { DEFAULT_LOCALE, type LegalLocale, type Locale } from '@/lib/i18n/config';

/** Locale de la ruta. `/pt` y `/pt/` son portugués, no español. */
export function pathLocaleFromPathname(pathname: string): LegalLocale {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }
  if (pathname === '/pt' || pathname === '/pt/' || pathname.startsWith('/pt/')) {
    return 'pt';
  }
  return DEFAULT_LOCALE;
}

/**
 * Locale del sitio (es/en) para el chrome que no tiene copia en portugués.
 * No usar esto para elegir el cuerpo de una página bajo `/pt`.
 */
export function localeFromPathname(pathname: string): Locale {
  const locale = pathLocaleFromPathname(pathname);
  return locale === 'pt' ? DEFAULT_LOCALE : locale;
}

/** Ruta sin prefijo /en ni /pt, para el selector de idioma. */
export function pathWithoutLocale(pathname: string): string {
  if (pathname === '/en' || pathname === '/pt' || pathname === '/pt/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  if (pathname.startsWith('/pt/')) return pathname.slice(3) || '/';
  return pathname || '/';
}
