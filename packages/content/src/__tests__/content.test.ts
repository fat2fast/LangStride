import { describe, it, expect } from 'vitest';
import {
  ConceptSchema,
  RoadmapFileSchema,
  LessonFrontmatterSchema,
} from '../schemas';
import { validateContentData, detectPrerequisiteCycles } from '../validate';
import { parseLessonContent } from '../load-content';
import type { Concept, Roadmap } from '@langstride/learning';

describe('Language-neutral domain contracts and schemas (FR-KNOW-001..009)', () => {
  it('validates language-independent concept without any language-locked field', () => {
    const rawConcept = {
      id: 'concept-variables',
      slug: 'variables-and-types',
      title: 'Variables and Types',
      description: 'Understanding memory allocation, identifiers, and primitive vs reference types.',
      prerequisites: [],
      related: ['concept-control-flow'],
    };

    const parsed = ConceptSchema.parse(rawConcept);
    expect(parsed.id).toBe('concept-variables');
    expect(parsed.slug).toBe('variables-and-types');
    expect(parsed.title).toBe('Variables and Types');
    expect((parsed as any).language).toBeUndefined();
  });

  it('rejects duplicate concept IDs or slugs', () => {
    const concepts: Concept[] = [
      {
        id: 'concept-variables',
        slug: 'variables-1',
        title: 'Variables',
        prerequisites: [],
        related: [],
      },
      {
        id: 'concept-variables', // duplicate ID
        slug: 'variables-2',
        title: 'Variables Copy',
        prerequisites: [],
        related: [],
      },
    ];

    const result = validateContentData(concepts, [], []);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Duplicate concept ID'))).toBe(true);
  });

  it('detects dangling prerequisite and related references', () => {
    const concepts: Concept[] = [
      {
        id: 'concept-functions',
        slug: 'functions',
        title: 'Functions',
        prerequisites: ['concept-non-existent-prereq'],
        related: ['concept-non-existent-related'],
      },
    ];

    const result = validateContentData(concepts, [], []);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('non-existent prerequisite'))).toBe(true);
    expect(result.errors.some((e) => e.includes('non-existent related'))).toBe(true);
  });

  it('detects prerequisite cycles in the concept graph', () => {
    const cyclicalConcepts: Concept[] = [
      {
        id: 'concept-a',
        slug: 'concept-a',
        title: 'Concept A',
        prerequisites: ['concept-b'],
        related: [],
      },
      {
        id: 'concept-b',
        slug: 'concept-b',
        title: 'Concept B',
        prerequisites: ['concept-c'],
        related: [],
      },
      {
        id: 'concept-c',
        slug: 'concept-c',
        title: 'Concept C',
        prerequisites: ['concept-a'], // cycle!
        related: [],
      },
    ];

    const cycleErrors = detectPrerequisiteCycles(cyclicalConcepts);
    expect(cycleErrors.length).toBeGreaterThan(0);
    expect(cycleErrors[0]).toContain('Prerequisite cycle detected');

    const result = validateContentData(cyclicalConcepts, [], []);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('cycle'))).toBe(true);
  });
});

describe('Lesson content parser and validation rules (FR-LESSON-001..008)', () => {
  const validMarkdown = `---
id: php-variables
slug: php-variables
title: Variables and Types in PHP
conceptId: concept-variables
language: php
status: published
sources:
  - title: PHP Manual
    url: https://www.php.net/manual/en/language.variables.php
---

## Why it matters
Variables are the fundamental storage containers in PHP.

## Mental model
Think of variables in PHP as dynamically typed labeled boxes.

## Code example
\`\`\`php
<?php
$message = "Hello, LangStride";
$count = 42;
echo $message . " (" . $count . ")";
\`\`\`

## Common mistakes
Forgetting the dollar sign ($) before variable names.
`;

  it('correctly parses all mandatory sections and code example', () => {
    const parsed = parseLessonContent(validMarkdown, 'test.md');
    expect(parsed.frontmatter.title).toBe('Variables and Types in PHP');
    expect(parsed.whyItMatters).toContain('Variables are the fundamental storage containers');
    expect(parsed.mentalModel).toContain('dynamically typed labeled boxes');
    expect(parsed.codeExample.language).toBe('php');
    expect(parsed.codeExample.code).toContain('$message = "Hello, LangStride";');
    expect(parsed.commonMistakes).toContain('Forgetting the dollar sign');
  });

  it('rejects lessons missing mandatory section "Common mistakes"', () => {
    const invalidMarkdown = `---
id: php-variables
slug: php-variables
title: Variables and Types in PHP
conceptId: concept-variables
language: php
status: published
---

## Why it matters
Importance text.

## Mental model
Mental model text.

## Code example
\`\`\`php
<?php echo 1; ?>
\`\`\`
`;
    const parsed = parseLessonContent(invalidMarkdown, 'test.md');
    const concepts: Concept[] = [
      { id: 'concept-variables', slug: 'variables', title: 'Variables', prerequisites: [], related: [] },
    ];
    const roadmap: Roadmap = {
      language: 'php',
      title: 'PHP Roadmap',
      sections: [
        {
          id: 'basics',
          title: 'Basics',
          order: 0,
          nodes: [
            {
              id: 'node-var',
              conceptId: 'concept-variables',
              title: 'Variables',
              lessonSlug: 'php-variables',
              status: 'published',
              order: 0,
            },
          ],
        },
      ],
    };

    const result = validateContentData(concepts, [{ language: 'php', roadmap }], [{ language: 'php', lessons: [parsed] }]);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Common mistakes'))).toBe(true);
  });

  it('rejects a published roadmap node whose matching lesson is missing or not published', () => {
    const concepts: Concept[] = [
      { id: 'concept-variables', slug: 'variables', title: 'Variables', prerequisites: [], related: [] },
    ];
    const roadmap: Roadmap = {
      language: 'php',
      title: 'PHP Roadmap',
      sections: [
        {
          id: 'basics',
          title: 'Basics',
          order: 0,
          nodes: [
            {
              id: 'node-var',
              conceptId: 'concept-variables',
              title: 'Variables',
              lessonSlug: 'missing-lesson',
              status: 'published',
              order: 0,
            },
          ],
        },
      ],
    };

    const result = validateContentData(concepts, [{ language: 'php', roadmap }], [{ language: 'php', lessons: [] }]);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('missing-lesson') && e.includes('not found'))).toBe(true);
  });

  it('rejects planned node that has a published lesson', () => {
    const parsed = parseLessonContent(validMarkdown, 'test.md');
    const concepts: Concept[] = [
      { id: 'concept-variables', slug: 'variables', title: 'Variables', prerequisites: [], related: [] },
    ];
    const roadmap: Roadmap = {
      language: 'php',
      title: 'PHP Roadmap',
      sections: [
        {
          id: 'basics',
          title: 'Basics',
          order: 0,
          nodes: [
            {
              id: 'node-var',
              conceptId: 'concept-variables',
              title: 'Variables',
              lessonSlug: 'php-variables',
              status: 'planned', // marked as planned but has published lesson!
              order: 0,
            },
          ],
        },
      ],
    };

    const result = validateContentData(concepts, [{ language: 'php', roadmap }], [{ language: 'php', lessons: [parsed] }]);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Planned roadmap node') && e.includes('has a published lesson'))).toBe(true);
  });
});
