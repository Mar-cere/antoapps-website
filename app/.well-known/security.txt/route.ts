import { SITE_ORIGIN } from '@/lib/seo/site';

export const revalidate = 86_400;

export function GET(): Response {
  const body = [
    'Contact: mailto:marcelo.ull@antoapps.com',
    `Canonical: ${SITE_ORIGIN}/.well-known/security.txt`,
    'Preferred-Languages: es, en',
    'Expires: 2027-08-25T00:00:00.000Z',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
