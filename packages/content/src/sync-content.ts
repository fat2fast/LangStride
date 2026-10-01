import { Pool } from 'pg';
import { loadConcepts, loadRoadmap, loadLessons, getProjectRoot } from './load-content';
import { validateAllContent } from './validate';
import type { Locale } from '@langstride/learning';

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

  const pool = new Pool({ connectionString: databaseUrl });
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Ensure additive tables and columns exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS roadmap_node_prerequisites (
        node_id TEXT NOT NULL REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
        prerequisite_node_id TEXT NOT NULL REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
        PRIMARY KEY (node_id, prerequisite_node_id)
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS concept_translations (
        concept_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
        locale TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        PRIMARY KEY (concept_id, locale)
      )
    `);

    // Clean existing read-model state idempotently
    await client.query('DELETE FROM sources');
    await client.query('DELETE FROM concept_relations');
    await client.query('DELETE FROM concept_translations');
    await client.query('DELETE FROM roadmap_node_prerequisites');
    await client.query('DELETE FROM roadmap_nodes');
    await client.query('DELETE FROM roadmap_sections');
    await client.query('DELETE FROM roadmaps');
    await client.query('DELETE FROM lessons');
    await client.query('DELETE FROM concepts');

    // 1. Insert canonical concepts (English)
    const conceptsEn = loadConcepts('en', rootPath);
    for (const c of conceptsEn) {
      await client.query(
        'INSERT INTO concepts (id, slug, title, description) VALUES ($1, $2, $3, $4)',
        [c.id, c.slug, c.title, c.description || null]
      );
      await client.query(
        'INSERT INTO concept_translations (concept_id, locale, title, description) VALUES ($1, $2, $3, $4)',
        [c.id, 'en', c.title, c.description || null]
      );
    }

    // 1b. Insert Vietnamese concept translations
    const conceptsVi = loadConcepts('vi', rootPath);
    for (const c of conceptsVi) {
      await client.query(
        `INSERT INTO concept_translations (concept_id, locale, title, description)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (concept_id, locale) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description`,
        [c.id, 'vi', c.title, c.description || null]
      );
    }

    // 1c. Insert concept relations
    for (const c of conceptsEn) {
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

    // 2. Insert roadmaps, sections, nodes for each supported locale
    const supportedLocales: Locale[] = ['en', 'vi'];
    let totalNodes = 0;
    let totalLessons = 0;

    for (const locale of supportedLocales) {
      const phpRoadmap = loadRoadmap('php', locale, rootPath);
      if (phpRoadmap) {
        const roadmapId = `roadmap-php-${locale}`;
        await client.query(
          'INSERT INTO roadmaps (id, language, locale, title, description) VALUES ($1, $2, $3, $4, $5)',
          [roadmapId, 'php', locale, phpRoadmap.title, phpRoadmap.description || null]
        );

        for (const section of phpRoadmap.sections) {
          const secId = `${locale}:${section.id}`;
          await client.query(
            'INSERT INTO roadmap_sections (id, roadmap_id, title, description, display_order) VALUES ($1, $2, $3, $4, $5)',
            [secId, roadmapId, section.title, section.description || null, section.order]
          );

          for (const node of section.nodes) {
            totalNodes++;
            const nodeId = `${locale}:${node.id}`;
            await client.query(
              'INSERT INTO roadmap_nodes (id, section_id, concept_id, title, lesson_slug, status, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7)',
              [nodeId, secId, node.conceptId, node.title, node.lessonSlug || null, node.status, node.order]
            );
          }
        }

        // Insert node prerequisites
        for (const section of phpRoadmap.sections) {
          for (const node of section.nodes) {
            const nodeId = `${locale}:${node.id}`;
            for (const prereqNodeId of node.prerequisites || []) {
              const scopedPrereqId = `${locale}:${prereqNodeId}`;
              await client.query(
                'INSERT INTO roadmap_node_prerequisites (node_id, prerequisite_node_id) VALUES ($1, $2)',
                [nodeId, scopedPrereqId]
              );
            }
          }
        }
      }

      // 3. Insert lessons and sources for this locale
      const phpLessons = loadLessons('php', locale, rootPath);
      totalLessons += phpLessons.length;

      for (const lesson of phpLessons) {
        const lessonId = `${locale}:${lesson.frontmatter.id}`;
        await client.query(
          `INSERT INTO lessons (
            id, slug, concept_id, language, locale, title, status, why_it_matters, mental_model, code_example, common_mistakes, raw_content
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            lessonId,
            lesson.frontmatter.slug,
            lesson.frontmatter.conceptId,
            lesson.frontmatter.language,
            locale,
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
            [lessonId, source.title, source.url]
          );
        }
      }
    }

    await client.query('COMMIT');

    return {
      synced: true,
      conceptsCount: conceptsEn.length,
      roadmapNodesCount: totalNodes,
      lessonsCount: totalLessons,
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}
