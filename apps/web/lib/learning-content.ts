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
  if (process.env.USE_DB_READ_MODEL === 'true' && process.env.DATABASE_URL) {
    return createDatabaseLearningDataSource(process.env.DATABASE_URL);
  }

  return {
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
