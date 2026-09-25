import path from 'path';
import { loadConcepts, loadRoadmap, loadLessons, getProjectRoot, type RawParsedLesson } from './load-content';
import type { Concept, Roadmap } from '@langstride/learning';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function detectPrerequisiteCycles(concepts: Concept[]): string[] {
  const errors: string[] = [];
  const conceptMap = new Map<string, Concept>();
  for (const c of concepts) {
    conceptMap.set(c.id, c);
  }

  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfs(conceptId: string, currentPath: string[]): boolean {
    visited.add(conceptId);
    recursionStack.add(conceptId);
    currentPath.push(conceptId);

    const concept = conceptMap.get(conceptId);
    if (concept && concept.prerequisites) {
      for (const prereqId of concept.prerequisites) {
        if (!visited.has(prereqId)) {
          if (dfs(prereqId, currentPath)) {
            return true;
          }
        } else if (recursionStack.has(prereqId)) {
          const cyclePath = [...currentPath, prereqId].join(' -> ');
          errors.push(`Prerequisite cycle detected in concepts: ${cyclePath}`);
          return true;
        }
      }
    }

    recursionStack.delete(conceptId);
    currentPath.pop();
    return false;
  }

  for (const c of concepts) {
    if (!visited.has(c.id)) {
      dfs(c.id, []);
    }
  }

  return errors;
}

export function validateContentData(
  concepts: Concept[],
  roadmaps: { language: string; roadmap: Roadmap | null }[],
  lessonsByLanguage: { language: string; lessons: RawParsedLesson[] }[]
): ValidationResult {
  const errors: string[] = [];

  // 1. Validate Concepts
  const conceptIdSet = new Set<string>();
  const conceptSlugSet = new Set<string>();

  for (const concept of concepts) {
    if (conceptIdSet.has(concept.id)) {
      errors.push(`Duplicate concept ID found: "${concept.id}"`);
    }
    conceptIdSet.add(concept.id);

    if (conceptSlugSet.has(concept.slug)) {
      errors.push(`Duplicate concept slug found: "${concept.slug}"`);
    }
    conceptSlugSet.add(concept.slug);
  }

  for (const concept of concepts) {
    for (const prereq of concept.prerequisites || []) {
      if (!conceptIdSet.has(prereq)) {
        errors.push(`Concept "${concept.id}" references non-existent prerequisite concept "${prereq}"`);
      }
    }
    for (const rel of concept.related || []) {
      if (!conceptIdSet.has(rel)) {
        errors.push(`Concept "${concept.id}" references non-existent related concept "${rel}"`);
      }
    }
  }

  // Detect prerequisite cycles
  const cycleErrors = detectPrerequisiteCycles(concepts);
  errors.push(...cycleErrors);

  // 2. Validate Roadmaps and Lessons per language
  for (const { language, roadmap } of roadmaps) {
    if (!roadmap) {
      errors.push(`Missing roadmap for language "${language}"`);
      continue;
    }

    const langLessons = lessonsByLanguage.find((l) => l.language === language)?.lessons || [];
    const lessonSlugMap = new Map<string, RawParsedLesson>();
    const lessonIdSet = new Set<string>();

    for (const lesson of langLessons) {
      if (lessonIdSet.has(lesson.frontmatter.id)) {
        errors.push(`Duplicate lesson ID "${lesson.frontmatter.id}" in language "${language}"`);
      }
      lessonIdSet.add(lesson.frontmatter.id);

      if (lessonSlugMap.has(lesson.frontmatter.slug)) {
        errors.push(`Duplicate lesson slug "${lesson.frontmatter.slug}" in language "${language}"`);
      }
      lessonSlugMap.set(lesson.frontmatter.slug, lesson);

      // Validate lesson conceptId
      if (!conceptIdSet.has(lesson.frontmatter.conceptId)) {
        errors.push(`Lesson "${lesson.frontmatter.slug}" references non-existent concept "${lesson.frontmatter.conceptId}"`);
      }

      // Validate required sections
      if (!lesson.whyItMatters || lesson.whyItMatters.trim().length === 0) {
        errors.push(`Lesson "${lesson.frontmatter.slug}" is missing mandatory section: "Why it matters"`);
      }
      if (!lesson.mentalModel || lesson.mentalModel.trim().length === 0) {
        errors.push(`Lesson "${lesson.frontmatter.slug}" is missing mandatory section: "Mental model"`);
      }
      if (!lesson.codeExample.code || lesson.codeExample.code.trim().length === 0) {
        errors.push(`Lesson "${lesson.frontmatter.slug}" is missing mandatory section or code block: "Code example"`);
      }
      if (!lesson.commonMistakes || lesson.commonMistakes.trim().length === 0) {
        errors.push(`Lesson "${lesson.frontmatter.slug}" is missing mandatory section: "Common mistakes"`);
      }

      // Validate source references
      for (const source of lesson.frontmatter.sources || []) {
        if (!source.title || !source.url) {
          errors.push(`Lesson "${lesson.frontmatter.slug}" has malformed source reference: missing title or url`);
        }
      }
    }

    const nodeIdSet = new Set<string>();

    for (const section of roadmap.sections) {
      if (!section.title || section.title.trim().length === 0) {
        errors.push(`Section "${section.id}" in roadmap "${language}" must have a non-empty title`);
      }

      for (const node of section.nodes) {
        if (nodeIdSet.has(node.id)) {
          errors.push(`Duplicate node ID "${node.id}" in roadmap "${language}"`);
        }
        nodeIdSet.add(node.id);

        if (!conceptIdSet.has(node.conceptId)) {
          errors.push(`Roadmap node "${node.id}" references non-existent concept "${node.conceptId}"`);
        }

        // Node status check
        if (node.status === 'published') {
          if (!node.lessonSlug) {
            errors.push(`Published roadmap node "${node.id}" is missing required lessonSlug`);
          } else {
            const matchingLesson = lessonSlugMap.get(node.lessonSlug);
            if (!matchingLesson) {
              errors.push(`Published roadmap node "${node.id}" references lesson slug "${node.lessonSlug}" which was not found`);
            } else if (matchingLesson.frontmatter.status !== 'published') {
              errors.push(`Published roadmap node "${node.id}" references lesson "${node.lessonSlug}" which is not published (status: ${matchingLesson.frontmatter.status})`);
            }
          }
        } else if (node.status === 'planned') {
          if (node.lessonSlug) {
            const existingLesson = lessonSlugMap.get(node.lessonSlug);
            if (existingLesson && existingLesson.frontmatter.status === 'published') {
              errors.push(`Planned roadmap node "${node.id}" has a published lesson "${node.lessonSlug}". Planned nodes must not have published lessons.`);
            }
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function validateAllContent(rootPath: string = getProjectRoot()): Promise<ValidationResult> {
  const concepts = loadConcepts(rootPath);
  const phpRoadmap = loadRoadmap('php', rootPath);
  const phpLessons = loadLessons('php', rootPath);

  return validateContentData(
    concepts,
    [{ language: 'php', roadmap: phpRoadmap }],
    [{ language: 'php', lessons: phpLessons }]
  );
}
