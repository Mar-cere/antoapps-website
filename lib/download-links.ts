/**
 * Enlaces a tiendas. Google Play puede seguir en “próximamente” en UI;
 * App Store usa la ficha pública por defecto si no defines env.
 */
import type { Locale } from '@/lib/i18n/config';
export const FALLBACK_DOWNLOAD_HREF = '/bienvenida';

/** Ficha oficial en App Store (Chile). Sobreescribible con NEXT_PUBLIC_APP_STORE_URL. */
export const DEFAULT_APP_STORE_URL = 'https://apps.apple.com/cl/app/anto/id6756631911';

/** Badge oficial Apple (ES, negro) — Marketing / App Store Connect. */
export const APP_STORE_BADGE_ES_PATH = '/assets/badges/download-on-the-app-store-es.svg';
/** Badge oficial Apple (EN, negro) — US-UK RGB. */
export const APP_STORE_BADGE_EN_PATH = '/assets/badges/download-on-the-app-store-en.png';
/** @deprecated Use appStoreBadgePath(locale) */
export const APP_STORE_BADGE_SVG_PATH = APP_STORE_BADGE_ES_PATH;
export const GOOGLE_PLAY_BADGE_SVG_PATH = '/assets/badges/get-it-on-google-play-es.svg';

export function appStoreHref(): string {
  const u = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();
  return u && u.length > 0 ? u : DEFAULT_APP_STORE_URL;
}

export function googlePlayHref(): string {
  const u = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim();
  return u && u.length > 0 ? u : FALLBACK_DOWNLOAD_HREF;
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

/** Badge App Store según idioma (ES: SVG, EN: PNG oficial Apple). */
export function appStoreBadgePath(locale: Locale = 'es'): string {
  return locale === 'en' ? APP_STORE_BADGE_EN_PATH : APP_STORE_BADGE_ES_PATH;
}
