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

let serverStdout = '';
let serverStderr = '';

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
      } catch (err: any) {
        // server not accepting connections yet
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out after ${timeoutMs}ms waiting for Next.js server on port ${port}. Last server stderr: "${serverStderr}". Last server stdout: "${serverStdout}"`));
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
    if (!fs.existsSync(nextDir) || !fs.existsSync(path.join(nextDir, 'BUILD_ID'))) {
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

    serverStdout = '';
    serverStderr = '';
    // Spawn Next.js production server with explicit 127.0.0.1 host
    serverProcess = spawn(process.execPath, [nextBin, 'start', '-p', String(port), '-H', '127.0.0.1'], {
      cwd: webDir,
      env: {
        ...process.env,
        PORT: String(port),
        USE_DB_READ_MODEL: 'false', // hermetic file-backed mode for pure HTTP route validation
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    serverProcess.stdout?.on('data', (d) => {
      serverStdout += d.toString();
    });

    serverProcess.stderr?.on('data', (d) => {
      serverStderr += d.toString();
    });

    serverProcess.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        console.error(`Next.js test server exited with code ${code}. Stderr: ${serverStderr}`);
      }
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

  it('redirects unprefixed /php to /en/php', async () => {
    const res = await fetch(`${baseUrl}/php`, { redirect: 'manual' });
    expect([307, 308]).toContain(res.status);
    const location = res.headers.get('location');
    expect(location).toMatch(/\/en\/php$/);
  });

  it('serves HTTP 200 for /en/php and /vi/php roadmap with localized content', async () => {
    // 1. English roadmap
    const resEn = await fetch(`${baseUrl}/en/php`);
    expect(resEn.status).toBe(200);
    expect(resEn.headers.get('content-type')).toContain('text/html');
    const htmlEn = await resEn.text();
    expect(htmlEn).toMatch(/PHP Engineering Roadmap/i);

    const roadmapEn = loadRoadmap('php', 'en', getProjectRoot());
    expect(roadmapEn).not.toBeNull();
    const normalizedHtmlEn = htmlEn.replace(/&amp;/g, '&');
    for (const section of roadmapEn!.sections) {
      expect(normalizedHtmlEn).toContain(section.title);
    }

    // 2. Vietnamese roadmap
    const resVi = await fetch(`${baseUrl}/vi/php`);
    expect(resVi.status).toBe(200);
    expect(resVi.headers.get('content-type')).toContain('text/html');
    const htmlVi = await resVi.text();
    expect(htmlVi).toMatch(/Lộ trình Kỹ thuật PHP/i);

    const roadmapVi = loadRoadmap('php', 'vi', getProjectRoot());
    expect(roadmapVi).not.toBeNull();
    const normalizedHtmlVi = htmlVi.replace(/&amp;/g, '&');
    for (const section of roadmapVi!.sections) {
      expect(normalizedHtmlVi).toContain(section.title);
    }
  });

  it('serves HTTP 200 for all published concept lesson routes in both English and Vietnamese', async () => {
    const roadmap = loadRoadmap('php', 'en', getProjectRoot());
    expect(roadmap).not.toBeNull();

    const publishedNodes = roadmap!.sections
      .flatMap((s) => s.nodes)
      .filter((n) => n.status === 'published');

    expect(publishedNodes.length).toBeGreaterThanOrEqual(1);

    for (const node of publishedNodes) {
      expect(node.lessonSlug).toBeDefined();

      // Test English route
      const lessonUrlEn = `${baseUrl}/en/php/concepts/${node.lessonSlug}`;
      const resEn = await fetch(lessonUrlEn);
      expect(resEn.status, `Expected HTTP 200 for ${lessonUrlEn}`).toBe(200);
      const htmlEn = await resEn.text();
      expect(htmlEn).toContain('Why it matters');
      expect(htmlEn).toContain('Mental model');
      expect(htmlEn).toContain('Code example');
      expect(htmlEn).toContain('Common mistakes');
      expect(htmlEn).toContain('&lt;?php');

      // Test Vietnamese route
      const lessonUrlVi = `${baseUrl}/vi/php/concepts/${node.lessonSlug}`;
      const resVi = await fetch(lessonUrlVi);
      expect(resVi.status, `Expected HTTP 200 for ${lessonUrlVi}`).toBe(200);
      const htmlVi = await resVi.text();
      expect(htmlVi).toContain('Vì sao điều này quan trọng');
      expect(htmlVi).toContain('Mô hình tư duy');
      expect(htmlVi).toContain('Ví dụ mã nguồn');
      expect(htmlVi).toContain('Các lỗi thường gặp');
      expect(htmlVi).toContain('&lt;?php');

      // Test unprefixed redirect
      const resRedirect = await fetch(`${baseUrl}/php/concepts/${node.lessonSlug}`, { redirect: 'manual' });
      expect([307, 308]).toContain(resRedirect.status);
      expect(resRedirect.headers.get('location')).toMatch(new RegExp(`/en/php/concepts/${node.lessonSlug}$`));
    }
  });

  it('returns HTTP 404 for nonexistent lesson route in en and vi', async () => {
    const resEn = await fetch(`${baseUrl}/en/php/concepts/nonexistent-invalid-lesson-slug-404`);
    expect(resEn.status).toBe(404);

    const resVi = await fetch(`${baseUrl}/vi/php/concepts/nonexistent-invalid-lesson-slug-404`);
    expect(resVi.status).toBe(404);
  });

  it('guarantees hermetic offline execution with zero external script/asset dependencies (NFR-AI-001)', async () => {
    for (const path of ['/en/php', '/vi/php']) {
      const res = await fetch(`${baseUrl}${path}`);
      const html = await res.text();

      // Collect all script and link tags in rendered HTML
      const externalScriptMatches = html.match(/<script[^>]+src=["'](https?:)?\/\/[^"']+["']/gi) || [];
      const externalLinkMatches = html.match(/<link[^>]+href=["'](https?:)?\/\/[^"']+["']/gi) || [];

      expect(externalScriptMatches, `Should have zero external script tags on ${path}`).toEqual([]);
      expect(externalLinkMatches, `Should have zero external stylesheet/font link tags on ${path}`).toEqual([]);
    }
  });
});
