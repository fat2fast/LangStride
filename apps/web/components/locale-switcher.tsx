'use client';

import React, { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { locales, localeNames, type Locale } from '../lib/i18n/config';
import { switchLocalePath } from '../lib/i18n/paths';
import { Globe } from 'lucide-react';

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

function LocaleSwitcherInner({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLocaleChange = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) return;

    // Persist user selection into NEXT_LOCALE cookie
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Construct target URL preserving query
    const queryString = searchParams?.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;
    const targetUrl = switchLocalePath(targetLocale, fullPath || '/');

    window.location.href = targetUrl;
  };

  return (
    <div
      role="group"
      aria-label="Language selection / Chọn ngôn ngữ"
      className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold"
    >
      <span className="sr-only">Language:</span>
      <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 mr-0.5" aria-hidden="true" />
      {locales.map((loc) => {
        const isActive = loc === currentLocale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => handleLocaleChange(loc)}
            aria-current={isActive ? 'true' : undefined}
            className={`px-2 py-1 rounded-md transition-all ${
              isActive
                ? 'bg-white text-blue-600 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {localeNames[loc]}
          </button>
        );
      })}
    </div>
  );
}

export function LocaleSwitcher(props: LocaleSwitcherProps) {
  return (
    <Suspense
      fallback={
        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold">
          <span className="sr-only">Language:</span>
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 mr-0.5" aria-hidden="true" />
          <span className="px-2 py-1 text-slate-600">{localeNames[props.currentLocale]}</span>
        </div>
      }
    >
      <LocaleSwitcherInner {...props} />
    </Suspense>
  );
}
