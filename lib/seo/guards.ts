/**
 * Archivos estáticos prohibidos: Next.js genera sitemap.xml y robots.txt
 * desde app/sitemap.ts y app/robots.ts. Copias en public/ o la raíz del repo
 * pueden pisar el output dinámico en Vercel.
 */
export const FORBIDDEN_STATIC_SEO_FILENAMES = [
  'sitemap.xml',
  'robots.txt',
  'sitemap_index.xml',
] as const;

export const FORBIDDEN_STATIC_SEO_RELATIVE_PATHS = [
  'public/sitemap.xml',
  'public/robots.txt',
  'public/sitemap_index.xml',
  'sitemap.xml',
  'robots.txt',
  'sitemap_index.xml',
] as const;
