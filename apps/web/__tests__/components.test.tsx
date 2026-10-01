/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhpRoadmap } from '../components/php-roadmap';
import { LessonRenderer } from '../components/lesson-renderer';
import type { Roadmap, Lesson } from '@langstride/learning';

describe('UI Component rendering (Task 3.2, FR-PHP-003..008, FR-LESSON-001..007)', () => {
  const sampleRoadmap: Roadmap = {
    language: 'php',
    title: 'PHP Roadmap Title',
    description: 'Roadmap description text',
    sections: [
      {
        id: 'section-1',
        title: 'Core Fundamentals',
        order: 1,
        nodes: [
          {
            id: 'node-1',
            conceptId: 'concept-var',
            title: 'Variables Topic',
            lessonSlug: 'test-variables',
            status: 'published',
            order: 1,
          },
          {
            id: 'node-2',
            conceptId: 'concept-fibers',
            title: 'Fibers Topic',
            status: 'planned',
            order: 2,
          },
        ],
      },
    ],
  };

  const sampleLesson: Lesson = {
    frontmatter: {
      id: 'php-test-var',
      slug: 'test-variables',
      title: 'Variables Lesson Title',
      conceptId: 'concept-var',
      language: 'php',
      status: 'published',
      sources: [
        {
          title: 'Official PHP Doc',
          url: 'https://www.php.net/manual',
        },
      ],
    },
    rawContent: '',
    whyItMatters: 'Why it matters test explanation.',
    mentalModel: 'Mental model test explanation.',
    codeExample: {
      language: 'php',
      code: '<?php echo "Hello Test"; ?>',
    },
    commonMistakes: 'Mistake 1: Forgetting something.',
    prerequisiteConcepts: [],
    relatedConcepts: [],
  };

  it('PhpRoadmap renders section title, published link, and planned node as disabled', () => {
    render(<PhpRoadmap roadmap={sampleRoadmap} />);

    // Section title
    expect(screen.getByText('Core Fundamentals')).toBeDefined();

    // Published node link
    const publishedLink = screen.getByRole('link', { name: /Variables Topic/i });
    expect(publishedLink).toBeDefined();
    expect(publishedLink.getAttribute('href')).toBe('/php/concepts/test-variables');

    // Planned node should NOT be a link and have aria-disabled
    expect(screen.getByText('Fibers Topic')).toBeDefined();
    const plannedElement = screen.getByText('Fibers Topic').closest('[aria-disabled="true"]');
    expect(plannedElement).not.toBeNull();
  });

  it('PhpRoadmap resolves prerequisite IDs to readable titles and never leaks internal identifiers (Finding 2)', () => {
    const roadmapWithPrereqs: Roadmap = {
      language: 'php',
      title: 'PHP Roadmap with Prereqs',
      sections: [
        {
          id: 'section-1',
          title: 'Section 1',
          order: 1,
          nodes: [
            {
              id: 'node-var-id',
              conceptId: 'concept-var',
              title: 'Variables Concept Title',
              lessonSlug: 'var-slug',
              status: 'published',
              order: 1,
            },
            {
              id: 'node-ctrl-id',
              conceptId: 'concept-ctrl',
              title: 'Control Flow Title',
              lessonSlug: 'ctrl-slug',
              status: 'published',
              order: 2,
              prerequisites: ['node-var-id'],
            },
          ],
        },
      ],
    };

    render(<PhpRoadmap roadmap={roadmapWithPrereqs} />);

    // Must render the resolved human-readable title in both node header and prerequisite tag
    const elements = screen.getAllByText('Variables Concept Title');
    expect(elements.length).toBe(2);

    // Must NEVER leak the internal node identifier into rendered output
    expect(screen.queryByText(/node-var-id/)).toBeNull();
  });

  it('PhpRoadmap does not mutate input roadmap props while sorting (Finding 4)', () => {
    // Deeply freeze roadmap object to ensure rendering is completely pure and non-mutating
    const frozenRoadmap = Object.freeze({
      language: 'php',
      title: 'Frozen PHP Roadmap',
      sections: Object.freeze([
        Object.freeze({
          id: 'sec-2',
          title: 'Advanced Section',
          order: 2,
          nodes: Object.freeze([
            Object.freeze({
              id: 'node-b',
              conceptId: 'concept-b',
              title: 'Second Node',
              status: 'planned' as const,
              order: 2,
            }),
            Object.freeze({
              id: 'node-a',
              conceptId: 'concept-a',
              title: 'First Node',
              lessonSlug: 'first-node',
              status: 'published' as const,
              order: 1,
            }),
          ]),
        }),
        Object.freeze({
          id: 'sec-1',
          title: 'First Section',
          order: 1,
          nodes: Object.freeze([]),
        }),
      ]),
    }) as unknown as Roadmap;

    // Should render successfully without throwing "Cannot assign to read only property" error
    expect(() => render(<PhpRoadmap roadmap={frozenRoadmap} />)).not.toThrow();
  });

  it('LessonRenderer renders title, code-block, common mistakes, and mandatory sections', () => {
    render(<LessonRenderer lesson={sampleLesson} />);

    // Title
    expect(screen.getByRole('heading', { level: 1, name: /Variables Lesson Title/i })).toBeDefined();

    // Mandatory sections
    expect(screen.getByText('Why it matters test explanation.')).toBeDefined();
    expect(screen.getByText('Mental model test explanation.')).toBeDefined();
    expect(screen.getByText('<?php echo "Hello Test"; ?>')).toBeDefined();
    expect(screen.getByText(/Mistake 1: Forgetting something/i)).toBeDefined();

    // Official sources link
    const sourceLink = screen.getByRole('link', { name: /Official PHP Doc/i });
    expect(sourceLink.getAttribute('href')).toBe('https://www.php.net/manual');
  });

  it('LessonRenderer renders formatted Markdown lists and emphasis via MarkdownProse', () => {
    const lessonWithMarkdown: Lesson = {
      ...sampleLesson,
      mentalModel: 'Root hierarchy:\n1. Error: Fatal issues.\n2. Exception: Domain issues.',
      commonMistakes: '1. **Swallowing exceptions**: Never do `catch (Exception $e) {}`.\n2. **Wrong type**: Do not catch generic Exception.',
    };

    render(<LessonRenderer lesson={lessonWithMarkdown} />);

    // Ordered list items should be in <ol> and <li> elements
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThanOrEqual(4);

    // Bold text should be rendered with strong
    expect(screen.getByText('Swallowing exceptions')).toBeDefined();

    // Inline code should be rendered with code tag
    expect(screen.getByText('catch (Exception $e) {}')).toBeDefined();
  });

  it('PhpRoadmap provides accessible disclosure button with aria-expanded and aria-controls', () => {
    const multiSectionRoadmap: Roadmap = {
      language: 'php',
      title: 'Multi-Section Roadmap',
      sections: [
        {
          id: 'sec-alpha',
          title: 'Alpha Section',
          order: 1,
          nodes: [
            {
              id: 'node-a1',
              conceptId: 'concept-a1',
              title: 'Lesson A1',
              status: 'published',
              lessonSlug: 'lesson-a1',
              order: 1,
            },
          ],
        },
        {
          id: 'sec-beta',
          title: 'Beta Section',
          order: 2,
          nodes: [],
        },
      ],
    };

    const { container } = render(<PhpRoadmap roadmap={multiSectionRoadmap} />);

    // Multi-section roadmap starts collapsed
    const disclosureBtn = container.querySelector<HTMLButtonElement>('#section-header-sec-alpha')!;
    expect(disclosureBtn).not.toBeNull();
    expect(disclosureBtn.getAttribute('aria-expanded')).toBe('false');
    expect(disclosureBtn.getAttribute('aria-controls')).toBe('section-content-sec-alpha');

    // Click to expand
    fireEvent.click(disclosureBtn);
    expect(disclosureBtn.getAttribute('aria-expanded')).toBe('true');

    // Click to collapse
    fireEvent.click(disclosureBtn);
    expect(disclosureBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('PhpRoadmap isolates collapsed lesson links from tab order via tabIndex=-1', () => {
    const multiSectionRoadmap: Roadmap = {
      language: 'php',
      title: 'Tab Order Test Roadmap',
      sections: [
        {
          id: 'sec-1',
          title: 'Section One',
          order: 1,
          nodes: [
            {
              id: 'node-1',
              conceptId: 'concept-1',
              title: 'Accessible Lesson',
              status: 'published',
              lessonSlug: 'accessible-lesson',
              order: 1,
            },
          ],
        },
        {
          id: 'sec-2',
          title: 'Section Two',
          order: 2,
          nodes: [],
        },
      ],
    };

    const { container } = render(<PhpRoadmap roadmap={multiSectionRoadmap} />);

    // In collapsed section, links must have tabIndex = -1
    const link = container.querySelector('a[href="/php/concepts/accessible-lesson"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('tabIndex')).toBe('-1');

    // Expand section
    const disclosureBtn = container.querySelector<HTMLButtonElement>('#section-header-sec-1')!;
    expect(disclosureBtn).not.toBeNull();
    fireEvent.click(disclosureBtn);

    // In expanded section, links must have tabIndex = 0
    expect(link?.getAttribute('tabIndex')).toBe('0');
  });

  it('PhpRoadmap popover uses accessible region semantics and handles close button and Escape key', () => {
    const testRoadmap: Roadmap = {
      language: 'php',
      title: 'Popover Test Roadmap',
      sections: [
        {
          id: 'sec-popover',
          title: 'Popover Section',
          order: 1,
          nodes: [
            {
              id: 'node-pop',
              conceptId: 'concept-pop',
              title: 'Interactive Node',
              status: 'published',
              lessonSlug: 'interactive-slug',
              order: 1,
            },
          ],
        },
      ],
    };

    render(<PhpRoadmap roadmap={testRoadmap} />);

    // Single section starts expanded
    const nodeBtn = screen.getByRole('button', { name: /Bài học 1\.1: Interactive Node/i });
    expect(nodeBtn.getAttribute('aria-expanded')).toBe('false');

    // Click button to open popover
    fireEvent.click(nodeBtn);
    expect(nodeBtn.getAttribute('aria-expanded')).toBe('true');

    // Region with accessible title is rendered
    const region = screen.getByRole('region');
    expect(region).toBeDefined();

    // Accessible close button
    const closeBtn = screen.getByRole('button', { name: /Đóng chi tiết bài học/i });
    expect(closeBtn).toBeDefined();

    // Click close button
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('region')).toBeNull();

    // Reopen and test Escape key
    fireEvent.click(nodeBtn);
    expect(screen.getByRole('region')).toBeDefined();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('region')).toBeNull();
  });

  it('PhpRoadmap cleanly handles data-driven roadmaps with 1, 2, or 3+ sections', () => {
    const singleSection: Roadmap = {
      language: 'php',
      title: 'Single Section',
      sections: [{ id: 's1', title: 'Only One', order: 1, nodes: [] }],
    };
    const twoSections: Roadmap = {
      language: 'php',
      title: 'Two Sections',
      sections: [
        { id: 's1', title: 'First', order: 1, nodes: [] },
        { id: 's2', title: 'Second', order: 2, nodes: [] },
      ],
    };
    const threeSections: Roadmap = {
      language: 'php',
      title: 'Three Sections',
      sections: [
        { id: 's1', title: 'First', order: 1, nodes: [] },
        { id: 's2', title: 'Second', order: 2, nodes: [] },
        { id: 's3', title: 'Third', order: 3, nodes: [] },
      ],
    };

    expect(() => render(<PhpRoadmap roadmap={singleSection} />)).not.toThrow();
    expect(() => render(<PhpRoadmap roadmap={twoSections} />)).not.toThrow();
    expect(() => render(<PhpRoadmap roadmap={threeSections} />)).not.toThrow();
  });
});
