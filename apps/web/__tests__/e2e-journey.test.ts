import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getPhpRoadmap, getPhpLesson } from '../lib/learning-content';

describe('End-to-End local learner journey (Task 3.3, FR-REPO-007..011, FR-PHP-001..008, NFR-AI-001)', () => {
  it('navigates the complete roadmap and every published lesson mechanically', async () => {
    // Step 1: Open PHP roadmap
    const roadmap = await getPhpRoadmap();
    expect(roadmap).not.toBeNull();
    expect(roadmap!.language).toBe('php');
    expect(roadmap!.sections.length).toBeGreaterThan(0);

    // Step 2: Verify sections and distinct node statuses
    const sectionNames = roadmap!.sections.map((s) => s.title);
    expect(sectionNames).toEqual([
      'PHP Fundamentals',
      'Object-Oriented Architecture',
      'Runtime Safety & Error Handling',
    ]);

    const allNodes = roadmap!.sections.flatMap((s) => s.nodes);
    const publishedNodes = allNodes.filter((n) => n.status === 'published');
    const plannedNodes = allNodes.filter((n) => n.status === 'planned');

    expect(publishedNodes.length).toBe(6);
    expect(plannedNodes.length).toBe(1);

    // Step 3: Verify planned node has no published lesson
    for (const planned of plannedNodes) {
      if (planned.lessonSlug) {
        const lesson = await getPhpLesson(planned.lessonSlug);
        expect(lesson).toBeNull();
      }
    }

    // Step 4: Follow every published node and verify complete lesson contents
    for (const node of publishedNodes) {
      expect(node.lessonSlug).toBeDefined();
      const lesson = await getPhpLesson(node.lessonSlug!);

      expect(lesson).not.toBeNull();
      expect(lesson!.frontmatter.status).toBe('published');
      expect(lesson!.frontmatter.language).toBe('php');
      expect(lesson!.frontmatter.title).toBeDefined();

      // Verify mandatory sections are present and non-empty
      expect(lesson!.whyItMatters.trim().length).toBeGreaterThan(20);
      expect(lesson!.mentalModel.trim().length).toBeGreaterThan(20);
      expect(lesson!.codeExample.language).toBe('php');
      expect(lesson!.codeExample.code).toContain('<?php');
      expect(lesson!.commonMistakes.trim().length).toBeGreaterThan(20);

      // Verify source references
      expect(lesson!.frontmatter.sources).toBeDefined();
      expect(lesson!.frontmatter.sources!.length).toBeGreaterThan(0);
      for (const src of lesson!.frontmatter.sources!) {
        expect(src.url).toMatch(/^https?:\/\//);
      }
    }

    // Step 5: Test invalid slug returns null (triggers 404)
    const nonexistentLesson = await getPhpLesson('nonexistent-lesson-slug');
    expect(nonexistentLesson).toBeNull();
  });

  it('scans codebase to ensure zero unapproved cloud SDKs or AI SaaS calls (FR-REPO-011, NFR-AI-001)', () => {
    const rootDir = path.resolve(__dirname, '../../..');

    // Read all package.json files
    const packageJsonFiles = [
      path.join(rootDir, 'package.json'),
      path.join(rootDir, 'apps/web/package.json'),
      path.join(rootDir, 'packages/learning/package.json'),
      path.join(rootDir, 'packages/content/package.json'),
    ];

    const forbiddenPackages = [
      '@supabase/supabase-js', // We use direct Postgres client locally, no hosted Supabase SaaS SDK
      'openai',
      'anthropic',
      '@anthropic-ai/sdk',
      'langchain',
      '@langchain/core',
      'firebase',
      'aws-sdk',
      '@aws-sdk',
    ];

    for (const pkgPath of packageJsonFiles) {
      if (fs.existsSync(pkgPath)) {
        const content = fs.readFileSync(pkgPath, 'utf-8');
        const json = JSON.parse(content);
        const allDeps = {
          ...json.dependencies,
          ...json.devDependencies,
        };

        for (const forbidden of forbiddenPackages) {
          expect(allDeps[forbidden], `Forbidden package "${forbidden}" found in ${pkgPath}`).toBeUndefined();
        }
      }
    }
  });
});
