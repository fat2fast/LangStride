import path from 'path';
import { loadConcepts, loadRoadmap, loadLessons, getProjectRoot, type RawParsedLesson } from './load-content';
import type { Concept, Roadmap, RoadmapNode, Locale } from '@langstride/learning';

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

export function detectRoadmapNodeCycles(roadmap: Roadmap): string[] {
  const errors: string[] = [];
  const nodeMap = new Map<string, RoadmapNode>();
  for (const section of roadmap.sections) {
    for (const node of section.nodes) {
      nodeMap.set(node.id, node);
    }
  }

  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfs(nodeId: string, currentPath: string[]): boolean {
    visited.add(nodeId);
    recursionStack.add(nodeId);
    currentPath.push(nodeId);

    const node = nodeMap.get(nodeId);
    if (node && node.prerequisites) {
      for (const prereqId of node.prerequisites) {
        if (!visited.has(prereqId)) {
          if (dfs(prereqId, currentPath)) {
            return true;
          }
        } else if (recursionStack.has(prereqId)) {
          const cyclePath = [...currentPath, prereqId].join(' -> ');
          errors.push(`Prerequisite cycle detected in roadmap nodes for "${roadmap.language}": ${cyclePath}`);
          return true;
        }
      }
    }

    recursionStack.delete(nodeId);
    currentPath.pop();
    return false;
  }

  for (const section of roadmap.sections) {
    for (const node of section.nodes) {
      if (!visited.has(node.id)) {
        dfs(node.id, []);
      }
    }
  }

  return errors;
}

