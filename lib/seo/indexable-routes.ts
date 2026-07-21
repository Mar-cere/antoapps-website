import type { MetadataRoute } from 'next';

/**
 * Rutas públicas indexables del sitio (App Router).
 *
 * Cada entrada define el path lógico (sin prefijo /en) y metadatos SEO
 * independientes por idioma. Rutas excluidas explícitamente:
 * - /404 (página de error)
 * - /zt9kq7m2v8n4xpw6rb3yjh1cw5df8a (validador opaco, noindex)
 * - /open (puente HTTPS deep link correos, noindex)
 * - Redirects temporales: /l, /en/l, /welcome, /login, /signup, /chat
 */
export type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]['changeFrequency']
>;

export type IndexableRoute = {
  /** Path lógico compartido (es: `/contacto`, en: `/en/contacto`). Raíz = `''`. */
  path: string;
  /** Frecuencia de cambio esperada para crawlers. */
  changeFrequency: SitemapChangeFrequency;
  /** Prioridad relativa en español (locale por defecto / x-default). */
  priorityEs: number;
  /** Prioridad relativa en inglés. */
  priorityEn: number;
  /**
   * Última modificación de contenido significativa (ISO 8601, solo fecha).
   * Actualizar cuando el copy o la estructura de la página cambien.
   */
  lastModified: string;
  /** Nota interna — no se exporta al sitemap. */
  note?: string;
};

export const INDEXABLE_ROUTES: readonly IndexableRoute[] = [
  {
    path: '',
    changeFrequency: 'daily',
    priorityEs: 1,
    priorityEn: 0.9,
    lastModified: '2026-07-14',
    note: 'Home — máxima prioridad, contenido principal del producto',
  },
  {
    path: '/bienvenida',
    changeFrequency: 'weekly',
    priorityEs: 0.95,
    priorityEn: 0.85,
    lastModified: '2026-06-01',
    note: 'Landing de conversión (Meta Ads, /l redirect)',
  },
  {
    path: '/app',
    changeFrequency: 'weekly',
    priorityEs: 0.9,
    priorityEn: 0.8,
    lastModified: '2026-07-21',
    note: 'Página de producto / descarga',
  },
  {
    path: '/comparar',
    changeFrequency: 'monthly',
    priorityEs: 0.85,
    priorityEn: 0.75,
    lastModified: '2026-05-01',
    note: 'Comparativa vs alternativas — alto valor SEO long-tail',
  },
  {
    path: '/seguridad',
    changeFrequency: 'monthly',
    priorityEs: 0.85,
    priorityEn: 0.75,
    lastModified: '2026-05-01',
    note: 'E-E-A-T: privacidad, cifrado, disclaimers clínicos',
  },
  {
    path: '/investigacion',
    changeFrequency: 'monthly',
    priorityEs: 0.85,
    priorityEn: 0.75,
    lastModified: '2026-05-01',
    note: 'E-E-A-T: base científica y referencias',
  },
  {
    path: '/recursos',
    changeFrequency: 'weekly',
    priorityEs: 0.8,
    priorityEn: 0.7,
    lastModified: '2026-07-14',
    note: 'Biblioteca de recursos — psicoeducación y guías del sitio',
  },
  {
    path: '/changelog',
    changeFrequency: 'weekly',
    priorityEs: 0.7,
    priorityEn: 0.6,
    lastModified: '2026-06-01',
    note: 'Señal de frescura para crawlers',
  },
  {
    path: '/sobre-nosotros',
    changeFrequency: 'monthly',
    priorityEs: 0.75,
    priorityEn: 0.65,
    lastModified: '2026-04-01',
    note: 'About / equipo',
  },
  {
    path: '/contacto',
    changeFrequency: 'monthly',
    priorityEs: 0.75,
    priorityEn: 0.65,
    lastModified: '2026-04-01',
    note: 'Contacto y soporte',
  },
  {
    path: '/desarrollo',
    changeFrequency: 'monthly',
    priorityEs: 0.65,
    priorityEn: 0.55,
    lastModified: '2026-04-01',
    note: 'Roadmap / estado del producto',
  },
  {
    path: '/privacidad',
    changeFrequency: 'monthly',
    priorityEs: 0.6,
    priorityEn: 0.5,
    lastModified: '2026-03-01',
    note: 'Legal — baja prioridad relativa, alta importancia de confianza',
  },
  {
    path: '/terminos',
    changeFrequency: 'monthly',
    priorityEs: 0.6,
    priorityEn: 0.5,
    lastModified: '2026-03-01',
    note: 'Legal — términos de servicio',
  },
] as const;

/** Paths lógicos indexables (sin prefijo /en), derivados de la config. */
export const INDEXABLE_LOGICAL_PATHS = INDEXABLE_ROUTES.map((r) => r.path);

/**
 * Rutas que nunca deben aparecer en el sitemap ni ser rastreadas.
 * Mantener sincronizado con app/robots.ts (disallow) y metadata noindex.
 */
export const NON_INDEXABLE_PATH_PREFIXES = [
  '/api/',
  '/_next/',
  '/404',
  '/zt9kq7m2v8n4xpw6rb3yjh1cw5df8a',
  '/home-v2',
  '/open',
] as const;

/** Redirects cortos — no indexables, no deben estar en sitemap. */
export const REDIRECT_ONLY_PATHS = [
  '/l',
  '/en/l',
  '/welcome',
  '/login',
  '/signup',
  '/chat',
] as const;
