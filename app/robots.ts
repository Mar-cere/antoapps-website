import type { MetadataRoute } from 'next';
import { buildRobotsConfig } from '@/lib/seo/robots-config';

/** Regenerar robots.txt como máximo cada 24 h (ISR). */
export const revalidate = 86_400;

export default function robots(): MetadataRoute.Robots {
  return buildRobotsConfig();
}
