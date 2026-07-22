import type { MetadataRoute } from 'next';
import { NON_INDEXABLE_PATH_PREFIXES } from '@/lib/seo/indexable-routes';
import { SITE_HOST, SITE_ORIGIN } from '@/lib/seo/site';

/**
 * Reglas robots.txt — única fuente de verdad.
 *
 * - `*` cubre Googlebot, Bingbot y la mayoría de crawlers genéricos.
 * - Reglas explícitas para crawlers de IA: permiten indexación para búsqueda
 *   generativa (Perplexity, ChatGPT browse, etc.) respetando las mismas
 *   exclusiones de rutas privadas/técnicas.
 */
export function buildRobotsConfig(): MetadataRoute.Robots {
  const sharedDisallow = [...NON_INDEXABLE_PATH_PREFIXES];

  const aiUserAgents = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'Google-Extended',
    'anthropic-ai',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Applebot-Extended',
    'cohere-ai',
    'Meta-ExternalAgent',
    'Bytespider',
    'Amazonbot',
  ] as const;

  const aiRules = aiUserAgents.map((userAgent) => ({
    userAgent,
    allow: '/',
    disallow: sharedDisallow,
  }));

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: sharedDisallow,
      },
      ...aiRules,
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_HOST,
  };
}
