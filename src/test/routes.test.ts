import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROUTES, NOINDEX_PATHS } from '../lib/routes';
import { violatesVoice } from '../lib/voice';

const SUFFIX = '| Mira';

describe('route registry integrity', () => {
  it('ships exactly the 21 planned routes (customers deferred)', () => {
    expect(ROUTES).toHaveLength(21);
    expect(ROUTES.find((r) => r.path === '/customers')).toBeUndefined();
  });

  it('has unique paths', () => {
    const paths = ROUTES.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('has unique titles', () => {
    const titles = ROUTES.map((r) => r.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('has unique meta descriptions', () => {
    const descriptions = ROUTES.map((r) => r.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it('has unique analytics page names', () => {
    const names = ROUTES.map((r) => r.pageName);
    expect(new Set(names).size).toBe(names.length);
  });

  it('formats every title as `{Phrase} | Mira`', () => {
    for (const route of ROUTES) {
      expect(route.title.endsWith(SUFFIX), `${route.path} title missing suffix`).toBe(true);
    }
  });

  it('never duplicates the brand inside a title (no "Mira ... | Mira")', () => {
    for (const route of ROUTES) {
      const phrase = route.title.slice(0, route.title.length - SUFFIX.length).trim();
      expect(phrase.toLowerCase(), `${route.path}`).not.toContain('mira');
    }
  });

  it('marks only /privacy and /terms as noindex', () => {
    const nonIndexable = ROUTES.filter((r) => !r.indexable).map((r) => r.path).sort();
    expect(nonIndexable).toEqual(['/privacy', '/terms']);
    // Keeps astro.config.mjs NOINDEX_PATHS in sync with the registry.
    expect([...NOINDEX_PATHS].sort()).toEqual(['/privacy', '/terms']);
  });

  it('materializes every registered route as an Astro page file', () => {
    for (const route of ROUTES) {
      const routeFile = join(
        process.cwd(),
        'src/pages',
        route.path === '/' ? 'index.astro' : `${route.path.slice(1)}.astro`,
      );
      expect(existsSync(routeFile), `${route.path} missing ${routeFile}`).toBe(true);
    }
  });

  it('keeps all copy voice-compliant (no banned phrases or exclamation points)', () => {
    for (const route of ROUTES) {
      expect(violatesVoice(route.title), `title: ${route.title}`).toBe(false);
      expect(violatesVoice(route.description), `desc: ${route.path}`).toBe(false);
    }
  });

  it('tags every route with a valid slice', () => {
    for (const route of ROUTES) {
      expect([2, 3]).toContain(route.slice);
    }
  });
});
