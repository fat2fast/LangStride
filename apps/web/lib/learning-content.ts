import {
  createLearningRepository,
  type LearningRepository,
  type Roadmap,
  type Lesson,
} from '@langstride/learning';
import { loadConcepts, loadRoadmap, loadLessons, getProjectRoot } from '@langstride/content';

// Instantiate single learning repository backed by domain loader
const repo: LearningRepository = createLearningRepository({
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
});

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
