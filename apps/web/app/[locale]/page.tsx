import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '../../lib/i18n/config';
import { getMessages } from '../../lib/i18n/messages';
import { localizePath } from '../../lib/i18n/paths';

interface LocalePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);
  const phpPath = localizePath(locale, '/php');

  return (
    <div className="py-12 space-y-8">
      <div className="max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <span>{messages.home.editionBadge}</span>
          <span>•</span>
          <span>{messages.home.sliceBadge}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          {messages.home.heroTitle}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {messages.home.heroSubtitle}
        </p>
      </div>

      <div className="pt-4 grid sm:grid-cols-2 gap-6 max-w-2xl">
        <Link
          href={phpPath}
          className="group block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              {messages.home.activeTrack}
            </span>
            <span className="text-slate-400 group-hover:text-blue-600 transition-colors">→</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {messages.home.phpTitle}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {messages.home.phpDesc}
          </p>
        </Link>
      </div>
    </div>
  );
}
