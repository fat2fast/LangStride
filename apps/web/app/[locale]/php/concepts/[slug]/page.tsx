import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isLocale } from '../../../../../lib/i18n/config';
import { getMessages } from '../../../../../lib/i18n/messages';
import { getPhpLesson, getPhpRoadmap } from '../../../../../lib/learning-content';
import { LessonRenderer } from '../../../../../components/lesson-renderer';

interface ConceptPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const roadmap = await getPhpRoadmap(locale);
    if (!roadmap) continue;

    for (const section of roadmap.sections) {
      for (const node of section.nodes) {
        if (node.status === 'published' && node.lessonSlug) {
          params.push({ locale, slug: node.lessonSlug });
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const messages = getMessages(locale);
  const lesson = await getPhpLesson(slug, locale);

  if (!lesson) {
    return {
      title: messages.lesson.metaNotFoundTitle,
    };
  }

  return {
    title: `${lesson.frontmatter.title} ${messages.lesson.metaTitleSuffix}`,
    description: lesson.whyItMatters.slice(0, 160),
  };
}

export default async function PhpConceptPage({ params }: ConceptPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const lesson = await getPhpLesson(slug, locale);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="py-6">
      <LessonRenderer lesson={lesson} locale={locale} />
    </div>
  );
}
