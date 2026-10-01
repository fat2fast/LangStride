import type { Locale } from './config';
import { defaultLocale } from './config';
import { en, type Messages } from './messages/en';
import { vi } from './messages/vi';

export type { Messages };

const catalogs: Record<Locale, Messages> = {
  en,
  vi,
};

export function getMessages(locale: Locale): Messages {
  return catalogs[locale] || catalogs[defaultLocale];
}
