import { NextResponse } from 'next/server';

export const CONTACT_ALLOWED_ORIGINS = [
  'https://antoapps.com',
  'https://www.antoapps.com',
] as const;

export const CONTACT_RATE_LIMIT = {
  windowMs: 60_000,
  maxRequests: 5,
} as const;

const hitsByIp = new Map<string, number[]>();

export function isAllowedOrigin(originHeader: string | null | undefined): boolean {
  if (!originHeader) return false;

  try {
    const parsed = new URL(originHeader);
    if (parsed.username || parsed.password) return false;
    if (parsed.protocol !== 'https:') return false;
    return (CONTACT_ALLOWED_ORIGINS as readonly string[]).includes(parsed.origin);
  } catch {
    return false;
  }
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (!forwarded) return 'unknown';

  const first = forwarded.split(',')[0]?.trim();
  return first || 'unknown';
}

export function resetContactRateLimit(): void {
  hitsByIp.clear();
}

export function consumeContactRateLimit(
  ip: string,
  now = Date.now()
): { allowed: boolean; retryAfterSec: number } {
  const { windowMs, maxRequests } = CONTACT_RATE_LIMIT;
  const cutoff = now - windowMs;
  const recent = (hitsByIp.get(ip) ?? []).filter((stamp) => stamp > cutoff);

  if (recent.length >= maxRequests) {
    hitsByIp.set(ip, recent);
    const retryAfterMs = recent[0]! + windowMs - now;
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }

  recent.push(now);
  hitsByIp.set(ip, recent);
  return { allowed: true, retryAfterSec: 0 };
}

export function guardContactPost(request: Request): NextResponse | null {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return NextResponse.json({ ok: false, error: 'Origen no permitido.' }, { status: 403 });
  }

  const limit = consumeContactRateLimit(getClientIp(request.headers));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSec) },
      }
    );
  }

  return null;
}
