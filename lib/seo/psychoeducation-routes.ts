import type { IndexableRoute } from '@/lib/seo/indexable-routes';
import { PSYCHOEDUCATION_SLUGS } from '@/lib/i18n/copy/pages/psychoeducation';

/** Rutas indexables de guías de psicoeducación bajo /recursos/[slug]. */
export const PSYCHOEDUCATION_INDEXABLE_ROUTES: readonly IndexableRoute[] = PSYCHOEDUCATION_SLUGS.map(
  (slug) => ({
    path: `/recursos/${slug}`,
    changeFrequency: 'monthly' as const,
    priorityEs: 0.78,
    priorityEn: 0.68,
    lastModified: '2026-07-24',
    note: `Psicoeducación — ${slug}`,
  })
);

/** Segmento dinámico en app router → paths lógicos expandidos. */
export const DYNAMIC_ROUTE_EXPANSIONS: Readonly<Record<string, readonly string[]>> = {
  '/recursos/[slug]': PSYCHOEDUCATION_SLUGS.map((slug) => `/recursos/${slug}`),
};