export function validateContentData(
  concepts: Concept[],
  roadmaps: { language: string; roadmap: Roadmap | null }[],
  lessonsByLanguage: { language: string; lessons: RawParsedLesson[] }[],
  locale: Locale = 'en'
): ValidationResult {
  const errors: string[] = [];

  // 1. Validate Concepts
  const conceptIdSet = new Set<string>();
  const conceptSlugSet = new Set<string>();

  for (const concept of concepts) {
    if (conceptIdSet.has(concept.id)) {
      errors.push(`[${locale}] Duplicate concept ID found: "${concept.id}"`);
    }
    conceptIdSet.add(concept.id);

    if (conceptSlugSet.has(concept.slug)) {
      errors.push(`[${locale}] Duplicate concept slug found: "${concept.slug}"`);
    }
    conceptSlugSet.add(concept.slug);
  }

  for (const concept of concepts) {
    for (const prereq of concept.prerequisites || []) {
      if (!conceptIdSet.has(prereq)) {
        errors.push(`[${locale}] Concept "${concept.id}" references non-existent prerequisite concept "${prereq}"`);
      }
    }
    for (const rel of concept.related || []) {
      if (!conceptIdSet.has(rel)) {
        errors.push(`[${locale}] Concept "${concept.id}" references non-existent related concept "${rel}"`);
      }
    }
  }

  // Detect prerequisite cycles in concepts
  const cycleErrors = detectPrerequisiteCycles(concepts);
  for (const err of cycleErrors) {
    errors.push(`[${locale}] ${err}`);
  }

  // 2. Validate Roadmaps and Lessons per language
  for (const { language, roadmap } of roadmaps) {
    if (!roadmap) {
      errors.push(`[${locale}] Missing roadmap for language "${language}"`);
      continue;
    }

    if (roadmap.language !== language) {
      errors.push(`[${locale}] Roadmap declared language "${roadmap.language}" does not match expected collection language "${language}"`);
    }

    const langLessons = lessonsByLanguage.find((l) => l.language === language)?.lessons || [];
    const lessonSlugMap = new Map<string, RawParsedLesson>();
    const lessonIdSet = new Set<string>();

    for (const lesson of langLessons) {
      const locPrefix = `[${locale}] ${lesson.filePath ? `(${lesson.filePath}) ` : ''}`;

      if (lessonIdSet.has(lesson.frontmatter.id)) {
        errors.push(`${locPrefix}Duplicate lesson ID "${lesson.frontmatter.id}" in language "${language}"`);
      }
      lessonIdSet.add(lesson.frontmatter.id);

      if (lessonSlugMap.has(lesson.frontmatter.slug)) {
        errors.push(`${locPrefix}Duplicate lesson slug "${lesson.frontmatter.slug}" in language "${language}"`);
      }
      lessonSlugMap.set(lesson.frontmatter.slug, lesson);

      // Validate lesson conceptId
      if (!conceptIdSet.has(lesson.frontmatter.conceptId)) {
        errors.push(`${locPrefix}Lesson "${lesson.frontmatter.slug}" references non-existent concept "${lesson.frontmatter.conceptId}"`);
      }

      // Validate lesson language matches roadmap language
      if (lesson.frontmatter.language !== language) {
        errors.push(`${locPrefix}Lesson "${lesson.frontmatter.slug}" has language "${lesson.frontmatter.language}" which does not match expected language "${language}"`);
      }

      // Validate code example language matches roadmap language
      if (lesson.codeExample.language !== language) {
        errors.push(`${locPrefix}Lesson "${lesson.frontmatter.slug}" code example has language "${lesson.codeExample.language}" which does not match expected language "${language}"`);
      }

      // Validate mandatory sections
      if (!lesson.whyItMatters || lesson.whyItMatters.trim().length === 0) {
        errors.push(`${locPrefix}Lesson "${lesson.frontmatter.slug}" is missing mandatory section: "Why it matters"`);
      }
      if (!lesson.mentalModel || lesson.mentalModel.trim().length === 0) {
        errors.push(`${locPrefix}Lesson "${lesson.frontmatter.slug}" is missing mandatory section: "Mental model"`);
      }
      if (!lesson.codeExample.code || lesson.codeExample.code.trim().length === 0) {
        errors.push(`${locPrefix}Lesson "${lesson.frontmatter.slug}" is missing mandatory section or code block: "Code example"`);
      }
      if (!lesson.commonMistakes || lesson.commonMistakes.trim().length === 0) {
        errors.push(`${locPrefix}Lesson "${lesson.frontmatter.slug}" is missing mandatory section: "Common mistakes"`);
      }

      // Published lesson must have non-empty sources
      if (lesson.frontmatter.status === 'published') {
        if (!lesson.frontmatter.sources || lesson.frontmatter.sources.length === 0) {
          errors.push(`${locPrefix}Published lesson "${lesson.frontmatter.slug}" must have at least one authoritative source reference`);
        }
      }

      // Validate source references
      for (const source of lesson.frontmatter.sources || []) {
        if (!source.title || !source.url) {
          errors.push(`${locPrefix}Lesson "${lesson.frontmatter.slug}" has malformed source reference: missing title or url`);
        }
      }
    }

    // Validate Sections: unique IDs and non-empty titles
    const sectionIdSet = new Set<string>();
    for (const section of roadmap.sections) {
      if (sectionIdSet.has(section.id)) {
        errors.push(`[${locale}] Duplicate section ID "${section.id}" in roadmap "${language}"`);
      }
      sectionIdSet.add(section.id);

      if (!section.title || section.title.trim().length === 0) {
        errors.push(`[${locale}] Section "${section.id}" in roadmap "${language}" must have a non-empty title`);
      }
    }

    // Collect all node IDs in roadmap
    const nodeIdSet = new Set<string>();
    for (const section of roadmap.sections) {
      for (const node of section.nodes) {
        if (nodeIdSet.has(node.id)) {
          errors.push(`[${locale}] Duplicate node ID "${node.id}" in roadmap "${language}"`);
        }
        nodeIdSet.add(node.id);
      }
    }

    // Validate nodes, prerequisites, concept identity and lesson alignment
    for (const section of roadmap.sections) {
      for (const node of section.nodes) {
        if (!conceptIdSet.has(node.conceptId)) {
          errors.push(`[${locale}] Roadmap node "${node.id}" references non-existent concept "${node.conceptId}"`);
        }

        // Validate node prerequisites reference existing nodes
        for (const prereqNodeId of node.prerequisites || []) {
          if (!nodeIdSet.has(prereqNodeId)) {
            errors.push(`[${locale}] Roadmap node "${node.id}" references non-existent prerequisite node "${prereqNodeId}"`);
          }
        }

        // Node status check
        if (node.status === 'published') {
          if (!node.lessonSlug) {
            errors.push(`[${locale}] Published roadmap node "${node.id}" is missing required lessonSlug`);
          } else {
            const matchingLesson = lessonSlugMap.get(node.lessonSlug);
            if (!matchingLesson) {
              errors.push(`[${locale}] Published roadmap node "${node.id}" references lesson slug "${node.lessonSlug}" which was not found`);
            } else {
              if (matchingLesson.frontmatter.status !== 'published') {
                errors.push(`[${locale}] Published roadmap node "${node.id}" references lesson "${node.lessonSlug}" which is not published (status: ${matchingLesson.frontmatter.status})`);
              }
              if (matchingLesson.frontmatter.conceptId !== node.conceptId) {
                errors.push(`[${locale}] Published roadmap node "${node.id}" has conceptId "${node.conceptId}" but references lesson "${node.lessonSlug}" with conceptId "${matchingLesson.frontmatter.conceptId}"`);
              }
              if (matchingLesson.frontmatter.language !== language) {
                errors.push(`[${locale}] Published roadmap node "${node.id}" in language "${language}" references lesson "${node.lessonSlug}" with language "${matchingLesson.frontmatter.language}"`);
              }
            }
          }
        } else if (node.status === 'planned') {
          if (node.lessonSlug) {
            const existingLesson = lessonSlugMap.get(node.lessonSlug);
            if (existingLesson && existingLesson.frontmatter.status === 'published') {
              errors.push(`[${locale}] Planned roadmap node "${node.id}" has a published lesson "${node.lessonSlug}". Planned nodes must not have published lessons.`);
            }
          }
        }
      }
    }

    // Detect roadmap node prerequisite cycles
    const nodeCycleErrors = detectRoadmapNodeCycles(roadmap);
    for (const err of nodeCycleErrors) {
      errors.push(`[${locale}] ${err}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateBilingualParity(
  conceptsEn: Concept[],
  conceptsVi: Concept[],
  roadmapEn: Roadmap,
  roadmapVi: Roadmap,
  lessonsEn: RawParsedLesson[],
  lessonsVi: RawParsedLesson[]
): string[] {
  const errors: string[] = [];

  // 1. Concept parity
  const conceptMapEn = new Map(conceptsEn.map((c) => [c.id, c]));
  const conceptMapVi = new Map(conceptsVi.map((c) => [c.id, c]));

  for (const [id, enConcept] of conceptMapEn) {
    const viConcept = conceptMapVi.get(id);
    if (!viConcept) {
      errors.push(`[vi] Missing Vietnamese concept record for canonical concept ID "${id}"`);
      continue;
    }
    if (viConcept.slug !== enConcept.slug) {
      errors.push(`[vi] Concept "${id}" slug mismatch: expected "${enConcept.slug}", got "${viConcept.slug}"`);
    }
    if (JSON.stringify(viConcept.prerequisites || []) !== JSON.stringify(enConcept.prerequisites || [])) {
      errors.push(`[vi] Concept "${id}" prerequisites mismatch with canonical English concept`);
    }
  }

  // 2. Roadmap parity
  if (roadmapVi.sections.length !== roadmapEn.sections.length) {
    errors.push(`[vi] Roadmap section count (${roadmapVi.sections.length}) does not match English (${roadmapEn.sections.length})`);
  }

  const nodesEnMap = new Map<string, RoadmapNode>();
  for (const sec of roadmapEn.sections) {
    for (const node of sec.nodes) {
      nodesEnMap.set(node.id, node);
    }
  }

  const nodesViMap = new Map<string, RoadmapNode>();
  for (const sec of roadmapVi.sections) {
    for (const node of sec.nodes) {
      nodesViMap.set(node.id, node);
    }
  }

  for (const [id, nodeEn] of nodesEnMap) {
    const nodeVi = nodesViMap.get(id);
    if (!nodeVi) {
      errors.push(`[vi] Missing Vietnamese roadmap node for canonical node ID "${id}"`);
      continue;
    }
    if (nodeVi.conceptId !== nodeEn.conceptId) {
      errors.push(`[vi] Node "${id}" conceptId mismatch: expected "${nodeEn.conceptId}", got "${nodeVi.conceptId}"`);
    }
    if (nodeVi.lessonSlug !== nodeEn.lessonSlug) {
      errors.push(`[vi] Node "${id}" lessonSlug mismatch: expected "${nodeEn.lessonSlug}", got "${nodeVi.lessonSlug}"`);
    }
    if (nodeVi.status !== nodeEn.status) {
      errors.push(`[vi] Node "${id}" status mismatch: expected "${nodeEn.status}", got "${nodeVi.status}"`);
    }
    if (JSON.stringify(nodeVi.prerequisites || []) !== JSON.stringify(nodeEn.prerequisites || [])) {
      errors.push(`[vi] Node "${id}" prerequisites mismatch with canonical English node`);
    }
  }

  // 3. Lesson parity
  const lessonsEnMap = new Map(lessonsEn.map((l) => [l.frontmatter.slug, l]));
  const lessonsViMap = new Map(lessonsVi.map((l) => [l.frontmatter.slug, l]));

  for (const [slug, lessonEn] of lessonsEnMap) {
    if (lessonEn.frontmatter.status !== 'published') continue;

    const lessonVi = lessonsViMap.get(slug);
    if (!lessonVi) {
      errors.push(`[vi] Missing required Vietnamese published lesson for canonical slug "${slug}"`);
      continue;
    }

    const locPrefix = `[vi] (${lessonVi.filePath}) `;

    if (lessonVi.frontmatter.status !== 'published') {
      errors.push(`${locPrefix}Lesson "${slug}" status is "${lessonVi.frontmatter.status}", expected "published"`);
    }

    if (lessonVi.frontmatter.conceptId !== lessonEn.frontmatter.conceptId) {
      errors.push(`${locPrefix}Lesson "${slug}" conceptId mismatch: expected "${lessonEn.frontmatter.conceptId}", got "${lessonVi.frontmatter.conceptId}"`);
    }

    // Code parity assertion
    const enCode = lessonEn.codeExample.code.trim();
    const viCode = lessonVi.codeExample.code.trim();
    if (enCode !== viCode) {
      errors.push(`${locPrefix}Lesson "${slug}" code example does not match canonical English code`);
    }

    // Source URLs parity assertion
    const enUrls = (lessonEn.frontmatter.sources || []).map((s) => s.url).sort();
    const viUrls = (lessonVi.frontmatter.sources || []).map((s) => s.url).sort();
    if (JSON.stringify(enUrls) !== JSON.stringify(viUrls)) {
      errors.push(`${locPrefix}Lesson "${slug}" source URLs do not match canonical English source URLs`);
    }
  }

  return errors;
}

export async function validateAllContent(rootPath: string = getProjectRoot()): Promise<ValidationResult> {
  const allErrors: string[] = [];

  // 1. Validate Canonical English Content
  const conceptsEn = loadConcepts('en', rootPath);
  const phpRoadmapEn = loadRoadmap('php', 'en', rootPath);
  const phpLessonsEn = loadLessons('php', 'en', rootPath);

  if (conceptsEn.length === 0) {
    allErrors.push('[en] No concepts found for English locale');
  }
  if (!phpRoadmapEn) {
    allErrors.push('[en] Missing PHP roadmap for English locale');
  }
  if (phpLessonsEn.length === 0) {
    allErrors.push('[en] No PHP lessons found for English locale');
  }

  const enValidation = validateContentData(
    conceptsEn,
    [{ language: 'php', roadmap: phpRoadmapEn }],
    [{ language: 'php', lessons: phpLessonsEn }],
    'en'
  );
  allErrors.push(...enValidation.errors);

  // 2. Validate Vietnamese Content
  const conceptsVi = loadConcepts('vi', rootPath);
  const phpRoadmapVi = loadRoadmap('php', 'vi', rootPath);
  const phpLessonsVi = loadLessons('php', 'vi', rootPath);

  if (conceptsVi.length === 0) {
    allErrors.push('[vi] No concepts found for Vietnamese locale in content/locales/vi/knowledge/concepts.json');
  }
  if (!phpRoadmapVi) {
    allErrors.push('[vi] Missing PHP roadmap for Vietnamese locale in content/locales/vi/roadmaps/php.json');
  }
  if (phpLessonsVi.length === 0) {
    allErrors.push('[vi] No PHP lessons found for Vietnamese locale in content/locales/vi/programming/php/lessons');
  }

  const viValidation = validateContentData(
    conceptsVi,
    [{ language: 'php', roadmap: phpRoadmapVi }],
    [{ language: 'php', lessons: phpLessonsVi }],
    'vi'
  );
  allErrors.push(...viValidation.errors);

  // 3. Validate Parity between EN and VI
  if (conceptsEn.length > 0 && conceptsVi.length > 0 && phpRoadmapEn && phpRoadmapVi) {
    const parityErrors = validateBilingualParity(
      conceptsEn,
      conceptsVi,
      phpRoadmapEn,
      phpRoadmapVi,
      phpLessonsEn,
      phpLessonsVi
    );
    allErrors.push(...parityErrors);
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}
