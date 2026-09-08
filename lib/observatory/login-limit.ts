const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const hitsByIp = new Map<string, number[]>();

export function consumeLoginAttempt(ip: string, now = Date.now()): { allowed: boolean; retryAfterSec: number } {
  const cutoff = now - WINDOW_MS;
  const recent = (hitsByIp.get(ip) ?? []).filter((stamp) => stamp > cutoff);
  if (recent.length >= MAX_ATTEMPTS) {
    hitsByIp.set(ip, recent);
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((recent[0]! + WINDOW_MS - now) / 1000)) };
  }
  recent.push(now);
  hitsByIp.set(ip, recent);
  return { allowed: true, retryAfterSec: 0 };
}
