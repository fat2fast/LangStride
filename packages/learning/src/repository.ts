import type { Concept } from './concept';
import type { Roadmap, RoadmapNode } from './roadmap';
import type { Lesson } from './lesson';

export interface LearningDataSource {
  loadConcepts(): Promise<Concept[]>;
  loadRoadmap(language: string): Promise<Roadmap | null>;
  loadLessons(language: string): Promise<Lesson[]>;
}

export interface LearningRepository {
  getConcepts(): Promise<Concept[]>;
  getConcept(id: string): Promise<Concept | null>;
  getRoadmap(language: string): Promise<Roadmap | null>;
  getLesson(language: string, slug: string): Promise<Lesson | null>;
  getRoadmapNodeForLesson(language: string, lessonSlug: string): Promise<RoadmapNode | null>;
}

export class DefaultLearningRepository implements LearningRepository {
  constructor(private dataSource: LearningDataSource) {}

  async getConcepts(): Promise<Concept[]> {
    return this.dataSource.loadConcepts();
  }

  async getConcept(id: string): Promise<Concept | null> {
    const concepts = await this.dataSource.loadConcepts();
    return concepts.find((c) => c.id === id) || null;
  }

  async getRoadmap(language: string): Promise<Roadmap | null> {
    return this.dataSource.loadRoadmap(language);
  }

  async getLesson(language: string, slug: string): Promise<Lesson | null> {
    const lessons = await this.dataSource.loadLessons(language);
    const lesson = lessons.find((l) => l.frontmatter.slug === slug);
    if (!lesson) {
      return null;
    }

    // Attach prerequisite and related concept titles/slugs if available
    const concepts = await this.dataSource.loadConcepts();
    const roadmap = await this.dataSource.loadRoadmap(language);

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

  async getRoadmapNodeForLesson(language: string, lessonSlug: string): Promise<RoadmapNode | null> {
    const roadmap = await this.dataSource.loadRoadmap(language);
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
