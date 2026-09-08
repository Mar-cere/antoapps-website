import { NextResponse } from 'next/server';
import { OBSERVATORY_LOGIN } from '@/lib/observatory/routes';
import { observatoryCookieOptions } from '@/lib/observatory/session';

export async function POST(request: Request) {
  const url = new URL(OBSERVATORY_LOGIN, request.url);
  const response = NextResponse.redirect(url, 303);
  const cookie = observatoryCookieOptions();
  response.cookies.set(cookie.name, '', { ...cookie, maxAge: 0 });
  return response;
}
