import { buildLlmsTxt } from '@/lib/seo/build-llms-txt';

/** Regenerar llms.txt como máximo cada 24 h (ISR). */
export const revalidate = 86_400;

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
