export type Locale = 'es' | 'en';

/** `pt` cubre solo las páginas legales. No hay sitio en portugués. */
export type LegalLocale = Locale | 'pt';

export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALES: Locale[] = ['es', 'en'];

/** Rutas lógicas con versión en portugués de Brasil. Sin home. */
export const PT_LEGAL_PATHS = ['/privacidad', '/terminos'] as const;

export function isLocale(value: string): value is Locale {
  return value === 'es' || value === 'en';
}

export function isLegalLocale(value: string): value is LegalLocale {
  return value === 'es' || value === 'en' || value === 'pt';
}

export function hasPortugueseLegalPage(path: string): boolean {
  return (PT_LEGAL_PATHS as readonly string[]).includes(path);
}

export function htmlLanguage(locale: LegalLocale): 'es' | 'en' | 'pt-BR' {
  if (locale === 'en') return 'en';
  if (locale === 'pt') return 'pt-BR';
  return 'es';
}

export function localePath(locale: LegalLocale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) {
    return normalized;
  }
  const prefix = locale === 'pt' ? '/pt' : '/en';
  return normalized === '/' ? prefix : `${prefix}${normalized}`;
}
