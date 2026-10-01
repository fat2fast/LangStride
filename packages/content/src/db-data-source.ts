import { Pool } from 'pg';
import type { Concept, Roadmap, Lesson, LearningDataSource, RoadmapSection, RoadmapNode, Locale } from '@langstride/learning';

export class DatabaseLearningDataSource implements LearningDataSource {
  private pool: Pool;
  private shouldClosePool = false;

  constructor(poolOrUrl: Pool | string) {
    if (typeof poolOrUrl === 'string') {
      this.pool = new Pool({ connectionString: poolOrUrl });
      this.shouldClosePool = true;
    } else {
      this.pool = poolOrUrl;
    }
  }

  async close(): Promise<void> {
    if (this.shouldClosePool) {
      await this.pool.end();
    }
  }

  async loadConcepts(locale: Locale = 'en'): Promise<Concept[]> {
    const conceptsRes = await this.pool.query(
      `SELECT c.id, c.slug,
              COALESCE(ct.title, c.title) AS title,
              COALESCE(ct.description, c.description) AS description
       FROM concepts c
       LEFT JOIN concept_translations ct ON c.id = ct.concept_id AND ct.locale = $1
       ORDER BY c.id ASC`,
      [locale]
    );
    const relationsRes = await this.pool.query(
      'SELECT concept_id, target_concept_id, relation_type FROM concept_relations'
    );

    const prereqMap = new Map<string, string[]>();
    const relatedMap = new Map<string, string[]>();

    for (const row of relationsRes.rows) {
      if (row.relation_type === 'prerequisite') {
        const list = prereqMap.get(row.concept_id) || [];
        list.push(row.target_concept_id);
        prereqMap.set(row.concept_id, list);
      } else if (row.relation_type === 'related') {
        const list = relatedMap.get(row.concept_id) || [];
        list.push(row.target_concept_id);
        relatedMap.set(row.concept_id, list);
      }
    }

    return conceptsRes.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description || undefined,
      prerequisites: prereqMap.get(row.id) || [],
      related: relatedMap.get(row.id) || [],
    }));
  }

  async loadRoadmap(language: string, locale: Locale = 'en'): Promise<Roadmap | null> {
    const roadmapRes = await this.pool.query(
      'SELECT id, language, title, description FROM roadmaps WHERE language = $1 AND locale = $2',
      [language, locale]
    );

    if (roadmapRes.rows.length === 0) {
      return null;
    }

    const roadmapRow = roadmapRes.rows[0];

    const sectionsRes = await this.pool.query(
      'SELECT id, title, description, display_order FROM roadmap_sections WHERE roadmap_id = $1 ORDER BY display_order ASC',
      [roadmapRow.id]
    );

    const sections: RoadmapSection[] = [];

    for (const sRow of sectionsRes.rows) {
      const nodesRes = await this.pool.query(
        'SELECT id, concept_id, title, lesson_slug, status, display_order FROM roadmap_nodes WHERE section_id = $1 ORDER BY display_order ASC',
        [sRow.id]
      );

      const sectionNodes: RoadmapNode[] = [];

      for (const nRow of nodesRes.rows) {
        const prereqRes = await this.pool.query(
          'SELECT prerequisite_node_id FROM roadmap_node_prerequisites WHERE node_id = $1',
          [nRow.id]
        );
        const prereqs = prereqRes.rows.map((r) => r.prerequisite_node_id.replace(/^(en|vi):/, ''));

        sectionNodes.push({
          id: nRow.id.replace(/^(en|vi):/, ''),
          conceptId: nRow.concept_id,
          title: nRow.title,
          lessonSlug: nRow.lesson_slug || undefined,
          status: nRow.status as RoadmapNode['status'],
          order: nRow.display_order,
          prerequisites: prereqs.length > 0 ? prereqs : undefined,
        });
      }

      sections.push({
        id: sRow.id.replace(/^(en|vi):/, ''),
        title: sRow.title,
        description: sRow.description || undefined,
        order: sRow.display_order,
        nodes: sectionNodes,
      });
    }

    return {
      language: roadmapRow.language,
      title: roadmapRow.title,
      description: roadmapRow.description || undefined,
      sections,
    };
  }

  async loadLessons(language: string, locale: Locale = 'en'): Promise<Lesson[]> {
    const lessonsRes = await this.pool.query(
      `SELECT id, slug, concept_id, language, title, status, why_it_matters, mental_model, code_example, common_mistakes, raw_content
       FROM lessons
       WHERE language = $1 AND locale = $2
       ORDER BY id ASC`,
      [language, locale]
    );

    const lessons: Lesson[] = [];

    for (const row of lessonsRes.rows) {
      const sourcesRes = await this.pool.query(
        'SELECT title, url FROM sources WHERE lesson_id = $1 ORDER BY id ASC',
        [row.id]
      );

      const sources = sourcesRes.rows.map((s) => ({
        title: s.title,
        url: s.url,
      }));

      const codeExample = typeof row.code_example === 'string'
        ? JSON.parse(row.code_example)
        : row.code_example;

      lessons.push({
        frontmatter: {
          id: row.id.replace(/^(en|vi):/, ''),
          slug: row.slug,
          title: row.title,
          conceptId: row.concept_id,
          language: row.language,
          status: row.status,
          sources: sources.length > 0 ? sources : undefined,
        },
        rawContent: row.raw_content,
        whyItMatters: row.why_it_matters,
        mentalModel: row.mental_model,
        codeExample,
        commonMistakes: row.common_mistakes,
      });
    }

    return lessons;
  }
}

export function createDatabaseLearningDataSource(poolOrUrl: Pool | string): DatabaseLearningDataSource {
  return new DatabaseLearningDataSource(poolOrUrl);
}
