import { describe, expect, it } from 'vitest';
import { PAGES } from '../content/pages';
import { ROUTES } from '../lib/routes';

const USE_CASE_PATHS = [
  '/use-cases/daily-drop-shops',
  '/use-cases/fashion',
  '/use-cases/beauty',
  '/use-cases/accessories',
  '/use-cases/fragrances',
  '/use-cases/home-bakeries-food-brands',
  '/use-cases/skincare-haircare-makers',
] as const;

const CATEGORY_TERMS: Record<(typeof USE_CASE_PATHS)[number], string[]> = {
  '/use-cases/daily-drop-shops': ['hold', 'rider', 'size 38', 'kasarani'],
  '/use-cases/fashion': ['waist', 'thrift', 'pickup', 'condition'],
  '/use-cases/beauty': ['shade', 'sealed', 'bundle', 'oily skin'],
  '/use-cases/accessories': ['stainless steel', 'magsafe', 'gift', 'tarnish'],
  '/use-cases/fragrances': ['decant', 'designer', 'lattafa', 'authenticity'],
  '/use-cases/home-bakeries-food-brands': ['banana bread', 'granola', 'bento cake', 'allergen'],
  '/use-cases/skincare-haircare-makers': ['body butter', 'black soap', 'salon', 'refill'],
};

describe('use-case content pages', () => {
  it('uses shop categories as use cases instead of generic Instagram shop labels', () => {
    const dailyDropRoute = ROUTES.find((route) => route.path === '/use-cases/daily-drop-shops');

    expect(dailyDropRoute?.title).toContain('Daily-Drop Shops');
    expect(dailyDropRoute?.pageName).toContain('Daily-Drop Shops');
    expect(dailyDropRoute?.title).not.toContain('Instagram Shops');
    expect(PAGES['/use-cases/daily-drop-shops'].hero.h1).toContain('daily-drop shops');
  });

  it('keeps all use-case pages on the same high-signal story beats', () => {
    for (const path of USE_CASE_PATHS) {
      const sectionKinds = PAGES[path].sections.map((section) => section.kind);

      expect(sectionKinds, path).toContain('archetype');
      expect(sectionKinds, path).toContain('promiseGrid');
      expect(sectionKinds, path).toContain('scenarios');
      expect(sectionKinds, path).toContain('fitGuide');
      expect(sectionKinds, path).toContain('faq');
    }
  });

  it('includes category-specific DM scenarios with owner-control boundaries', () => {
    for (const path of USE_CASE_PATHS) {
      const scenarios = PAGES[path].sections.find((section) => section.kind === 'scenarios');

      expect(scenarios?.kind, path).toBe('scenarios');
      if (scenarios?.kind !== 'scenarios') continue;

      expect(scenarios.items.length, path).toBeGreaterThanOrEqual(2);
      expect(scenarios.items.length, path).toBeLessThanOrEqual(4);
      for (const item of scenarios.items) {
        expect(item.customer.length, path).toBeGreaterThan(10);
        expect(item.mira.length, path).toBeGreaterThan(40);
        expect(item.ownerNote.length, path).toBeGreaterThan(35);
      }
    }
  });

  it('uses category-specific buyer language in each scenario section', () => {
    for (const path of USE_CASE_PATHS) {
      const scenarios = PAGES[path].sections.find((section) => section.kind === 'scenarios');

      expect(scenarios?.kind, path).toBe('scenarios');
      if (scenarios?.kind !== 'scenarios') continue;

      const scenarioText = JSON.stringify(scenarios).toLowerCase();
      for (const term of CATEGORY_TERMS[path]) {
        expect(scenarioText, `${path} should mention ${term}`).toContain(term);
      }
    }
  });

  it('gives every use case a practical fit and handoff guide', () => {
    for (const path of USE_CASE_PATHS) {
      const fitGuide = PAGES[path].sections.find((section) => section.kind === 'fitGuide');

      expect(fitGuide?.kind, path).toBe('fitGuide');
      if (fitGuide?.kind !== 'fitGuide') continue;

      expect(fitGuide.worksBest.length, path).toBeGreaterThan(80);
      expect(fitGuide.handoff.toLowerCase(), path).toMatch(/hand over|handoff/);
      expect(fitGuide.ownerGets.toLowerCase(), path).toMatch(/owner|maker/);
    }
  });

  it('uses locally natural Nairobi category language', () => {
    expect(ROUTES.find((route) => route.path === '/use-cases/home-bakeries-food-brands')?.title).toContain(
      'Home Bakeries and Food Brands',
    );
    expect(ROUTES.find((route) => route.path === '/use-cases/skincare-haircare-makers')?.title).toContain(
      'Skincare and Haircare Makers',
    );

    const pageText = Object.values(PAGES)
      .flatMap((page) => [page.path, page.hero.kicker ?? '', page.hero.h1, page.hero.intro])
      .join(' ');

    expect(pageText.toLowerCase()).not.toContain('cottage');
  });

  it('keeps fragrance broader than Arabian perfumes alone', () => {
    const fragrance = PAGES['/use-cases/fragrances'];
    const text = [fragrance.hero.intro, ...fragrance.sections.map((section) => JSON.stringify(section))]
      .join(' ')
      .toLowerCase();

    expect(text).toContain('designer');
    expect(text).toContain('niche');
    expect(text).toContain('arabian');
    expect(text).toContain('decant');
  });

  it('keeps public use-case copy free of internal planning language', () => {
    const useCaseText = USE_CASE_PATHS.map((path) => JSON.stringify(PAGES[path])).join(' ').toLowerCase();

    expect(useCaseText).not.toContain('gtm plan');
    expect(useCaseText).not.toContain('launch plan');
    expect(useCaseText).not.toContain('later use case');
  });
});
