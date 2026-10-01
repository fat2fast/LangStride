import { describe, it, expect } from 'vitest';
import {
  locales,
  defaultLocale,
  isLocale,
  getMessages,
  localizePath,
  switchLocalePath,
  stripLocalePrefix,
  type Locale,
} from '../lib/i18n';
import { en } from '../lib/i18n/messages/en';
import { vi } from '../lib/i18n/messages/vi';

describe('i18n Primitives & Path Helpers (Task 2.1)', () => {
  it('defines supported locales and default locale', () => {
    expect(locales).toEqual(['en', 'vi']);
    expect(defaultLocale).toBe('en');
  });

  it('validates locale with type guard isLocale', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('vi')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('php')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it('provides matching keys in both English and Vietnamese catalogues', () => {
    function getDeepKeys(obj: Record<string, any>, prefix = ''): string[] {
      return Object.keys(obj).flatMap((key) => {
        const val = obj[key];
        const nextPrefix = prefix ? `${prefix}.${key}` : key;
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          return getDeepKeys(val, nextPrefix);
        }
        return nextPrefix;
      });
    }

    const enKeys = getDeepKeys(en).sort();
    const viKeys = getDeepKeys(vi).sort();

    expect(enKeys).toEqual(viKeys);
    expect(enKeys.length).toBeGreaterThan(30);

    for (const locale of locales) {
      const msgs = getMessages(locale);
      expect(msgs).toBeDefined();
      expect(msgs.shell.brandName).toBe('LangStride');
    }
  });

  it('correctly localizes paths without duplicate prefixes', () => {
    expect(localizePath('en', '/')).toBe('/en');
    expect(localizePath('vi', '/')).toBe('/vi');
    expect(localizePath('en', '/php')).toBe('/en/php');
    expect(localizePath('vi', '/php')).toBe('/vi/php');
    expect(localizePath('vi', '/en/php')).toBe('/vi/php');
    expect(localizePath('en', '/vi/php/concepts/variables-and-types')).toBe('/en/php/concepts/variables-and-types');
    expect(localizePath('vi', '/php/concepts/functions?tab=overview#code')).toBe('/vi/php/concepts/functions?tab=overview#code');
  });

  it('rejects external or un-slashed paths in localizePath', () => {
    expect(() => localizePath('en', 'https://example.com')).toThrow();
    expect(() => localizePath('en', '//example.com')).toThrow();
    expect(() => localizePath('en', 'relative/path')).toThrow();
  });

  it('correctly switches locale retaining slug, query, and hash', () => {
    expect(switchLocalePath('vi', '/en/php/concepts/variables-and-types')).toBe('/vi/php/concepts/variables-and-types');
    expect(switchLocalePath('en', '/vi/php/concepts/variables-and-types?preview=true#prereqs')).toBe(
      '/en/php/concepts/variables-and-types?preview=true#prereqs'
    );
    expect(switchLocalePath('vi', '/en')).toBe('/vi');
    expect(switchLocalePath('en', '/vi')).toBe('/en');
  });

  it('correctly strips locale prefix', () => {
    expect(stripLocalePrefix('/en')).toBe('');
    expect(stripLocalePrefix('/vi')).toBe('');
    expect(stripLocalePrefix('/en/php')).toBe('/php');
    expect(stripLocalePrefix('/vi/php/concepts/functions')).toBe('/php/concepts/functions');
    expect(stripLocalePrefix('/php')).toBe('/php');
  });
});
