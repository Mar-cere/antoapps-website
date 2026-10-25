export type Locale = 'es' | 'en' | 'pt';

/** El sitio completo vive en es, en y pt. `pt` es portugués de Brasil en la URL corta. */
export type LegalLocale = Locale;

export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALES: Locale[] = ['es', 'en', 'pt'];

export function isLocale(value: string): value is Locale {
  return value === 'es' || value === 'en' || value === 'pt';
}

export function isLegalLocale(value: string): value is LegalLocale {
  return isLocale(value);
}

export function htmlLanguage(locale: Locale): 'es' | 'en' | 'pt-BR' {
  if (locale === 'en') return 'en';
  if (locale === 'pt') return 'pt-BR';
  return 'es';
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) {
    return normalized;
  }
  const prefix = locale === 'pt' ? '/pt' : '/en';
  return normalized === '/' ? prefix : `${prefix}${normalized}`;
}
