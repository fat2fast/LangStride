/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn, type ChildProcess, execSync } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadRoadmap, getProjectRoot } from '@langstride/content';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(webDir, '../..');

function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, '127.0.0.1', () => {
      const addr = s.address();
      if (!addr || typeof addr === 'string') {
        s.close(() => reject(new Error('Failed to obtain port')));
        return;
      }
      const port = addr.port;
      s.close(() => resolve(port));
    });
  });
}

function waitForServer(port: number, timeoutMs = 20000): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/php`, { method: 'HEAD' });
        if (res.status === 200 || res.status === 404 || res.status === 307 || res.status === 308) {
          resolve();
          return;
        }
      } catch {
        // server not accepting connections yet
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out after ${timeoutMs}ms waiting for Next.js server on port ${port}`));
        return;
      }
      setTimeout(check, 200);
    };
    check();
  });
}

describe('HTTP route integration test — Running Next.js app journey (Finding 3, Phase 03/04, NFR-AI-001)', () => {
  let serverProcess: ChildProcess | null = null;
  let port: number;
  let baseUrl: string;

  beforeAll(async () => {
    // 1. Ensure production build exists so next start can run cleanly
    const nextDir = path.join(webDir, '.next');
    if (!fs.existsSync(nextDir)) {
      execSync('pnpm --filter @langstride/web build', {
        cwd: rootDir,
        stdio: 'inherit',
        env: {
          ...process.env,
          USE_DB_READ_MODEL: 'false', // ensure build doesn't require DB
        },
      });
    }

    port = await getFreePort();
    baseUrl = `http://127.0.0.1:${port}`;

    const nextBin = path.join(webDir, 'node_modules/next/dist/bin/next');

    // Spawn Next.js production server
    serverProcess = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
      cwd: webDir,
      env: {
        ...process.env,
        PORT: String(port),
        USE_DB_READ_MODEL: 'false', // hermetic file-backed mode for pure HTTP route validation
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Wait until server starts accepting HTTP connections
    await waitForServer(port);
  }, 45000);

  afterAll(async () => {
    if (serverProcess) {
      serverProcess.kill('SIGTERM');
      await new Promise((r) => setTimeout(r, 500));
      if (!serverProcess.killed) {
        serverProcess.kill('SIGKILL');
      }
    }
  });

  it('serves HTTP 200 for /php roadmap over loopback with expected HTML structure', async () => {
    const res = await fetch(`${baseUrl}/php`);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');

    const html = await res.text();
    // Verify Roadmap title
    expect(html).toMatch(/PHP (Engineering|Developer) Roadmap/i);

    // Verify roadmap sections are present in HTML
    const normalizedHtml = html.replace(/&amp;/g, '&');
    const roadmap = loadRoadmap('php', getProjectRoot());
    expect(roadmap).not.toBeNull();
    for (const section of roadmap!.sections) {
      expect(normalizedHtml).toContain(section.title);
    }
  });

  it('serves HTTP 200 for all published concept lesson routes over HTTP', async () => {
    const roadmap = loadRoadmap('php', getProjectRoot());
    expect(roadmap).not.toBeNull();

    const publishedNodes = roadmap!.sections
      .flatMap((s) => s.nodes)
      .filter((n) => n.status === 'published');

    expect(publishedNodes.length).toBeGreaterThanOrEqual(1);

    for (const node of publishedNodes) {
      expect(node.lessonSlug).toBeDefined();
      const lessonUrl = `${baseUrl}/php/concepts/${node.lessonSlug}`;

      const res = await fetch(lessonUrl);
      expect(res.status, `Expected HTTP 200 for ${lessonUrl}`).toBe(200);
      expect(res.headers.get('content-type')).toContain('text/html');

      const html = await res.text();

      // Verify mandatory sections rendered in HTTP response
      expect(html).toContain('Why it matters');
      expect(html).toContain('Mental model');
      expect(html).toContain('Code example');
      expect(html).toContain('Common mistakes');

      // Verify PHP code example is rendered
      expect(html).toContain('&lt;?php'); // HTML escaped syntax
    }
  });

  it('returns HTTP 404 for nonexistent lesson route', async () => {
    const res = await fetch(`${baseUrl}/php/concepts/nonexistent-invalid-lesson-slug-404`);
    expect(res.status).toBe(404);
  });

  it('guarantees hermetic offline execution with zero external script/asset dependencies (NFR-AI-001)', async () => {
    const res = await fetch(`${baseUrl}/php`);
    const html = await res.text();

    // Collect all script and link tags in rendered HTML
    const externalScriptMatches = html.match(/<script[^>]+src=["'](https?:)?\/\/[^"']+["']/gi) || [];
    const externalLinkMatches = html.match(/<link[^>]+href=["'](https?:)?\/\/[^"']+["']/gi) || [];

    expect(externalScriptMatches, 'Should have zero external script tags').toEqual([]);
    expect(externalLinkMatches, 'Should have zero external stylesheet/font link tags').toEqual([]);
  });
});
