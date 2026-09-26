import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPhpLesson, getPhpRoadmap } from '@/lib/learning-content';
import { LessonRenderer } from '@/components/lesson-renderer';

interface ConceptPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const roadmap = await getPhpRoadmap();
  if (!roadmap) return [];

  const slugs: { slug: string }[] = [];
  for (const section of roadmap.sections) {
    for (const node of section.nodes) {
      if (node.status === 'published' && node.lessonSlug) {
        slugs.push({ slug: node.lessonSlug });
      }
    }
  }
  return slugs;
}

export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getPhpLesson(slug);

  if (!lesson) {
    return {
      title: 'Lesson Not Found | LangStride',
    };
  }

  return {
    title: `${lesson.frontmatter.title} | LangStride PHP`,
    description: lesson.whyItMatters.slice(0, 160),
  };
}

export default async function PhpConceptPage({ params }: ConceptPageProps) {
  const { slug } = await params;
  const lesson = await getPhpLesson(slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="py-6">
      <LessonRenderer lesson={lesson} />
    </div>
  );
}
