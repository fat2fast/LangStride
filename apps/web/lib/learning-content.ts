import {
  createLearningRepository,
  type LearningRepository,
  type Roadmap,
  type Lesson,
  type LearningDataSource,
  type Locale,
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
    loadConcepts: async (locale?: Locale) => loadConcepts(locale || 'en', getProjectRoot()),
    loadRoadmap: async (lang: string, locale?: Locale) => loadRoadmap(lang, locale || 'en', getProjectRoot()),
    loadLessons: async (lang: string, locale?: Locale) => {
      const rawList = loadLessons(lang, locale || 'en', getProjectRoot());
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
    loadConcepts: async (locale?: Locale) => {
      try {
        const concepts = await dbSource.loadConcepts(locale || 'en');
        if (concepts && concepts.length > 0) return concepts;
        return await fileSource.loadConcepts(locale);
      } catch (err: any) {
        console.warn('[learning-content] Failed to load concepts from DB, falling back to files:', err?.message);
        return fileSource.loadConcepts(locale);
      }
    },
    loadRoadmap: async (lang: string, locale?: Locale) => {
      try {
        const roadmap = await dbSource.loadRoadmap(lang, locale || 'en');
        if (roadmap) return roadmap;
        return await fileSource.loadRoadmap(lang, locale);
      } catch (err: any) {
        console.warn(`[learning-content] Failed to load roadmap for ${lang} (${locale}) from DB, falling back to files:`, err?.message);
        return fileSource.loadRoadmap(lang, locale);
      }
    },
    loadLessons: async (lang: string, locale?: Locale) => {
      try {
        const lessons = await dbSource.loadLessons(lang, locale || 'en');
        if (lessons && lessons.length > 0) return lessons;
        return await fileSource.loadLessons(lang, locale);
      } catch (err: any) {
        console.warn(`[learning-content] Failed to load lessons for ${lang} (${locale}) from DB, falling back to files:`, err?.message);
        return fileSource.loadLessons(lang, locale);
      }
    },
  };
}

// Instantiate single learning repository backed by domain data source
const repo: LearningRepository = createLearningRepository(createConfiguredLearningDataSource());

export async function getPhpRoadmap(locale: Locale = 'en'): Promise<Roadmap | null> {
  return repo.getRoadmap('php', locale);
}

export async function getPhpLesson(slug: string, locale: Locale = 'en'): Promise<Lesson | null> {
  const lesson = await repo.getLesson('php', slug, locale);
  if (!lesson || lesson.frontmatter.status !== 'published') {
    return null;
  }
  return lesson;
}

export async function getRoadmapNodeForSlug(slug: string, locale: Locale = 'en') {
  return repo.getRoadmapNodeForLesson('php', slug, locale);
}
