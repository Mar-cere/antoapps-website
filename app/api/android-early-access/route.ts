import { NextResponse } from 'next/server';
import { notifyAndroidLead } from '@/lib/android-early-access/notify-lead';
import { parseEarlyAccessPayload, type EarlyAccessPayload } from '@/lib/android-early-access/parse-payload';
import { getMongoDb } from '@/lib/server/mongodb';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AndroidEarlyAccessSubmission = {
  submittedAt: string;
  page: string;
  pageUrl?: string;
  placement: string;
  source: string;
  locale: string;
  landingVariant?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

type AndroidEarlyAccessLead = {
  email: string;
  firstSeenAt: string;
  lastSeenAt: string;
  source: string;
  campaign: string;
  locale?: string;
  submissionCount: number;
  submissions: AndroidEarlyAccessSubmission[];
};

export async function POST(request: Request) {
  let body: EarlyAccessPayload;
  try {
    body = (await request.json()) as EarlyAccessPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const parsed = parseEarlyAccessPayload(body, submittedAt);

  if (!parsed || !EMAIL_RE.test(parsed.email)) {
    return NextResponse.json({ ok: false, error: 'Correo inválido.' }, { status: 422 });
  }

  const lead = {
    ...parsed,
    campaign: 'android_early_access',
  };

  try {
    const db = await getMongoDb();
    const collection = db.collection<AndroidEarlyAccessLead>('android_early_access_leads');

    await collection.createIndex({ email: 1 }, { unique: true });

    await collection.updateOne(
      { email: lead.email },
      {
        $setOnInsert: {
          email: lead.email,
          firstSeenAt: lead.submittedAt,
        },
        $set: {
          lastSeenAt: lead.submittedAt,
          source: lead.source,
          campaign: lead.campaign,
          locale: lead.locale,
        },
        $inc: {
          submissionCount: 1,
        },
        $push: {
          submissions: {
            submittedAt: lead.submittedAt,
            page: lead.page,
            pageUrl: lead.pageUrl,
            placement: lead.placement,
            source: lead.source,
            locale: lead.locale,
            landingVariant: lead.landingVariant,
            utmSource: lead.utmSource,
            utmMedium: lead.utmMedium,
            utmCampaign: lead.utmCampaign,
          },
        },
      },
      { upsert: true }
    );

    await notifyAndroidLead(lead);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error';
    console.error('[android-early-access][mongo_error]', {
      message,
      placement: lead.placement,
      page: lead.page,
      pageUrl: lead.pageUrl,
      locale: lead.locale,
      landingVariant: lead.landingVariant,
      source: lead.source,
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
