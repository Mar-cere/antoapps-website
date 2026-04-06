/**
 * Enlaces a tiendas. Google Play puede seguir en “próximamente” en UI;
 * App Store usa la ficha pública por defecto si no defines env.
 */
export const FALLBACK_DOWNLOAD_HREF = '/#descargar';

/** Ficha oficial en App Store (Chile). Sobreescribible con NEXT_PUBLIC_APP_STORE_URL. */
export const DEFAULT_APP_STORE_URL = 'https://apps.apple.com/cl/app/anto/id6756631911';

/** Badge oficial Apple (ES, negro) — Marketing / App Store Connect. */
export const APP_STORE_BADGE_SVG_PATH = '/assets/badges/download-on-the-app-store-es.svg';

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
