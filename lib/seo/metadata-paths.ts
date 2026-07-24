/**
 * Paths canónicos declarados en funciones *PageMetadata del copy i18n.
 * Debe coincidir con INDEXABLE_LOGICAL_PATHS — validado en sitemap-invariants.
 */
export const METADATA_CANONICAL_PATHS: readonly string[] = [
  '',
  '/bienvenida',
  '/app',
  '/seguridad',
  '/investigacion',
  '/recursos',
  '/changelog',
  '/sobre-nosotros',
  '/contacto',
  '/desarrollo',
  '/privacidad',
  '/terminos',
] as const;
