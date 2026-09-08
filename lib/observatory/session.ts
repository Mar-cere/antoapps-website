import { OBSERVATORY_COOKIE } from '@/lib/observatory/routes';

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export type ObservatoryAuthConfig = {
  username: string;
  password: string;
  secret: string;
  configured: boolean;
};

export function getObservatoryAuthConfig(): ObservatoryAuthConfig {
  const username = process.env.OBSERVATORY_USERNAME ?? '';
  const password = process.env.OBSERVATORY_PASSWORD ?? '';
  const secret = process.env.OBSERVATORY_SESSION_SECRET ?? '';
  return {
    username,
    password,
    secret,
    configured: Boolean(username && password && secret),
  };
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 1) {
    bin += String.fromCharCode(bytes[i]!);
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(value: string): Uint8Array {
  const pad = value.length % 4 === 0 ? '' : '='.repeat(4 - (value.length % 4));
  const bin = atob(value.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

function timingSafeEqual(a: string, b: string): boolean {
  const aa = encoder.encode(a);
  const bb = encoder.encode(b);
  const n = Math.max(aa.length, bb.length);
  let diff = aa.length ^ bb.length;
  for (let i = 0; i < n; i += 1) {
    diff |= (aa[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

async function hmac(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return bytesToBase64Url(new Uint8Array(sig));
}

export function credentialsMatch(username: string, password: string): boolean {
  const cfg = getObservatoryAuthConfig();
  if (!cfg.configured) return false;
  const givenUser = username.trim().toLowerCase();
  const expectedUser = cfg.username.trim().toLowerCase();
  return timingSafeEqual(givenUser, expectedUser) && timingSafeEqual(password, cfg.password);
}

export async function createSessionToken(): Promise<string> {
  const cfg = getObservatoryAuthConfig();
  const payload = bytesToBase64Url(encoder.encode(JSON.stringify({ v: 1, exp: Date.now() + SESSION_MS })));
  const sig = await hmac(cfg.secret, payload);
  return `${payload}.${sig}`;
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !token.includes('.')) return false;
  const cfg = getObservatoryAuthConfig();
  if (!cfg.configured) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = await hmac(cfg.secret, payload);
  if (!timingSafeEqual(sig, expected)) return false;
  try {
    const json = JSON.parse(decoder.decode(base64UrlToBytes(payload))) as { exp?: number };
    return typeof json.exp === 'number' && json.exp > Date.now();
  } catch {
    return false;
  }
}

export function observatoryCookieOptions() {
  return {
    name: OBSERVATORY_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MS / 1000,
  };
}
