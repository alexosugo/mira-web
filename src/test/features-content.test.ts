import { describe, expect, it } from 'vitest';
import { PAGES } from '../content/pages';

const FEATURE_PATHS = [
  '/features/product-answers',
  '/features/orders-and-checkout',
  '/features/human-handoff',
] as const;

describe('feature content pages', () => {
  it('shows concrete DM scenarios for every feature page', () => {
    for (const path of FEATURE_PATHS) {
      const scenarios = PAGES[path].sections.find((section) => section.kind === 'scenarios');

      expect(scenarios?.kind, path).toBe('scenarios');
      if (scenarios?.kind !== 'scenarios') continue;

      expect(scenarios.items).toHaveLength(3);
      for (const item of scenarios.items) {
        expect(item.customer.length, path).toBeGreaterThan(10);
        expect(item.mira.length, path).toBeGreaterThan(45);
        expect(item.ownerNote.length, path).toBeGreaterThan(35);
      }
    }
  });
});
