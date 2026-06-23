import type { MetadataRoute } from 'next';
import { buildSitemapEntries } from '@/lib/seo/build-sitemap';

/** Regenerar sitemap como máximo cada 24 h (ISR). */
export const revalidate = 86_400;

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
