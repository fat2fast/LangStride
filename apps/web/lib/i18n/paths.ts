import { locales, type Locale } from './config';

/**
 * Strips any supported locale prefix from an internal path.
 * Examples:
 *   /en -> ''
 *   /vi/php -> /php
 *   /php -> /php
 */
export function stripLocalePrefix(pathname: string): string {
  for (const loc of locales) {
    if (pathname === `/${loc}`) {
      return '';
    }
    if (pathname.startsWith(`/${loc}/`)) {
      return pathname.slice(loc.length + 1);
    }
  }
  return pathname;
}

/**
 * Ensures an internal path is prefixed with the specified locale.
 * Replaces any existing locale prefix to avoid duplicate prefixes.
 * Disallows external URLs (protocol-relative or absolute HTTP/HTTPS).
 */
export function localizePath(locale: Locale, pathname: string): string {
  if (!pathname.startsWith('/')) {
    throw new Error(`localizePath only accepts internal slash-prefixed paths: received "${pathname}"`);
  }
  if (pathname.startsWith('//')) {
    throw new Error(`External protocol-relative paths are disallowed: received "${pathname}"`);
  }

  // Preserve query and hash if present
  const queryIndex = pathname.indexOf('?');
  const hashIndex = pathname.indexOf('#');
  let splitIndex = -1;

  if (queryIndex !== -1 && hashIndex !== -1) {
    splitIndex = Math.min(queryIndex, hashIndex);
  } else if (queryIndex !== -1) {
    splitIndex = queryIndex;
  } else if (hashIndex !== -1) {
    splitIndex = hashIndex;
  }

  const rawPath = splitIndex === -1 ? pathname : pathname.slice(0, splitIndex);
  const suffix = splitIndex === -1 ? '' : pathname.slice(splitIndex);

  const cleanPath = stripLocalePrefix(rawPath);
  const normalized = cleanPath === '' || cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;

  return `${normalized}${suffix}`;
}

/**
 * Replaces current path's locale prefix with the target locale while preserving
 * path, query, and hash parameters.
 */
export function switchLocalePath(targetLocale: Locale, currentPath: string): string {
  return localizePath(targetLocale, currentPath);
}
