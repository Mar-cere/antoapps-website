import fs from 'node:fs';
import path from 'node:path';
import type { Locale } from '@/lib/i18n/config';
import {
  productScreenSrc,
  type HomeProductScreens,
  type ProductScreenKind,
} from '@/lib/assets/product-screens';

function screenFileExists(locale: Locale, kind: ProductScreenKind): boolean {
  const relative = productScreenSrc(locale, kind).replace(/^\//, '');
  return fs.existsSync(path.join(process.cwd(), 'public', relative));
}

/** Solo desde un Server Component. Si el WebP no está, la figura no se publica. */
export function getHomeProductScreens(locale: Locale): HomeProductScreens {
  return {
    chat: screenFileExists(locale, 'chat'),
    step: screenFileExists(locale, 'step'),
  };
}
