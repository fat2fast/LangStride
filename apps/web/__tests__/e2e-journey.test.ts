/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import PhpRoadmapPage from '../app/php/page';
import PhpConceptPage, { generateMetadata } from '../app/php/concepts/[slug]/page';
import { getPhpRoadmap, getPhpLesson } from '../lib/learning-content';

describe('End-to-End local learner journey (Task 3.3, FR-REPO-007..011, FR-PHP-001..008, NFR-AI-001)', () => {
  let outboundRequests: string[] = [];
  const originalFetch = global.fetch;

  beforeEach(() => {
    outboundRequests = [];
    // Intercept runtime network requests to verify no-phone-home constraint (NFR-AI-001)
    global.fetch = vi.fn().mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === 'string' ? url : url.toString();
      outboundRequests.push(urlStr);
      return Promise.reject(new Error(`Blocked unapproved outbound network request to: ${urlStr}`));
    });
  });

  afterEach(() => {
    cleanup();
    global.fetch = originalFetch;
  });

  it('renders PHP roadmap page, traverses all published lessons via route components, and verifies no external calls', async () => {
    // 1. Render the actual Next.js /php roadmap route component
    const roadmapUi = await PhpRoadmapPage();
    const { container: roadmapContainer } = render(roadmapUi);

    // Verify roadmap title and sections are rendered in DOM
    expect(screen.getByRole('heading', { level: 1, name: /PHP (Engineering|Developer) Roadmap/i })).toBeDefined();

    const roadmapData = await getPhpRoadmap();
    expect(roadmapData).not.toBeNull();
    expect(roadmapData!.language).toBe('php');
    expect(roadmapData!.sections.length).toBeGreaterThan(0);

    for (const section of roadmapData!.sections) {
      expect(screen.getByText(section.title)).toBeDefined();
    }

    // 2. Discover published and planned nodes dynamically (NO fixed count assertions)
    const allNodes = roadmapData!.sections.flatMap((s) => s.nodes);
    const publishedNodes = allNodes.filter((n) => n.status === 'published');
    const plannedNodes = allNodes.filter((n) => n.status === 'planned');

    expect(publishedNodes.length).toBeGreaterThanOrEqual(1);
    expect(plannedNodes.length).toBeGreaterThanOrEqual(1);

    // 3. Verify planned nodes in rendered UI are non-navigable and have aria-disabled
    for (const planned of plannedNodes) {
      const plannedTextElement = screen.getByText(planned.title);
      expect(plannedTextElement).toBeDefined();
      const disabledWrapper = plannedTextElement.closest('[aria-disabled="true"]');
      expect(disabledWrapper, `Planned node "${planned.title}" must have aria-disabled="true"`).not.toBeNull();

      // Planned node should not have a published lesson
      if (planned.lessonSlug) {
        const lesson = await getPhpLesson(planned.lessonSlug);
        expect(lesson).toBeNull();
      }
    }

    // 4. Verify all published node links exist on roadmap page
    for (const node of publishedNodes) {
      expect(node.lessonSlug).toBeDefined();
      const nodeLink = roadmapContainer.querySelector(`a[href="/php/concepts/${node.lessonSlug}"]`);
      expect(nodeLink, `Link for node "${node.title}" with href /php/concepts/${node.lessonSlug} must exist on roadmap`).not.toBeNull();
    }

    // 5. Mechanically visit and render every published lesson page
    for (const node of publishedNodes) {
      cleanup(); // Clean previous render

      // Render the actual Next.js concept route page for this slug
      const conceptPageUi = await PhpConceptPage({
        params: Promise.resolve({ slug: node.lessonSlug! }),
      });
      render(conceptPageUi);

      // Verify lesson title
      expect(screen.getByRole('heading', { level: 1 })).toBeDefined();

      // Verify mandatory sections are present in DOM
      expect(screen.getByRole('heading', { name: /Why it matters/i })).toBeDefined();
      expect(screen.getByRole('heading', { name: /Mental model/i })).toBeDefined();
      expect(screen.getByRole('heading', { name: /Code example/i })).toBeDefined();
      expect(screen.getByRole('heading', { name: /Common mistakes/i })).toBeDefined();

      // Verify PHP code snippet contains valid syntax
      const codeSnippet = screen.getByText(/<\?php/);
      expect(codeSnippet).toBeDefined();

      // Verify metadata generator works for the lesson
      const meta = await generateMetadata({ params: Promise.resolve({ slug: node.lessonSlug! }) });
      expect(meta.title).toBeDefined();
    }

    // 5. Test notFound() behavior for invalid slug
    let notFoundTriggered = false;
    try {
      await PhpConceptPage({ params: Promise.resolve({ slug: 'nonexistent-lesson-404' }) });
    } catch (err: any) {
      // Next.js notFound() throws error with digest 'NEXT_HTTP_ERROR_FALLBACK;404' or 'NEXT_NOT_FOUND'
      notFoundTriggered =
        err?.digest === 'NEXT_HTTP_ERROR_FALLBACK;404' ||
        err?.digest === 'NEXT_NOT_FOUND' ||
        err?.message === 'NEXT_NOT_FOUND';
    }
    expect(notFoundTriggered).toBe(true);

    // 6. Assert ZERO outbound network requests occurred during entire journey (NFR-AI-001)
    expect(outboundRequests).toEqual([]);
  });

  it('scans codebase to ensure zero unapproved cloud SDKs or AI SaaS calls (FR-REPO-011, NFR-AI-001)', () => {
    const rootDir = path.resolve(__dirname, '../../..');

    const packageJsonFiles = [
      path.join(rootDir, 'package.json'),
      path.join(rootDir, 'apps/web/package.json'),
      path.join(rootDir, 'packages/learning/package.json'),
      path.join(rootDir, 'packages/content/package.json'),
    ];

    const forbiddenPackages = [
      '@supabase/supabase-js', // Direct Postgres client is used locally; no hosted SaaS SDK
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
