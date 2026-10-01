import { describe, it, expect } from 'vitest';
import { getPhpRoadmap, getPhpLesson } from '../lib/learning-content';
import { locales, type Locale } from '../lib/i18n';
import { generateMetadata as generateHomeMetadata } from '../app/[locale]/layout';
import { generateMetadata as generateRoadmapMetadata } from '../app/[locale]/php/page';
import { generateMetadata as generateConceptMetadata } from '../app/[locale]/php/concepts/[slug]/page';

describe('Web route boundary & lesson resolution parameterized across locales (Task 5.1)', () => {
  it.each(locales)('receives structured PHP roadmap with named sections and nodes for locale "%s"', async (locale) => {
    const roadmap = await getPhpRoadmap(locale);
    expect(roadmap).not.toBeNull();
    expect(roadmap?.language).toBe('php');
    expect(roadmap?.sections.length).toBeGreaterThanOrEqual(2);

    const sectionTitles = roadmap?.sections.map((s) => s.title);
    if (locale === 'en') {
      expect(sectionTitles).toContain('PHP Fundamentals');
      expect(sectionTitles).toContain('Object-Oriented Architecture');
    } else {
      expect(sectionTitles).toContain('Nền tảng PHP');
      expect(sectionTitles).toContain('Kiến trúc Hướng Đối Tượng');
    }
  });

  it.each(locales)('distinguishes published nodes and planned nodes for locale "%s"', async (locale) => {
    const roadmap = await getPhpRoadmap(locale);
    expect(roadmap).not.toBeNull();

    const allNodes = roadmap!.sections.flatMap((s) => s.nodes);
    const publishedNodes = allNodes.filter((n) => n.status === 'published');
    const plannedNodes = allNodes.filter((n) => n.status === 'planned');

    expect(publishedNodes.length).toBe(6);
    expect(plannedNodes.length).toBe(1);

    // Planned nodes must have no published lesson
    for (const planned of plannedNodes) {
      if (planned.lessonSlug) {
        const lesson = await getPhpLesson(planned.lessonSlug, locale);
        expect(lesson).toBeNull();
      }
    }
  });

  it.each(locales)(
    'resolves every published roadmap node to its matching published lesson with all mandatory sections in locale "%s"',
    async (locale) => {
      const roadmap = await getPhpRoadmap(locale);
      expect(roadmap).not.toBeNull();

      const publishedNodes = roadmap!.sections
        .flatMap((s) => s.nodes)
        .filter((n) => n.status === 'published');

      for (const node of publishedNodes) {
        expect(node.lessonSlug).toBeDefined();
        const lesson = await getPhpLesson(node.lessonSlug!, locale);

        expect(lesson, `Lesson for published node "${node.id}" (${node.lessonSlug}) in "${locale}" should exist`).not.toBeNull();
        expect(lesson!.frontmatter.status).toBe('published');

        // Title assertion
        expect(lesson!.frontmatter.title.length).toBeGreaterThan(0);

        // Why it matters assertion
        expect(lesson!.whyItMatters.length).toBeGreaterThan(0);

        // Mental model assertion
        expect(lesson!.mentalModel.length).toBeGreaterThan(0);

        // Code-block assertion
        expect(lesson!.codeExample.language).toBe('php');
        expect(lesson!.codeExample.code.length).toBeGreaterThan(0);

        // Common-mistakes assertion
        expect(lesson!.commonMistakes.length).toBeGreaterThan(0);
      }
    }
  );

  it.each(locales)('returns null for an invalid or unknown slug to trigger notFound() in locale "%s"', async (locale) => {
    const lesson = await getPhpLesson('invalid-nonexistent-slug-404', locale);
    expect(lesson).toBeNull();
  });

  it.each(locales)('generates locale-specific metadata for roadmap and lesson routes in "%s"', async (locale) => {
    const homeMeta = await generateHomeMetadata({ params: Promise.resolve({ locale }) });
    expect(homeMeta.title).toBeDefined();

    const roadmapMeta = await generateRoadmapMetadata({ params: Promise.resolve({ locale }) });
    expect(roadmapMeta.title).toBeDefined();
    if (locale === 'en') {
      expect(roadmapMeta.title).toContain('PHP Developer Roadmap');
    } else {
      expect(roadmapMeta.title).toContain('Lộ trình Lập trình viên PHP');
    }

    const conceptMeta = await generateConceptMetadata({
      params: Promise.resolve({ locale, slug: 'variables-and-types' }),
    });
    expect(conceptMeta.title).toBeDefined();
    if (locale === 'en') {
      expect(conceptMeta.title).toContain('Variables and Types in PHP');
    } else {
      expect(conceptMeta.title).toContain('Biến và Hệ thống Kiểu Dữ liệu trong PHP');
    }
  });
});
