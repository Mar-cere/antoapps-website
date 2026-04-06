/**
 * Enlaces a tiendas. Si no hay URL pública, se usa ancla interna (#descargar).
 */
export const FALLBACK_DOWNLOAD_HREF = '/#descargar';

export function appStoreHref(): string {
  const u = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();
  return u && u.length > 0 ? u : FALLBACK_DOWNLOAD_HREF;
}

export function googlePlayHref(): string {
  const u = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim();
  return u && u.length > 0 ? u : FALLBACK_DOWNLOAD_HREF;
}

export function isExternalStoreUrl(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}
