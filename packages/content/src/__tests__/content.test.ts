import { describe, it, expect } from 'vitest';
import {
  ConceptSchema,
  RoadmapFileSchema,
  LessonFrontmatterSchema,
} from '../schemas';
import { validateContentData, detectPrerequisiteCycles, detectRoadmapNodeCycles } from '../validate';
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

  it('rejects duplicate roadmap section IDs', () => {
    const concepts: Concept[] = [
      { id: 'concept-variables', slug: 'variables', title: 'Variables', prerequisites: [], related: [] },
    ];
    const roadmap: Roadmap = {
      language: 'php',
      title: 'PHP Roadmap',
      sections: [
        { id: 'dup-sec', title: 'Section 1', order: 0, nodes: [] },
        { id: 'dup-sec', title: 'Section 2', order: 1, nodes: [] },
      ],
    };
    const result = validateContentData(concepts, [{ language: 'php', roadmap }], []);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Duplicate section ID "dup-sec"'))).toBe(true);
  });

  it('rejects published node when conceptId does not match its lesson conceptId', () => {
    const parsed = parseLessonContent(validMarkdown, 'test.md'); // has conceptId: concept-variables
    const concepts: Concept[] = [
      { id: 'concept-variables', slug: 'variables', title: 'Variables', prerequisites: [], related: [] },
      { id: 'concept-other', slug: 'other', title: 'Other', prerequisites: [], related: [] },
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
              conceptId: 'concept-other', // Mismatched conceptId!
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
    expect(result.errors.some((e) => e.includes('has conceptId "concept-other" but references lesson "php-variables" with conceptId "concept-variables"'))).toBe(true);
  });

  it('rejects dangling roadmap node prerequisites', () => {
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
              status: 'planned',
              order: 0,
              prerequisites: ['non-existent-node-id'],
            },
          ],
        },
      ],
    };
    const result = validateContentData(concepts, [{ language: 'php', roadmap }], []);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('references non-existent prerequisite node "non-existent-node-id"'))).toBe(true);
  });

  it('detects prerequisite cycles in roadmap nodes', () => {
    const concepts: Concept[] = [
      { id: 'c1', slug: 'c1', title: 'C1', prerequisites: [], related: [] },
      { id: 'c2', slug: 'c2', title: 'C2', prerequisites: [], related: [] },
    ];
    const cyclicalRoadmap: Roadmap = {
      language: 'php',
      title: 'PHP Roadmap',
      sections: [
        {
          id: 's1',
          title: 'Section 1',
          order: 0,
          nodes: [
            { id: 'node-1', conceptId: 'c1', title: 'Node 1', status: 'planned', order: 0, prerequisites: ['node-2'] },
            { id: 'node-2', conceptId: 'c2', title: 'Node 2', status: 'planned', order: 1, prerequisites: ['node-1'] },
          ],
        },
      ],
    };
    const cycleErrors = detectRoadmapNodeCycles(cyclicalRoadmap);
    expect(cycleErrors.length).toBeGreaterThan(0);
    expect(cycleErrors[0]).toContain('Prerequisite cycle detected in roadmap nodes');

    const result = validateContentData(concepts, [{ language: 'php', roadmap: cyclicalRoadmap }], []);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Prerequisite cycle detected in roadmap nodes'))).toBe(true);
  });

  it('rejects published lesson with no sources', () => {
    const markdownNoSources = `---
id: php-variables
slug: php-variables
title: Variables and Types in PHP
conceptId: concept-variables
language: php
status: published
sources: []
---

## Why it matters
Why it matters text.

## Mental model
Mental model text.

## Code example
\`\`\`php
<?php echo 1;
\`\`\`

## Common mistakes
Common mistakes text.
`;
    const parsed = parseLessonContent(markdownNoSources, 'test.md');
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
    expect(result.errors.some((e) => e.includes('must have at least one authoritative source reference'))).toBe(true);
  });

  it('rejects lesson when language does not match roadmap language', () => {
    const markdownGoLesson = `---
id: go-variables
slug: go-variables
title: Variables in Go
conceptId: concept-variables
language: go
status: published
sources:
  - title: Go Spec
    url: https://go.dev/ref/spec
---

## Why it matters
Why it matters text.

## Mental model
Mental model text.

## Code example
\`\`\`go
var a = 1
\`\`\`

## Common mistakes
Common mistakes text.
`;
    const parsed = parseLessonContent(markdownGoLesson, 'test.md');
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
              lessonSlug: 'go-variables',
              status: 'published',
              order: 0,
            },
          ],
        },
      ],
    };
    const result = validateContentData(concepts, [{ language: 'php', roadmap }], [{ language: 'php', lessons: [parsed] }]);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('does not match expected language "php"') || e.includes('with language "go"'))).toBe(true);
  });

  it('rejects roadmap when declared language does not match collection language', () => {
    const concepts: Concept[] = [
      { id: 'concept-variables', slug: 'variables', title: 'Variables', prerequisites: [], related: [] },
    ];
    const mismatchedRoadmap: Roadmap = {
      language: 'go', // Mismatched! Declared 'go' but validated in 'php' collection
      title: 'Go Roadmap in PHP slot',
      sections: [],
    };
    const result = validateContentData(concepts, [{ language: 'php', roadmap: mismatchedRoadmap }], []);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Roadmap declared language "go" does not match expected collection language "php"'))).toBe(true);
  });
});
