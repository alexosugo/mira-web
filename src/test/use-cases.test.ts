import { describe, expect, it } from 'vitest';
import { PAGES } from '../content/pages';
import { ROUTES } from '../lib/routes';

const FEATURED_PATHS = [
  '/use-cases/fashion',
  '/use-cases/beauty',
  '/use-cases/accessories',
  '/use-cases/home-bakeries-food-brands',
] as const;

const OTHER_PATHS = [
  '/use-cases/daily-drop-shops',
  '/use-cases/fragrances',
  '/use-cases/skincare-haircare-makers',
] as const;

describe('homepage-linked shop use cases', () => {
  it('gives each shop a short buying story rather than the old template', () => {
    const headlines = new Set<string>();

    for (const path of FEATURED_PATHS) {
      const page = PAGES[path];
      const story = page.shopStory;
      expect(story, path).toBeDefined();
      expect(page.sections, path).toEqual([]);
      expect(page.hero.primaryCta?.href, path).toBe('https://app.sellogram.co');
      expect(story?.openingQuestions, path).toContain('?');
      expect(story?.sceneHeading.length, path).toBeGreaterThan(10);
      expect(story?.messages.length, path).toBeGreaterThanOrEqual(2);
      expect(story?.messages.some((m) => m.from === 'customer'), path).toBe(true);
      expect(story?.messages.some((m) => m.from === 'sellogram'), path).toBe(true);
      expect(story?.secondParagraphs.length, path).toBeGreaterThanOrEqual(2);
      expect(story?.ctaClose.length, path).toBeGreaterThan(20);
      headlines.add(page.hero.h1);
    }
    expect(headlines.size).toBe(FEATURED_PATHS.length);
  });

  it('keeps the buying questions distinctive', () => {
    const expected = {
      '/use-cases/fashion': ['jacket', 'medium', 'one-of-a-kind', 'stock'],
      '/use-cases/beauty': ['shade 330', 'lip combo', 'skin concern', 'products'],
      '/use-cases/accessories': ['stainless steel', 'bag', 'gift wrapping', 'compatibility'],
      '/use-cases/home-bakeries-food-brands': ['saturday', 'brownies', 'menu', 'allergy'],
    } as const;

    for (const path of FEATURED_PATHS) {
      const copy = JSON.stringify(PAGES[path]).toLowerCase();
      for (const term of expected[path]) {
        expect(copy, `${path} should mention ${term}`).toContain(term);
      }
    }
  });

  it('does not invent shop-owner biographies', () => {
    const copy = FEATURED_PATHS.map((path) => JSON.stringify(PAGES[path])).join(' ');
    for (const name of ['Achieng', 'Njeri', 'Linet', 'Muthoni']) {
      expect(copy).not.toContain(name);
    }
  });

  it('leaves the other three use cases on their existing content structure', () => {
    const dailyDrop = PAGES['/use-cases/daily-drop-shops'];
    expect(dailyDrop.hero.h1).toContain('daily-drop shops');
    expect(ROUTES.find((r) => r.path === dailyDrop.path)?.title).toContain('daily-drop shops');

    for (const path of OTHER_PATHS) {
      const page = PAGES[path];
      expect(page.shopStory).toBeUndefined();
      const kinds = page.sections.map((s) => s.kind);
      for (const required of ['archetype', 'promiseGrid', 'scenarios', 'fitGuide', 'faq']) {
        expect(kinds, path).toContain(required);
      }
    }
  });

  it('retains fragrance category coverage', () => {
    const fragrance = PAGES['/use-cases/fragrances'];
    const copy = [fragrance.hero.intro, ...fragrance.sections.map((s) => JSON.stringify(s))]
      .join(' ').toLowerCase();
    for (const term of ['designer', 'niche', 'arabian', 'decant']) {
      expect(copy).toContain(term);
    }
  });

  it('keeps public use-case copy free of internal planning language', () => {
    const paths = [...FEATURED_PATHS, ...OTHER_PATHS];
    const copy = paths.map((path) => JSON.stringify(PAGES[path])).join(' ').toLowerCase();
    for (const term of ['gtm plan', 'launch plan', 'later use case']) {
      expect(copy).not.toContain(term);
    }
  });
});
