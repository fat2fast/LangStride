import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ConceptSchema, ConceptsFileSchema, RoadmapFileSchema, LessonFrontmatterSchema } from './schemas';
import type { Concept, Roadmap, Lesson, LessonFrontmatter } from '@langstride/learning';

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

export function loadConcepts(rootPath: string = getProjectRoot()): Concept[] {
  const filePath = path.join(rootPath, 'content', 'knowledge', 'concepts.json');
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  return ConceptsFileSchema.parse(data) as Concept[];
}

export function loadRoadmap(language: string, rootPath: string = getProjectRoot()): Roadmap | null {
  const filePath = path.join(rootPath, 'roadmaps', `${language}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  return RoadmapFileSchema.parse(data) as Roadmap;
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

export function parseLessonContent(rawFileContent: string, filePath: string = ''): RawParsedLesson {
  const parsed = matter(rawFileContent);
  const frontmatter = LessonFrontmatterSchema.parse(parsed.data) as LessonFrontmatter;
  const content = parsed.content;

  // Extract sections by markdown H2 headings
  const whyItMatters = extractSection(content, 'Why it matters');
  const mentalModel = extractSection(content, 'Mental model');
  const codeSection = extractSection(content, 'Code example');
  const commonMistakes = extractSection(content, 'Common mistakes');

  // Extract language and code snippet from code example section
  const codeBlockMatch = codeSection.match(/```(\w+)?\n([\s\S]*?)```/);
  const codeExample = {
    language: codeBlockMatch ? codeBlockMatch[1] || frontmatter.language : frontmatter.language,
    code: codeBlockMatch ? codeBlockMatch[2].trim() : '',
  };

  return {
    frontmatter,
    rawContent: content,
    whyItMatters: whyItMatters.trim(),
    mentalModel: mentalModel.trim(),
    codeExample,
    commonMistakes: commonMistakes.trim(),
    filePath,
  };
}

function extractSection(content: string, headingTitle: string): string {
  const lines = content.split(/\r?\n/);
  let capturing = false;
  const capturedLines: string[] = [];
  const targetHeading = `## ${headingTitle.toLowerCase()}`;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().startsWith('## ')) {
      if (trimmed.toLowerCase() === targetHeading) {
        capturing = true;
        continue;
      } else if (capturing) {
        break;
      }
    }
    if (capturing) {
      capturedLines.push(line);
    }
  }

  return capturedLines.join('\n').trim();
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function loadLessons(language: string, rootPath: string = getProjectRoot()): RawParsedLesson[] {
  const lessonsDir = path.join(rootPath, 'content', 'programming', language, 'lessons');
  if (!fs.existsSync(lessonsDir)) {
    return [];
  }

  const files = fs.readdirSync(lessonsDir).filter((f) => f.endsWith('.md'));
  const lessons: RawParsedLesson[] = [];

  for (const file of files) {
    const fullPath = path.join(lessonsDir, file);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    lessons.push(parseLessonContent(raw, fullPath));
  }

  return lessons;
}
