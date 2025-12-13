import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {locales} from './i18n/request';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {
  // Skip middleware for /buying, /selling, and /guide routes
  if (request.nextUrl.pathname.startsWith('/buying') || 
      request.nextUrl.pathname.startsWith('/selling') ||
      request.nextUrl.pathname.startsWith('/guide')) {
    return NextResponse.next();
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(de|es)/:path*', '/((?!api|_next|_vercel|admin|.*\\..*).*)']
};
