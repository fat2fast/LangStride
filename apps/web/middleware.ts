import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isLocale, type Locale } from './lib/i18n/config';
import { localizePath } from './lib/i18n/paths';

function negotiateLocale(request: NextRequest): Locale {
  // 1. Check user preference cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // If Vietnamese is preferred
    const languages = acceptLanguage.split(',').map((part) => part.split(';')[0].trim().toLowerCase());
    for (const lang of languages) {
      if (lang === 'vi' || lang.startsWith('vi-')) {
        return 'vi';
      }
      if (lang === 'en' || lang.startsWith('en-')) {
        return 'en';
      }
    }
  }

  // 3. Fallback to default
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static assets and files with extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // Case 1: Path already starts with a valid locale (e.g. /en, /vi/php)
  if (firstSegment && isLocale(firstSegment)) {
    const response = NextResponse.next();
    response.headers.set('x-locale', firstSegment);
    return response;
  }

  // Case 2: Legacy unprefixed app routes (e.g. /, /php, /php/concepts/...)
  if (!firstSegment || firstSegment === 'php') {
    const targetLocale = negotiateLocale(request);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizePath(targetLocale, pathname);
    return NextResponse.redirect(redirectUrl, 307);
  }

  // Case 3: Unsupported locale prefix or invalid route -> return 404
  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
