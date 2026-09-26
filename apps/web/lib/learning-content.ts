import {
  createLearningRepository,
  type LearningRepository,
  type Roadmap,
  type Lesson,
  type LearningDataSource,
} from '@langstride/learning';
import {
  loadConcepts,
  loadRoadmap,
  loadLessons,
  getProjectRoot,
  createDatabaseLearningDataSource,
} from '@langstride/content';

export function createConfiguredLearningDataSource(): LearningDataSource {
  const fileSource: LearningDataSource = {
    loadConcepts: async () => loadConcepts(getProjectRoot()),
    loadRoadmap: async (lang: string) => loadRoadmap(lang, getProjectRoot()),
    loadLessons: async (lang: string) => {
      const rawList = loadLessons(lang, getProjectRoot());
      return rawList.map((r) => ({
        frontmatter: r.frontmatter,
        rawContent: r.rawContent,
        whyItMatters: r.whyItMatters,
        mentalModel: r.mentalModel,
        codeExample: r.codeExample,
        commonMistakes: r.commonMistakes,
      }));
    },
  };

  const useDb = (process.env.USE_DB_READ_MODEL === 'true' || (process.env.USE_DB_READ_MODEL !== 'false' && Boolean(process.env.DATABASE_URL))) && Boolean(process.env.DATABASE_URL);

  if (!useDb || !process.env.DATABASE_URL) {
    return fileSource;
  }

  const dbSource = createDatabaseLearningDataSource(process.env.DATABASE_URL);

  return {
    loadConcepts: async () => {
      try {
        const concepts = await dbSource.loadConcepts();
        if (concepts && concepts.length > 0) return concepts;
        return await fileSource.loadConcepts();
      } catch (err: any) {
        console.warn('[learning-content] Failed to load concepts from DB, falling back to files:', err?.message);
        return fileSource.loadConcepts();
      }
    },
    loadRoadmap: async (lang: string) => {
      try {
        const roadmap = await dbSource.loadRoadmap(lang);
        if (roadmap) return roadmap;
        return await fileSource.loadRoadmap(lang);
      } catch (err: any) {
        console.warn(`[learning-content] Failed to load roadmap for ${lang} from DB, falling back to files:`, err?.message);
        return fileSource.loadRoadmap(lang);
      }
    },
    loadLessons: async (lang: string) => {
      try {
        const lessons = await dbSource.loadLessons(lang);
        if (lessons && lessons.length > 0) return lessons;
        return await fileSource.loadLessons(lang);
      } catch (err: any) {
        console.warn(`[learning-content] Failed to load lessons for ${lang} from DB, falling back to files:`, err?.message);
        return fileSource.loadLessons(lang);
      }
    },
  };
}

// Instantiate single learning repository backed by domain data source
const repo: LearningRepository = createLearningRepository(createConfiguredLearningDataSource());

export async function getPhpRoadmap(): Promise<Roadmap | null> {
  return repo.getRoadmap('php');
}

export async function getPhpLesson(slug: string): Promise<Lesson | null> {
  const lesson = await repo.getLesson('php', slug);
  if (!lesson || lesson.frontmatter.status !== 'published') {
    return null;
  }
  return lesson;
}

export async function getRoadmapNodeForSlug(slug: string) {
  return repo.getRoadmapNodeForLesson('php', slug);
}
