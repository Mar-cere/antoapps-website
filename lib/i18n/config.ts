export type Locale = 'es' | 'en';

export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALES: Locale[] = ['es', 'en'];

export function isLocale(value: string): value is Locale {
  return value === 'es' || value === 'en';
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) {
    return normalized;
  }
  return normalized === '/' ? '/en' : `/en${normalized}`;
}
