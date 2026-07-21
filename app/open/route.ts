import { OPEN_APP_BRIDGE_HTML } from '@/lib/open-app/bridge-html';

/**
 * Puente HTTPS «Abrir Anto» para correos.
 * Query client-side: ?to=weekly-summary → anto:///weekly-summary; vacío/app → anto://
 */
export function GET() {
  return new Response(OPEN_APP_BRIDGE_HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  });
}
