import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '../../../lib/i18n/config';
import { getMessages } from '../../../lib/i18n/messages';
import { getPhpRoadmap } from '../../../lib/learning-content';
import { PhpRoadmap } from '../../../components/php-roadmap';

interface PhpRoadmapPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PhpRoadmapPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const messages = getMessages(locale);
  return {
    title: messages.roadmap.metaTitle,
    description: messages.roadmap.metaDescription,
  };
}

export default async function PhpRoadmapPage({ params }: PhpRoadmapPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const roadmap = await getPhpRoadmap(locale);

  if (!roadmap) {
    notFound();
  }

  return (
    <div className="py-6">
      <PhpRoadmap roadmap={roadmap} locale={locale} />
    </div>
  );
}
