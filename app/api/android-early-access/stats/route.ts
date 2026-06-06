import { NextResponse } from 'next/server';
import { resolveWaitlistDisplayCount } from '@/lib/android-waitlist-display';
import { getMongoDb } from '@/lib/server/mongodb';

export async function GET() {
  try {
    const db = await getMongoDb();
    const actualCount = await db.collection('android_early_access_leads').countDocuments();
    const displayCount = resolveWaitlistDisplayCount(actualCount);

    return NextResponse.json(
      { ok: true, count: displayCount },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error';
    console.error('[android-early-access][stats_error]', { message });

    return NextResponse.json(
      { ok: false, count: resolveWaitlistDisplayCount(0) },
      { status: 200 }
    );
  }
}
