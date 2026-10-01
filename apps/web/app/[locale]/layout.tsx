import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '../../lib/i18n/config';
import { getMessages } from '../../lib/i18n/messages';
import { localizePath } from '../../lib/i18n/paths';
import { LocaleSwitcher } from '../../components/locale-switcher';
import '../globals.css';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const messages = getMessages(locale);
  return {
    title: messages.shell.rootTitle,
    description: messages.shell.rootDescription,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);
  const homePath = localizePath(locale, '/');
  const roadmapPath = localizePath(locale, '/php');

  return (
    <html lang={locale}>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <Link
              href={homePath}
              className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                L
              </span>
              <span>{messages.shell.brandName}</span>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600">
              <Link href={roadmapPath} className="hover:text-blue-600 transition-colors">
                {messages.shell.navPhpRoadmap}
              </Link>
              <a
                href="https://github.com/fat2fast/LangStride"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-700 transition-colors hidden sm:inline"
              >
                {messages.shell.navGithub}
              </a>
              <LocaleSwitcher currentLocale={locale} />
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <p>{messages.shell.footerText}</p>
        </footer>
      </body>
    </html>
  );
}
