import { Pool } from 'pg';
import { loadConcepts, loadRoadmap, loadLessons, getProjectRoot } from './load-content';
import { validateAllContent } from './validate';

export interface SyncResult {
  synced: boolean;
  conceptsCount: number;
  roadmapNodesCount: number;
  lessonsCount: number;
}

export async function syncContentToDatabase(
  databaseUrl: string = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
  rootPath: string = getProjectRoot()
): Promise<SyncResult> {
  const validation = await validateAllContent(rootPath);
  if (!validation.valid) {
    throw new Error(`Cannot sync invalid content: ${validation.errors.join('; ')}`);
  }

  const concepts = loadConcepts(rootPath);
  const phpRoadmap = loadRoadmap('php', rootPath);
  const phpLessons = loadLessons('php', rootPath);

  const pool = new Pool({ connectionString: databaseUrl });
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Ensure table exists for forward-compatibility on older schemas
    await client.query(`
      CREATE TABLE IF NOT EXISTS roadmap_node_prerequisites (
        node_id TEXT NOT NULL REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
        prerequisite_node_id TEXT NOT NULL REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
        PRIMARY KEY (node_id, prerequisite_node_id)
      )
    `);

    // Clean existing read-model state idempotently
    await client.query('DELETE FROM sources');
    await client.query('DELETE FROM concept_relations');
    await client.query('DELETE FROM roadmap_node_prerequisites');
    await client.query('DELETE FROM roadmap_nodes');
    await client.query('DELETE FROM roadmap_sections');
    await client.query('DELETE FROM roadmaps');
    await client.query('DELETE FROM lessons');
    await client.query('DELETE FROM concepts');

    // 1. Insert all concepts first
    for (const c of concepts) {
      await client.query(
        'INSERT INTO concepts (id, slug, title, description) VALUES ($1, $2, $3, $4)',
        [c.id, c.slug, c.title, c.description || null]
      );
    }

    // 1b. Insert concept relations after all concepts exist
    for (const c of concepts) {
      for (const prereq of c.prerequisites || []) {
        await client.query(
          'INSERT INTO concept_relations (concept_id, target_concept_id, relation_type) VALUES ($1, $2, $3)',
          [c.id, prereq, 'prerequisite']
        );
      }
      for (const rel of c.related || []) {
        await client.query(
          'INSERT INTO concept_relations (concept_id, target_concept_id, relation_type) VALUES ($1, $2, $3)',
          [c.id, rel, 'related']
        );
      }
    }

    // 2. Insert roadmaps, sections, nodes
    let totalNodes = 0;
    if (phpRoadmap) {
      const roadmapId = 'roadmap-php';
      await client.query(
        'INSERT INTO roadmaps (id, language, title, description) VALUES ($1, $2, $3, $4)',
        [roadmapId, phpRoadmap.language, phpRoadmap.title, phpRoadmap.description || null]
      );

      for (const section of phpRoadmap.sections) {
        await client.query(
          'INSERT INTO roadmap_sections (id, roadmap_id, title, description, display_order) VALUES ($1, $2, $3, $4, $5)',
          [section.id, roadmapId, section.title, section.description || null, section.order]
        );

        for (const node of section.nodes) {
          totalNodes++;
          await client.query(
            'INSERT INTO roadmap_nodes (id, section_id, concept_id, title, lesson_slug, status, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [node.id, section.id, node.conceptId, node.title, node.lessonSlug || null, node.status, node.order]
          );
        }
      }

      // 2b. Insert node prerequisites after all nodes exist
      for (const section of phpRoadmap.sections) {
        for (const node of section.nodes) {
          for (const prereqNodeId of node.prerequisites || []) {
            await client.query(
              'INSERT INTO roadmap_node_prerequisites (node_id, prerequisite_node_id) VALUES ($1, $2)',
              [node.id, prereqNodeId]
            );
          }
        }
      }
    }

    // 3. Insert lessons and sources
    for (const lesson of phpLessons) {
      await client.query(
        `INSERT INTO lessons (
          id, slug, concept_id, language, title, status, why_it_matters, mental_model, code_example, common_mistakes, raw_content
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          lesson.frontmatter.id,
          lesson.frontmatter.slug,
          lesson.frontmatter.conceptId,
          lesson.frontmatter.language,
          lesson.frontmatter.title,
          lesson.frontmatter.status,
          lesson.whyItMatters,
          lesson.mentalModel,
          JSON.stringify(lesson.codeExample),
          lesson.commonMistakes,
          lesson.rawContent,
        ]
      );

      for (const source of lesson.frontmatter.sources || []) {
        await client.query(
          'INSERT INTO sources (lesson_id, title, url) VALUES ($1, $2, $3)',
          [lesson.frontmatter.id, source.title, source.url]
        );
      }
    }

    await client.query('COMMIT');

    return {
      synced: true,
      conceptsCount: concepts.length,
      roadmapNodesCount: totalNodes,
      lessonsCount: phpLessons.length,
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}
