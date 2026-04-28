import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/server/mongodb';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AndroidEarlyAccessSubmission = {
  submittedAt: string;
  page: string;
  placement: string;
  source: string;
};

type AndroidEarlyAccessLead = {
  email: string;
  firstSeenAt: string;
  lastSeenAt: string;
  source: string;
  campaign: string;
  submissionCount: number;
  submissions: AndroidEarlyAccessSubmission[];
};

type EarlyAccessPayload = {
  email?: string;
  source?: string;
  placement?: string;
  page?: string;
};

async function notifyNewLead(input: {
  email: string;
  page: string;
  placement: string;
  source: string;
  submittedAt: string;
}) {
  const webhookUrl = process.env.ANDROID_EARLY_ACCESS_WEBHOOK_URL;
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const message = [
    'Nuevo registro Android Early Access',
    `Email: ${input.email}`,
    `Page: ${input.page}`,
    `Placement: ${input.placement}`,
    `Source: ${input.source}`,
    `At: ${input.submittedAt}`,
  ].join('\n');

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'android_early_access_new_lead',
          ...input,
          message,
        }),
      });
    } catch (error) {
      const err = error instanceof Error ? error.message : 'unknown_webhook_error';
      console.error('[android-early-access][notify_webhook_error]', { err });
    }
  }

  if (telegramBotToken && telegramChatId) {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
        }),
      });
    } catch (error) {
      const err = error instanceof Error ? error.message : 'unknown_telegram_error';
      console.error('[android-early-access][notify_telegram_error]', { err });
    }
  }
}

function cleanText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

export async function POST(request: Request) {
  let body: EarlyAccessPayload;
  try {
    body = (await request.json()) as EarlyAccessPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  const email = cleanText(body.email).toLowerCase();
  const source = cleanText(body.source, 'website');
  const placement = cleanText(body.placement, 'unknown');
  const page = cleanText(body.page, '/');

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Correo inválido.' }, { status: 422 });
  }

  const lead = {
    email,
    source,
    placement,
    page,
    submittedAt: new Date().toISOString(),
    campaign: 'android_early_access',
  };

  try {
    const db = await getMongoDb();
    const collection = db.collection<AndroidEarlyAccessLead>('android_early_access_leads');

    await collection.createIndex({ email: 1 }, { unique: true });

    await collection.updateOne(
      { email },
      {
        $setOnInsert: {
          email,
          firstSeenAt: lead.submittedAt,
        },
        $set: {
          lastSeenAt: lead.submittedAt,
          source,
          campaign: lead.campaign,
        },
        $inc: {
          submissionCount: 1,
        },
        $push: {
          submissions: {
            submittedAt: lead.submittedAt,
            page,
            placement,
            source,
          },
        },
      },
      { upsert: true }
    );

    await notifyNewLead({
      email,
      page,
      placement,
      source,
      submittedAt: lead.submittedAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error';
    console.error('[android-early-access][mongo_error]', {
      message,
      placement,
      page,
      source,
    });

    if (message.includes('MONGODB_URI')) {
      return NextResponse.json(
        { ok: false, error: 'Configuración de base de datos incompleta en el servidor.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { ok: false, error: 'No se pudo guardar el correo en la base de datos.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

