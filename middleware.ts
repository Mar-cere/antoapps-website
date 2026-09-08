import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  OBSERVATORY_COOKIE,
  OBSERVATORY_HOME,
  OBSERVATORY_LOGIN,
  isObservatoryPath,
  safeObservatoryNext,
} from '@/lib/observatory/routes';
import { isValidSessionToken } from '@/lib/observatory/session';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
  const response = NextResponse.next();
  response.headers.set('x-locale', locale);

  const token = request.cookies.get(OBSERVATORY_COOKIE)?.value;
  const signedIn = await isValidSessionToken(token);

  if (isObservatoryPath(pathname) && !signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = OBSERVATORY_LOGIN;
    url.search = '';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === OBSERVATORY_LOGIN && signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = safeObservatoryNext(request.nextUrl.searchParams.get('next'));
    url.search = '';
    return NextResponse.redirect(url);
  }

  if (pathname === OBSERVATORY_HOME || pathname.startsWith(`${OBSERVATORY_HOME}/`)) {
    response.headers.set('x-robots-tag', 'noindex, nofollow');
  }

  if (pathname === OBSERVATORY_LOGIN) {
    response.headers.set('x-robots-tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/).*)'],
};
