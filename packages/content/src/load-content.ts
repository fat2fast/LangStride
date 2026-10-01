import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ConceptSchema, ConceptsFileSchema, RoadmapFileSchema, LessonFrontmatterSchema } from './schemas';
import type { Concept, Roadmap, LessonFrontmatter, Locale } from '@langstride/learning';

export function getProjectRoot(): string {
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

function resolveLocaleAndRoot(
  localeOrRoot: Locale | string = 'en',
  maybeRootPath?: string
): { locale: Locale; rootPath: string } {
  if (localeOrRoot === 'en' || localeOrRoot === 'vi') {
    return {
      locale: localeOrRoot,
      rootPath: maybeRootPath || getProjectRoot(),
    };
  }
  return {
    locale: 'en',
    rootPath: localeOrRoot || getProjectRoot(),
  };
}

export function loadConcepts(
  localeOrRoot: Locale | string = 'en',
  maybeRootPath?: string
): Concept[] {
  const { locale, rootPath } = resolveLocaleAndRoot(localeOrRoot, maybeRootPath);

  // 1. Try localized path: content/locales/{locale}/knowledge/concepts.json
  const localizedPath = path.join(rootPath, 'content', 'locales', locale, 'knowledge', 'concepts.json');
  if (fs.existsSync(localizedPath)) {
    const raw = fs.readFileSync(localizedPath, 'utf-8');
    const data = JSON.parse(raw);
    return ConceptsFileSchema.parse(data) as Concept[];
  }

  // 2. Legacy fallback for English only
  if (locale === 'en') {
    const legacyPath = path.join(rootPath, 'content', 'knowledge', 'concepts.json');
    if (fs.existsSync(legacyPath)) {
      const raw = fs.readFileSync(legacyPath, 'utf-8');
      const data = JSON.parse(raw);
      return ConceptsFileSchema.parse(data) as Concept[];
    }
  }

  return [];
}

export function loadRoadmap(
  language: string,
  localeOrRoot: Locale | string = 'en',
  maybeRootPath?: string
): Roadmap | null {
  const { locale, rootPath } = resolveLocaleAndRoot(localeOrRoot, maybeRootPath);

  // 1. Try localized path: content/locales/{locale}/roadmaps/{language}.json
  const localizedPath = path.join(rootPath, 'content', 'locales', locale, 'roadmaps', `${language}.json`);
  if (fs.existsSync(localizedPath)) {
    const raw = fs.readFileSync(localizedPath, 'utf-8');
    const data = JSON.parse(raw);
    return RoadmapFileSchema.parse(data) as Roadmap;
  }

  // 2. Legacy fallback for English only
  if (locale === 'en') {
    const legacyPath = path.join(rootPath, 'roadmaps', `${language}.json`);
    if (fs.existsSync(legacyPath)) {
      const raw = fs.readFileSync(legacyPath, 'utf-8');
      const data = JSON.parse(raw);
      return RoadmapFileSchema.parse(data) as Roadmap;
    }
  }

  return null;
}

export interface RawParsedLesson {
  frontmatter: LessonFrontmatter;
  rawContent: string;
  whyItMatters: string;
  mentalModel: string;
  codeExample: {
    language: string;
    code: string;
  };
  commonMistakes: string;
  filePath: string;
}

const SECTION_ALIASES: Record<string, string[]> = {
  whyItMatters: ['why it matters', 'vì sao điều này quan trọng', 'ý nghĩa thực tế'],
  mentalModel: ['mental model', 'mô hình tư duy', 'mô hình tư duy / minh họa trực quan'],
  codeExample: ['code example', 'ví dụ mã nguồn', 'ví dụ code'],
  commonMistakes: ['common mistakes', 'các lỗi thường gặp', 'lỗi thường gặp'],
};

export function parseLessonContent(rawFileContent: string, filePath: string = ''): RawParsedLesson {
  const parsed = matter(rawFileContent);
  const frontmatter = LessonFrontmatterSchema.parse(parsed.data) as LessonFrontmatter;
  const content = parsed.content;

  // Extract sections by markdown H2 headings with alias mapping
  const sections = extractCanonicalSections(content);

  const codeSection = sections.codeExample || '';
  const codeBlockMatch = codeSection.match(/```(\w+)?\n([\s\S]*?)```/);
  const codeExample = {
    language: codeBlockMatch ? codeBlockMatch[1] || frontmatter.language : frontmatter.language,
    code: codeBlockMatch ? codeBlockMatch[2].trim() : '',
  };

  return {
    frontmatter,
    rawContent: content,
    whyItMatters: (sections.whyItMatters || '').trim(),
    mentalModel: (sections.mentalModel || '').trim(),
    codeExample,
    commonMistakes: (sections.commonMistakes || '').trim(),
    filePath,
  };
}

function matchSectionHeading(headingText: string): string | null {
  const normalized = headingText.trim().toLowerCase();
  for (const [canonicalName, aliases] of Object.entries(SECTION_ALIASES)) {
    if (aliases.some((alias) => normalized === alias || normalized.startsWith(alias))) {
      return canonicalName;
    }
  }
  return null;
}

function extractCanonicalSections(content: string): Record<string, string> {
  const lines = content.split(/\r?\n/);
  const captured: Record<string, string[]> = {
    whyItMatters: [],
    mentalModel: [],
    codeExample: [],
    commonMistakes: [],
  };

  let currentKey: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace(/^##\s+/, '');
      const matchedKey = matchSectionHeading(headingText);
      currentKey = matchedKey;
      continue;
    }

    if (currentKey && captured[currentKey]) {
      captured[currentKey].push(line);
    }
  }

  const result: Record<string, string> = {};
  for (const [key, lineArr] of Object.entries(captured)) {
    result[key] = lineArr.join('\n').trim();
  }
  return result;
}

export function loadLessons(
  language: string,
  localeOrRoot: Locale | string = 'en',
  maybeRootPath?: string
): RawParsedLesson[] {
  const { locale, rootPath } = resolveLocaleAndRoot(localeOrRoot, maybeRootPath);

  // 1. Try localized path: content/locales/{locale}/programming/{language}/lessons
  const localizedDir = path.join(rootPath, 'content', 'locales', locale, 'programming', language, 'lessons');
  if (fs.existsSync(localizedDir)) {
    const files = fs.readdirSync(localizedDir).filter((f) => f.endsWith('.md'));
    const lessons: RawParsedLesson[] = [];
    for (const file of files) {
      const fullPath = path.join(localizedDir, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      lessons.push(parseLessonContent(raw, fullPath));
    }
    return lessons;
  }

  // 2. Legacy fallback for English only
  if (locale === 'en') {
    const legacyDir = path.join(rootPath, 'content', 'programming', language, 'lessons');
    if (fs.existsSync(legacyDir)) {
      const files = fs.readdirSync(legacyDir).filter((f) => f.endsWith('.md'));
      const lessons: RawParsedLesson[] = [];
      for (const file of files) {
        const fullPath = path.join(legacyDir, file);
        const raw = fs.readFileSync(fullPath, 'utf-8');
        lessons.push(parseLessonContent(raw, fullPath));
      }
      return lessons;
    }
  }

  return [];
}
