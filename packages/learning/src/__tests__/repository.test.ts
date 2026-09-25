import { describe, it, expect } from 'vitest';
import { createLearningRepository } from '../repository';
import type { Concept, Roadmap, Lesson } from '../index';

describe('LearningRepository (Task 2.1, FR-KNOW-001..009)', () => {
  const mockConcepts: Concept[] = [
    {
      id: 'concept-variables',
      slug: 'variables-and-types',
      title: 'Variables and Types',
      description: 'Generic storage primitives',
      prerequisites: [],
      related: ['concept-control-flow'],
    },
    {
      id: 'concept-control-flow',
      slug: 'control-flow',
      title: 'Control Flow',
      description: 'Conditionals and loops',
      prerequisites: ['concept-variables'],
      related: ['concept-functions'],
    },
  ];

  const mockRoadmap: Roadmap = {
    language: 'php',
    title: 'PHP Roadmap',
    description: 'Structured PHP learning track',
    sections: [
      {
        id: 'section-fundamentals',
        title: 'PHP Fundamentals',
        order: 1,
        nodes: [
          {
            id: 'node-php-variables',
            conceptId: 'concept-variables',
            title: 'PHP Variables',
            lessonSlug: 'php-variables',
            status: 'published',
            order: 1,
          },
          {
            id: 'node-php-control-flow',
            conceptId: 'concept-control-flow',
            title: 'PHP Control Flow',
            status: 'planned',
            order: 2,
          },
        ],
      },
    ],
  };

  const mockLessons: Lesson[] = [
    {
      frontmatter: {
        id: 'php-variables',
        slug: 'php-variables',
        title: 'Variables in PHP',
        conceptId: 'concept-variables',
        language: 'php',
        status: 'published',
      },
      rawContent: '',
      whyItMatters: 'Variables are essential',
      mentalModel: 'Labeled boxes',
      codeExample: { language: 'php', code: '$x = 1;' },
      commonMistakes: 'Missing $ sign',
    },
  ];

  const repo = createLearningRepository({
    loadConcepts: async () => mockConcepts,
    loadRoadmap: async (lang) => (lang === 'php' ? mockRoadmap : null),
    loadLessons: async (lang) => (lang === 'php' ? mockLessons : []),
  });

  it('retrieves roadmap for language', async () => {
    const roadmap = await repo.getRoadmap('php');
    expect(roadmap).not.toBeNull();
    expect(roadmap?.sections.length).toBe(1);
    expect(roadmap?.sections[0].nodes.length).toBe(2);
  });

  it('resolves published lesson with concept relations', async () => {
    const lesson = await repo.getLesson('php', 'php-variables');
    expect(lesson).not.toBeNull();
    expect(lesson?.frontmatter.title).toBe('Variables in PHP');
    expect(lesson?.relatedConcepts?.length).toBe(1);
    expect(lesson?.relatedConcepts?.[0].title).toBe('Control Flow');
  });

  it('returns null for unknown language or slug', async () => {
    expect(await repo.getRoadmap('unknown')).toBeNull();
    expect(await repo.getLesson('php', 'unknown-slug')).toBeNull();
  });
});
