import { describe, it, expect } from 'vitest';
import { getPhpRoadmap, getPhpLesson } from '../lib/learning-content';

describe('Web route boundary & lesson resolution (Task 3.1, Task 3.2)', () => {
  it('receives structured PHP roadmap with named sections and nodes', async () => {
    const roadmap = await getPhpRoadmap();
    expect(roadmap).not.toBeNull();
    expect(roadmap?.language).toBe('php');
    expect(roadmap?.sections.length).toBeGreaterThanOrEqual(2);

    const sectionTitles = roadmap?.sections.map((s) => s.title);
    expect(sectionTitles).toContain('PHP Fundamentals');
    expect(sectionTitles).toContain('Object-Oriented Architecture');
  });

  it('distinguishes published nodes and planned nodes', async () => {
    const roadmap = await getPhpRoadmap();
    expect(roadmap).not.toBeNull();

    const allNodes = roadmap!.sections.flatMap((s) => s.nodes);
    const publishedNodes = allNodes.filter((n) => n.status === 'published');
    const plannedNodes = allNodes.filter((n) => n.status === 'planned');

    expect(publishedNodes.length).toBeGreaterThanOrEqual(1);
    expect(plannedNodes.length).toBeGreaterThanOrEqual(1);

    // Planned nodes must have no published lesson
    for (const planned of plannedNodes) {
      if (planned.lessonSlug) {
        const lesson = await getPhpLesson(planned.lessonSlug);
        expect(lesson).toBeNull();
      }
    }
  });

  it('resolves every published roadmap node to its matching published lesson with all mandatory sections', async () => {
    const roadmap = await getPhpRoadmap();
    expect(roadmap).not.toBeNull();

    const publishedNodes = roadmap!.sections
      .flatMap((s) => s.nodes)
      .filter((n) => n.status === 'published');

    for (const node of publishedNodes) {
      expect(node.lessonSlug).toBeDefined();
      const lesson = await getPhpLesson(node.lessonSlug!);

      expect(lesson, `Lesson for published node "${node.id}" (${node.lessonSlug}) should exist`).not.toBeNull();
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
  });

  it('returns null for an invalid or unknown slug to trigger notFound()', async () => {
    const lesson = await getPhpLesson('invalid-nonexistent-slug-404');
    expect(lesson).toBeNull();
  });
});
