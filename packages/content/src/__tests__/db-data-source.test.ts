import { describe, it, expect, vi } from 'vitest';
import { DatabaseLearningDataSource } from '../db-data-source';
import type { Pool } from 'pg';

describe('DatabaseLearningDataSource (Read-Model Adapter for Task 2.1 & Finding 3)', () => {
  it('correctly loads and reconstructs concepts with prerequisites and related relations', async () => {
    const mockQuery = vi.fn().mockImplementation((queryStr: string) => {
      if (queryStr.includes('FROM concepts')) {
        return Promise.resolve({
          rows: [
            { id: 'concept-var', slug: 'variables', title: 'Variables', description: 'Vars desc' },
            { id: 'concept-flow', slug: 'flow', title: 'Flow', description: null },
          ],
        });
      }
      if (queryStr.includes('FROM concept_relations')) {
        return Promise.resolve({
          rows: [
            { concept_id: 'concept-flow', target_concept_id: 'concept-var', relation_type: 'prerequisite' },
            { concept_id: 'concept-var', target_concept_id: 'concept-flow', relation_type: 'related' },
          ],
        });
      }
      return Promise.resolve({ rows: [] });
    });

    const mockPool = { query: mockQuery } as unknown as Pool;
    const dataSource = new DatabaseLearningDataSource(mockPool);

    const concepts = await dataSource.loadConcepts();
    expect(concepts.length).toBe(2);

    const varConcept = concepts.find((c) => c.id === 'concept-var');
    expect(varConcept).toBeDefined();
    expect(varConcept!.related).toEqual(['concept-flow']);

    const flowConcept = concepts.find((c) => c.id === 'concept-flow');
    expect(flowConcept).toBeDefined();
    expect(flowConcept!.prerequisites).toEqual(['concept-var']);
  });

  it('correctly loads and reconstructs roadmap, sections, nodes, and node prerequisites', async () => {
    const mockQuery = vi.fn().mockImplementation((queryStr: string, params?: any[]) => {
      if (queryStr.includes('FROM roadmaps')) {
        return Promise.resolve({
          rows: [
            { id: 'roadmap-php', language: 'php', title: 'PHP Roadmap', description: 'PHP Desc' },
          ],
        });
      }
      if (queryStr.includes('FROM roadmap_sections')) {
        return Promise.resolve({
          rows: [
            { id: 'sec-1', title: 'Section 1', description: null, display_order: 1 },
          ],
        });
      }
      if (queryStr.includes('FROM roadmap_nodes')) {
        return Promise.resolve({
          rows: [
            {
              id: 'node-var',
              section_id: 'sec-1',
              concept_id: 'concept-var',
              title: 'Variables Node',
              lesson_slug: 'variables-and-types',
              status: 'published',
              display_order: 1,
            },
            {
              id: 'node-flow',
              section_id: 'sec-1',
              concept_id: 'concept-flow',
              title: 'Flow Node',
              lesson_slug: 'control-flow',
              status: 'published',
              display_order: 2,
            },
          ],
        });
      }
      if (queryStr.includes('FROM roadmap_node_prerequisites')) {
        return Promise.resolve({
          rows: [
            { node_id: 'node-flow', prerequisite_node_id: 'node-var' },
          ],
        });
      }
      return Promise.resolve({ rows: [] });
    });

    const mockPool = { query: mockQuery } as unknown as Pool;
    const dataSource = new DatabaseLearningDataSource(mockPool);

    const roadmap = await dataSource.loadRoadmap('php');
    expect(roadmap).not.toBeNull();
    expect(roadmap!.language).toBe('php');
    expect(roadmap!.sections.length).toBe(1);

    const section = roadmap!.sections[0];
    expect(section.nodes.length).toBe(2);

    const flowNode = section.nodes.find((n) => n.id === 'node-flow');
    expect(flowNode).toBeDefined();
    expect(flowNode!.prerequisites).toEqual(['node-var']); // Verified node-prerequisite persistence
  });

  it('correctly loads and reconstructs lessons and sources', async () => {
    const mockQuery = vi.fn().mockImplementation((queryStr: string) => {
      if (queryStr.includes('FROM lessons')) {
        return Promise.resolve({
          rows: [
            {
              id: 'php-variables',
              slug: 'variables-and-types',
              concept_id: 'concept-var',
              language: 'php',
              title: 'Variables Title',
              status: 'published',
              why_it_matters: 'Why it matters text',
              mental_model: 'Mental model text',
              code_example: JSON.stringify({ language: 'php', code: '<?php echo 1;' }),
              common_mistakes: 'Common mistakes text',
              raw_content: 'raw markdown',
            },
          ],
        });
      }
      if (queryStr.includes('FROM sources')) {
        return Promise.resolve({
          rows: [
            { lesson_id: 'php-variables', title: 'PHP Docs', url: 'https://php.net' },
          ],
        });
      }
      return Promise.resolve({ rows: [] });
    });

    const mockPool = { query: mockQuery } as unknown as Pool;
    const dataSource = new DatabaseLearningDataSource(mockPool);

    const lessons = await dataSource.loadLessons('php');
    expect(lessons.length).toBe(1);

    const lesson = lessons[0];
    expect(lesson.frontmatter.title).toBe('Variables Title');
    expect(lesson.frontmatter.sources).toEqual([
      { title: 'PHP Docs', url: 'https://php.net' },
    ]);
    expect(lesson.codeExample.language).toBe('php');
    expect(lesson.codeExample.code).toBe('<?php echo 1;');
  });
});
