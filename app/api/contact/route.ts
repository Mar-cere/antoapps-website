import { NextResponse } from 'next/server';
import { isGmailConfigured, sendContactEmail } from '@/lib/server/gmail';
import { guardContactPost } from '@/lib/server/request-guard';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  locale?: string;
};

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  const blocked = guardContactPost(request);
  if (blocked) return blocked;

  if (!isGmailConfigured()) {
    console.error(
      '[contact][config] Missing GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN or GMAIL_USER'
    );
    return NextResponse.json(
      { ok: false, error: 'El envío por correo no está configurado en el servidor.' },
      { status: 503 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  const name = cleanText(body.name, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const message = cleanText(body.message, 500);
  const locale = body.locale === 'en' ? 'en' : body.locale === 'pt' ? 'pt' : 'es';
  const invalidName = locale === 'pt' ? 'Nome inválido.' : 'Nombre inválido.';
  const invalidEmail = locale === 'pt' ? 'E-mail inválido.' : 'Correo inválido.';
  const shortMessage = locale === 'pt' ? 'Mensagem curta demais.' : 'Mensaje demasiado corto.';
  const sendFailed =
    locale === 'pt'
      ? 'Não foi possível enviar a mensagem. Tente de novo mais tarde.'
      : 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.';
  const notConfigured =
    locale === 'pt'
      ? 'O envio por e-mail não está configurado no servidor.'
      : 'El envío por correo no está configurado en el servidor.';

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: invalidName }, { status: 422 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: invalidEmail }, { status: 422 });
  }

  if (message.length < 10) {
    return NextResponse.json({ ok: false, error: shortMessage }, { status: 422 });
  }

  try {
    await sendContactEmail({ name, email, message, locale });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'unknown_error';
    console.error('[contact][send]', { code });

    if (code === 'GMAIL_NOT_CONFIGURED') {
      return NextResponse.json({ ok: false, error: notConfigured }, { status: 503 });
    }

    return NextResponse.json({ ok: false, error: sendFailed }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
