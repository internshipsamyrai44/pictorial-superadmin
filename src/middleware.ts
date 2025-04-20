import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PATH } from '@/shared/consts/PATH';

export function middleware(request: NextRequest) {
  const publicPaths = [PATH.AUTH];
  const { pathname } = request.nextUrl;

  if (publicPaths.some((path) => pathname.startsWith(`/${path}`))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|login).*)']
};
