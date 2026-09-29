import type { Locale } from '@/lib/i18n/config';

export type ProductScreenKind = 'chat' | 'step';

export type HomeProductScreens = {
  chat: boolean;
  step: boolean;
};

/** Ruta pública. El archivo vive en public/assets/images/product/. */
export function productScreenSrc(locale: Locale, kind: ProductScreenKind): string {
  return `/assets/images/product/anto-now-${kind}-${locale}.webp`;
}
