export type LessonStatus = 'draft' | 'review' | 'published';

export interface LessonSource {
  title: string;
  url: string;
}

export interface LessonFrontmatter {
  id: string;
  slug: string;
  title: string;
  conceptId: string;
  language: string;
  status: LessonStatus;
  sources?: LessonSource[];
}

export interface LessonSection {
  heading: string;
  content: string;
}

export interface Lesson {
  frontmatter: LessonFrontmatter;
  rawContent: string;
  whyItMatters: string;
  mentalModel: string;
  codeExample: {
    language: string;
    code: string;
  };
  commonMistakes: string;
  prerequisiteConcepts?: { id: string; title: string; slug?: string; lessonSlug?: string }[];
  relatedConcepts?: { id: string; title: string; slug?: string; lessonSlug?: string }[];
}
