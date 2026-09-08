import { NextRequest, NextResponse } from 'next/server';
import { OBSERVATORY_COOKIE } from '@/lib/observatory/routes';
import { isValidSessionToken } from '@/lib/observatory/session';
import { loadObservatoryFeed } from '@/lib/observatory/data/source';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(OBSERVATORY_COOKIE)?.value;
  if (!(await isValidSessionToken(token))) {
    return NextResponse.json({ ok: false, error: 'Sesión requerida.' }, { status: 401 });
  }

  const feed = await loadObservatoryFeed();
  return NextResponse.json({ ok: true, ...feed }, { headers: { 'Cache-Control': 'no-store' } });
}
