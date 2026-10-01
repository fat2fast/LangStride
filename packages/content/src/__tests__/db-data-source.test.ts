import { describe, it, expect, vi } from 'vitest';
import { DatabaseLearningDataSource } from '../db-data-source';
import type { Pool } from 'pg';

describe('DatabaseLearningDataSource (Read-Model Adapter for Task 2.1, Task 3.2, Finding 3)', () => {
  it('correctly loads and reconstructs concepts with prerequisites and related relations for EN and VI', async () => {
    const mockQuery = vi.fn().mockImplementation((queryStr: string, params?: any[]) => {
      if (queryStr.includes('FROM concepts')) {
        const locale = params?.[0] || 'en';
        if (locale === 'vi') {
          return Promise.resolve({
            rows: [
              { id: 'concept-var', slug: 'variables', title: 'Biến', description: 'Mô tả biến' },
              { id: 'concept-flow', slug: 'flow', title: 'Luồng điều khiển', description: null },
            ],
          });
        }
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

    // Test English
    const conceptsEn = await dataSource.loadConcepts('en');
    expect(conceptsEn.length).toBe(2);
    const varEn = conceptsEn.find((c) => c.id === 'concept-var');
    expect(varEn?.title).toBe('Variables');
    expect(varEn?.related).toEqual(['concept-flow']);

    // Test Vietnamese
    const conceptsVi = await dataSource.loadConcepts('vi');
    expect(conceptsVi.length).toBe(2);
    const varVi = conceptsVi.find((c) => c.id === 'concept-var');
    expect(varVi?.title).toBe('Biến');
    expect(varVi?.related).toEqual(['concept-flow']);
  });

  it('correctly loads and reconstructs roadmap, sections, nodes, and node prerequisites for a selected locale', async () => {
    const mockQuery = vi.fn().mockImplementation((queryStr: string, params?: any[]) => {
      if (queryStr.includes('FROM roadmaps')) {
        const lang = params?.[0];
        const locale = params?.[1];
        if (lang === 'php' && locale === 'vi') {
          return Promise.resolve({
            rows: [
              { id: 'roadmap-php-vi', language: 'php', locale: 'vi', title: 'Lộ trình PHP', description: 'Mô tả PHP' },
            ],
          });
        }
        if (lang === 'php' && locale === 'en') {
          return Promise.resolve({
            rows: [
              { id: 'roadmap-php-en', language: 'php', locale: 'en', title: 'PHP Roadmap', description: 'PHP Desc' },
            ],
          });
        }
        return Promise.resolve({ rows: [] });
      }
      if (queryStr.includes('FROM roadmap_sections')) {
        return Promise.resolve({
          rows: [
            { id: 'en:sec-1', title: 'Section 1', description: null, display_order: 1 },
          ],
        });
      }
      if (queryStr.includes('FROM roadmap_nodes')) {
        return Promise.resolve({
          rows: [
            {
              id: 'en:node-var',
              section_id: 'en:sec-1',
              concept_id: 'concept-var',
              title: 'Variables Node',
              lesson_slug: 'variables-and-types',
              status: 'published',
              display_order: 1,
            },
            {
              id: 'en:node-flow',
              section_id: 'en:sec-1',
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
            { node_id: 'en:node-flow', prerequisite_node_id: 'en:node-var' },
          ],
        });
      }
      return Promise.resolve({ rows: [] });
    });

    const mockPool = { query: mockQuery } as unknown as Pool;
    const dataSource = new DatabaseLearningDataSource(mockPool);

    const roadmapEn = await dataSource.loadRoadmap('php', 'en');
    expect(roadmapEn).not.toBeNull();
    expect(roadmapEn!.language).toBe('php');
    expect(roadmapEn!.title).toBe('PHP Roadmap');
    expect(roadmapEn!.sections.length).toBe(1);
    expect(roadmapEn!.sections[0].id).toBe('sec-1');
    expect(roadmapEn!.sections[0].nodes[0].id).toBe('node-var');
    expect(roadmapEn!.sections[0].nodes[1].prerequisites).toEqual(['node-var']);

    const roadmapVi = await dataSource.loadRoadmap('php', 'vi');
    expect(roadmapVi).not.toBeNull();
    expect(roadmapVi!.title).toBe('Lộ trình PHP');

    // Unknown language or locale returns null
    const roadmapUnknown = await dataSource.loadRoadmap('ruby', 'en');
    expect(roadmapUnknown).toBeNull();
  });

  it('correctly loads and reconstructs lessons and sources filtering by locale', async () => {
    const mockQuery = vi.fn().mockImplementation((queryStr: string, params?: any[]) => {
      if (queryStr.includes('FROM lessons')) {
        const locale = params?.[1];
        if (locale === 'vi') {
          return Promise.resolve({
            rows: [
              {
                id: 'vi:php-variables',
                slug: 'variables-and-types',
                concept_id: 'concept-var',
                language: 'php',
                locale: 'vi',
                title: 'Biến và Hệ thống Kiểu Dữ liệu',
                status: 'published',
                why_it_matters: 'Ý nghĩa tiếng Việt',
                mental_model: 'Mô hình tư duy tiếng Việt',
                code_example: JSON.stringify({ language: 'php', code: '<?php echo 1;' }),
                common_mistakes: 'Lỗi thường gặp tiếng Việt',
                raw_content: 'raw markdown vi',
              },
            ],
          });
        }
        return Promise.resolve({
          rows: [
            {
              id: 'en:php-variables',
              slug: 'variables-and-types',
              concept_id: 'concept-var',
              language: 'php',
              locale: 'en',
              title: 'Variables Title',
              status: 'published',
              why_it_matters: 'Why it matters text',
              mental_model: 'Mental model text',
              code_example: JSON.stringify({ language: 'php', code: '<?php echo 1;' }),
              common_mistakes: 'Common mistakes text',
              raw_content: 'raw markdown en',
            },
          ],
        });
      }
      if (queryStr.includes('FROM sources')) {
        return Promise.resolve({
          rows: [
            { lesson_id: 'en:php-variables', title: 'PHP Docs', url: 'https://php.net' },
          ],
        });
      }
      return Promise.resolve({ rows: [] });
    });

    const mockPool = { query: mockQuery } as unknown as Pool;
    const dataSource = new DatabaseLearningDataSource(mockPool);

    const lessonsEn = await dataSource.loadLessons('php', 'en');
    expect(lessonsEn.length).toBe(1);
    expect(lessonsEn[0].frontmatter.id).toBe('php-variables');
    expect(lessonsEn[0].frontmatter.title).toBe('Variables Title');

    const lessonsVi = await dataSource.loadLessons('php', 'vi');
    expect(lessonsVi.length).toBe(1);
    expect(lessonsVi[0].frontmatter.id).toBe('php-variables');
    expect(lessonsVi[0].frontmatter.title).toBe('Biến và Hệ thống Kiểu Dữ liệu');
  });
});
