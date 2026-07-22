import { buildLlmsFullTxt } from '@/lib/seo/build-llms-txt';

/** Regenerar llms-full.txt como máximo cada 24 h (ISR). */
export const revalidate = 86_400;

export function GET(): Response {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
