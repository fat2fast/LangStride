/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
