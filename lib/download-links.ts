/**
 * Enlaces a tiendas (App Store y Google Play).
 */
import type { Locale } from '@/lib/i18n/config';
export const FALLBACK_DOWNLOAD_HREF = '/bienvenida';

/** Ficha oficial en App Store (Chile). Sobreescribible con NEXT_PUBLIC_APP_STORE_URL. */
export const DEFAULT_APP_STORE_URL = 'https://apps.apple.com/cl/app/anto/id6756631911';

/** Ficha oficial en Google Play (ES LatAm). Sobreescribible con NEXT_PUBLIC_GOOGLE_PLAY_URL. */
export const DEFAULT_GOOGLE_PLAY_URL_ES =
  'https://play.google.com/store/apps/details?id=com.anto.app&hl=es_419';
/** Ficha oficial en Google Play (EN US). */
export const DEFAULT_GOOGLE_PLAY_URL_EN =
  'https://play.google.com/store/apps/details?id=com.anto.app&hl=en_us';
/** @deprecated Prefer DEFAULT_GOOGLE_PLAY_URL_ES / _EN según locale. */
export const DEFAULT_GOOGLE_PLAY_URL = DEFAULT_GOOGLE_PLAY_URL_ES;

/** Badge oficial Apple (ES, negro) — Marketing / App Store Connect. */
export const APP_STORE_BADGE_ES_PATH = '/assets/badges/download-on-the-app-store-es.svg';
/** Badge oficial Apple (EN, negro) — US-UK RGB. */
export const APP_STORE_BADGE_EN_PATH = '/assets/badges/download-on-the-app-store-en.png';
/** @deprecated Use appStoreBadgePath(locale) */
export const APP_STORE_BADGE_SVG_PATH = APP_STORE_BADGE_ES_PATH;
export const GOOGLE_PLAY_BADGE_ES_PATH = '/assets/badges/get-it-on-google-play-es.svg';
export const GOOGLE_PLAY_BADGE_EN_PATH = '/assets/badges/get-it-on-google-play-en.svg';
/** @deprecated Use googlePlayBadgePath(locale) */
export const GOOGLE_PLAY_BADGE_SVG_PATH = GOOGLE_PLAY_BADGE_ES_PATH;

export function appStoreHref(): string {
  const u = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();
  return u && u.length > 0 ? u : DEFAULT_APP_STORE_URL;
}

export function googlePlayHref(locale: Locale = 'es'): string {
  const u = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim();
  if (u && u.length > 0) return u;
  return locale === 'en' ? DEFAULT_GOOGLE_PLAY_URL_EN : DEFAULT_GOOGLE_PLAY_URL_ES;
}

export function isExternalStoreUrl(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function isAppStoreUrl(href: string): boolean {
  if (!isExternalStoreUrl(href)) return false;
  try {
    const host = new URL(href).hostname.toLowerCase();
    return host === 'apps.apple.com' || host === 'itunes.apple.com';
  } catch {
    return false;
  }
}

export function isGooglePlayUrl(href: string): boolean {
  if (!isExternalStoreUrl(href)) return false;
  try {
    const host = new URL(href).hostname.toLowerCase();
    return host === 'play.google.com';
  } catch {
    return false;
  }
}

/**
 * Convierte una URL https de App Store a esquema itms-apps://.
 * En navegadores in-app de iOS (Instagram/Facebook), abre la app App Store
 * en lugar de quedar atrapado en un WebView con target=_blank.
 * Si la URL no es App Store, devuelve el href original.
 */
export function appStoreNativeHref(href: string): string {
  if (!isAppStoreUrl(href)) return href;
  try {
    const url = new URL(href);
    return `itms-apps://${url.host}${url.pathname}${url.search}`;
  } catch {
    return href;
  }
}

/** Badge App Store según idioma (ES: SVG, EN: PNG oficial Apple). */
export function appStoreBadgePath(locale: Locale = 'es'): string {
  return locale === 'en' ? APP_STORE_BADGE_EN_PATH : APP_STORE_BADGE_ES_PATH;
}

/** Badge Google Play según idioma. */
export function googlePlayBadgePath(locale: Locale = 'es'): string {
  return locale === 'en' ? GOOGLE_PLAY_BADGE_EN_PATH : GOOGLE_PLAY_BADGE_ES_PATH;
}
