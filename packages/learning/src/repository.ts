import type { Locale } from './locale';
import type { Concept } from './concept';
import type { Roadmap, RoadmapNode } from './roadmap';
import type { Lesson } from './lesson';

export interface LearningDataSource {
  loadConcepts(locale?: Locale): Promise<Concept[]>;
  loadRoadmap(trackLanguage: string, locale?: Locale): Promise<Roadmap | null>;
  loadLessons(trackLanguage: string, locale?: Locale): Promise<Lesson[]>;
}

export interface LearningRepository {
  getConcepts(locale?: Locale): Promise<Concept[]>;
  getConcept(id: string, locale?: Locale): Promise<Concept | null>;
  getRoadmap(trackLanguage: string, locale?: Locale): Promise<Roadmap | null>;
  getLesson(trackLanguage: string, slug: string, locale?: Locale): Promise<Lesson | null>;
  getRoadmapNodeForLesson(trackLanguage: string, lessonSlug: string, locale?: Locale): Promise<RoadmapNode | null>;
}

export class DefaultLearningRepository implements LearningRepository {
  constructor(private dataSource: LearningDataSource) {}

  async getConcepts(locale: Locale = 'en'): Promise<Concept[]> {
    return this.dataSource.loadConcepts(locale);
  }

  async getConcept(id: string, locale: Locale = 'en'): Promise<Concept | null> {
    const concepts = await this.dataSource.loadConcepts(locale);
    return concepts.find((c) => c.id === id) || null;
  }

  async getRoadmap(trackLanguage: string, locale: Locale = 'en'): Promise<Roadmap | null> {
    return this.dataSource.loadRoadmap(trackLanguage, locale);
  }

  async getLesson(trackLanguage: string, slug: string, locale: Locale = 'en'): Promise<Lesson | null> {
    const lessons = await this.dataSource.loadLessons(trackLanguage, locale);
    const lesson = lessons.find((l) => l.frontmatter.slug === slug);
    if (!lesson) {
      return null;
    }

    // Attach prerequisite and related concept titles/slugs if available
    const concepts = await this.dataSource.loadConcepts(locale);
    const roadmap = await this.dataSource.loadRoadmap(trackLanguage, locale);

    // Map roadmap nodes by conceptId to discover lessonSlugs for concepts
    const conceptToLessonSlug = new Map<string, string>();
    if (roadmap) {
      for (const section of roadmap.sections) {
        for (const node of section.nodes) {
          if (node.status === 'published' && node.lessonSlug) {
            conceptToLessonSlug.set(node.conceptId, node.lessonSlug);
          }
        }
      }
    }

    const currentConcept = concepts.find((c) => c.id === lesson.frontmatter.conceptId);
    if (currentConcept) {
      lesson.prerequisiteConcepts = (currentConcept.prerequisites || []).map((prereqId) => {
        const c = concepts.find((item) => item.id === prereqId);
        return {
          id: prereqId,
          title: c ? c.title : prereqId,
          slug: c?.slug,
          lessonSlug: conceptToLessonSlug.get(prereqId),
        };
      });

      lesson.relatedConcepts = (currentConcept.related || []).map((relId) => {
        const c = concepts.find((item) => item.id === relId);
        return {
          id: relId,
          title: c ? c.title : relId,
          slug: c?.slug,
          lessonSlug: conceptToLessonSlug.get(relId),
        };
      });
    }

    return lesson;
  }

  async getRoadmapNodeForLesson(trackLanguage: string, lessonSlug: string, locale: Locale = 'en'): Promise<RoadmapNode | null> {
    const roadmap = await this.dataSource.loadRoadmap(trackLanguage, locale);
    if (!roadmap) return null;

    for (const section of roadmap.sections) {
      for (const node of section.nodes) {
        if (node.lessonSlug === lessonSlug) {
          return node;
        }
      }
    }
    return null;
  }
}

export function createLearningRepository(dataSource: LearningDataSource): LearningRepository {
  return new DefaultLearningRepository(dataSource);
}
