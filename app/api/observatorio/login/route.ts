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

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return NextResponse.json({ ok: false, error: 'Origen no permitido.' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: 'Origen no permitido.' }, { status: 403 });
    }
  }

  const limit = consumeLoginAttempt(getClientIp(request.headers));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Demasiados intentos. Espera un momento.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } }
    );
  }

  if (!getObservatoryAuthConfig().configured) {
    return NextResponse.json(
      { ok: false, error: 'El acceso no está configurado en el servidor.' },
      { status: 503 }
    );
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = (await request.json()) as { username?: unknown; password?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!credentialsMatch(username, password)) {
    return NextResponse.json({ ok: false, error: 'Credenciales no válidas.' }, { status: 401 });
  }

  const token = await createSessionToken();
  const cookie = observatoryCookieOptions();
  const response = NextResponse.json({ ok: true, redirect: OBSERVATORY_HOME });
  response.cookies.set(cookie.name, token, cookie);
  return response;
}
