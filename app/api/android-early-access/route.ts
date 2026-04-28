import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/server/mongodb';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EarlyAccessPayload = {
  email?: string;
  source?: string;
  placement?: string;
  page?: string;
};

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
    const collection = db.collection('android_early_access_leads');

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
  } catch {
    return NextResponse.json(
      { ok: false, error: 'No se pudo guardar el correo en la base de datos.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

