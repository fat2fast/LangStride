import { Pool } from 'pg';
import type { Concept, Roadmap, Lesson, LearningDataSource, RoadmapSection, RoadmapNode } from '@langstride/learning';

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

  async loadConcepts(): Promise<Concept[]> {
    const conceptsRes = await this.pool.query(
      'SELECT id, slug, title, description FROM concepts ORDER BY id ASC'
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

  async loadRoadmap(language: string): Promise<Roadmap | null> {
    const roadmapRes = await this.pool.query(
      'SELECT id, language, title, description FROM roadmaps WHERE language = $1',
      [language]
    );

    if (roadmapRes.rows.length === 0) {
      return null;
    }

    const roadmapRow = roadmapRes.rows[0];
    const sectionsRes = await this.pool.query(
      'SELECT id, title, description, display_order FROM roadmap_sections WHERE roadmap_id = $1 ORDER BY display_order ASC',
      [roadmapRow.id]
    );

    if (sectionsRes.rows.length === 0) {
      return {
        language: roadmapRow.language,
        title: roadmapRow.title,
        description: roadmapRow.description || undefined,
        sections: [],
      };
    }

    const sectionIds = sectionsRes.rows.map((s) => s.id);
    const nodesRes = await this.pool.query(
      'SELECT id, section_id, concept_id, title, lesson_slug, status, display_order FROM roadmap_nodes WHERE section_id = ANY($1) ORDER BY display_order ASC',
      [sectionIds]
    );

    const nodeIds = nodesRes.rows.map((n) => n.id);
    let prereqMap = new Map<string, string[]>();

    if (nodeIds.length > 0) {
      try {
        const prereqsRes = await this.pool.query(
          'SELECT node_id, prerequisite_node_id FROM roadmap_node_prerequisites WHERE node_id = ANY($1)',
          [nodeIds]
        );
        for (const row of prereqsRes.rows) {
          const list = prereqMap.get(row.node_id) || [];
          list.push(row.prerequisite_node_id);
          prereqMap.set(row.node_id, list);
        }
      } catch (err: any) {
        // Fallback gracefully if roadmap_node_prerequisites table has not been migrated yet on legacy local DB
        if (err?.code !== '42P01') {
          throw err;
        }
      }
    }

    const nodesBySection = new Map<string, RoadmapNode[]>();
    for (const row of nodesRes.rows) {
      const list = nodesBySection.get(row.section_id) || [];
      list.push({
        id: row.id,
        conceptId: row.concept_id,
        title: row.title,
        lessonSlug: row.lesson_slug || undefined,
        status: row.status,
        order: row.display_order,
        prerequisites: prereqMap.get(row.id) || [],
      });
      nodesBySection.set(row.section_id, list);
    }

    const sections: RoadmapSection[] = sectionsRes.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description || undefined,
      order: row.display_order,
      nodes: nodesBySection.get(row.id) || [],
    }));

    return {
      language: roadmapRow.language,
      title: roadmapRow.title,
      description: roadmapRow.description || undefined,
      sections,
    };
  }

  async loadLessons(language: string): Promise<Lesson[]> {
    const lessonsRes = await this.pool.query(
      'SELECT id, slug, concept_id, language, title, status, why_it_matters, mental_model, code_example, common_mistakes, raw_content FROM lessons WHERE language = $1',
      [language]
    );

    if (lessonsRes.rows.length === 0) {
      return [];
    }

    const lessonIds = lessonsRes.rows.map((l) => l.id);
    const sourcesRes = await this.pool.query(
      'SELECT lesson_id, title, url FROM sources WHERE lesson_id = ANY($1)',
      [lessonIds]
    );

    const sourcesByLesson = new Map<string, { title: string; url: string }[]>();
    for (const s of sourcesRes.rows) {
      const list = sourcesByLesson.get(s.lesson_id) || [];
      list.push({ title: s.title, url: s.url });
      sourcesByLesson.set(s.lesson_id, list);
    }

    return lessonsRes.rows.map((row) => {
      const parsedCode = typeof row.code_example === 'string'
        ? JSON.parse(row.code_example)
        : row.code_example;

      return {
        frontmatter: {
          id: row.id,
          slug: row.slug,
          conceptId: row.concept_id,
          language: row.language,
          title: row.title,
          status: row.status,
          sources: sourcesByLesson.get(row.id) || [],
        },
        rawContent: row.raw_content,
        whyItMatters: row.why_it_matters,
        mentalModel: row.mental_model,
        codeExample: parsedCode,
        commonMistakes: row.common_mistakes,
      };
    });
  }
}

export function createDatabaseLearningDataSource(poolOrUrl: Pool | string): DatabaseLearningDataSource {
  return new DatabaseLearningDataSource(poolOrUrl);
}
