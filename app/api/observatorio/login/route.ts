import { NextResponse } from 'next/server';
import { consumeLoginAttempt } from '@/lib/observatory/login-limit';
import { OBSERVATORY_HOME } from '@/lib/observatory/routes';
import {
  credentialsMatch,
  createSessionToken,
  getObservatoryAuthConfig,
  observatoryCookieOptions,
} from '@/lib/observatory/session';
import { getClientIp } from '@/lib/server/request-guard';

function loginLocale(value: unknown): 'es' | 'en' | 'pt' {
  return value === 'en' || value === 'pt' ? value : 'es';
}

export async function POST(request: Request) {
  let body: { username?: unknown; password?: unknown; locale?: unknown };
  try {
    body = (await request.json()) as { username?: unknown; password?: unknown; locale?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  const locale = loginLocale(body.locale);
  const copy =
    locale === 'en'
      ? {
          origin: 'Origin not allowed.',
          rate: 'Too many attempts. Wait a moment.',
          config: 'Access is not configured on the server.',
          credentials: 'Invalid credentials.',
        }
      : locale === 'pt'
        ? {
            origin: 'Origem não permitida.',
            rate: 'Tentativas demais. Espere um momento.',
            config: 'O acesso não está configurado no servidor.',
            credentials: 'Credenciais inválidas.',
          }
        : {
            origin: 'Origen no permitido.',
            rate: 'Demasiados intentos. Espera un momento.',
            config: 'El acceso no está configurado en el servidor.',
            credentials: 'Credenciales no válidas.',
          };

  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return NextResponse.json({ ok: false, error: copy.origin }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: copy.origin }, { status: 403 });
    }
  }

  const limit = consumeLoginAttempt(getClientIp(request.headers));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: copy.rate },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } }
    );
  }

  if (!getObservatoryAuthConfig().configured) {
    return NextResponse.json({ ok: false, error: copy.config }, { status: 503 });
  }

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!credentialsMatch(username, password)) {
    return NextResponse.json({ ok: false, error: copy.credentials }, { status: 401 });
  }

  const token = await createSessionToken();
  const cookie = observatoryCookieOptions();
  const response = NextResponse.json({ ok: true, redirect: OBSERVATORY_HOME });
  response.cookies.set(cookie.name, token, cookie);
  return response;
}
