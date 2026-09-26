import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPhpRoadmap } from '@/lib/learning-content';
import { PhpRoadmap } from '@/components/php-roadmap';

export const metadata: Metadata = {
  title: 'PHP Developer Roadmap | LangStride',
  description: 'Structured, language-neutral learning roadmap for modern PHP 8.x from syntax fundamentals to robust object models and runtime errors.',
};

export default async function PhpRoadmapPage() {
  const roadmap = await getPhpRoadmap();

  if (!roadmap) {
    notFound();
  }

  return (
    <div className="py-6">
      <PhpRoadmap roadmap={roadmap} />
    </div>
  );
}
