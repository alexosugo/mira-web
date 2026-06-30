import { describe, expect, it } from 'vitest';
import { PAGES, PLANS } from '../content/pages';
import { jsonLdForPage } from '../lib/structured-data';
import { violatesVoice } from '../lib/voice';

const faqQuestions = (path: string): readonly string[] =>
  PAGES[path].sections.flatMap((section) =>
    section.kind === 'faq' ? section.items.map((item) => item.question) : [],
  );

describe('structured data', () => {
  it('adds Offer nodes for the canonical pricing plans', () => {
    const nodes = jsonLdForPage(PAGES['/pricing']);
    const pricingProduct = nodes.find((node) => node['@type'] === 'Product');

    expect(pricingProduct?.offers.map((offer) => offer.name)).toEqual(PLANS.map((plan) => plan.name));
    expect(pricingProduct?.offers.map((offer) => offer.price)).toEqual(['0', '3500', undefined]);
  });

  it('mirrors visible FAQ questions in FAQPage JSON-LD', () => {
    const faqPaths = [
      '/pricing',
      '/how-it-works',
      '/features/product-answers',
      '/features/orders-and-checkout',
      '/features/human-handoff',
      '/help',
    ];

    for (const path of faqPaths) {
      const faqNode = jsonLdForPage(PAGES[path]).find((node) => node['@type'] === 'FAQPage');
      expect(faqNode?.mainEntity.map((question) => question.name), path).toEqual(faqQuestions(path));
    }
  });

  it('does not add policy structured data to legal pages', () => {
    expect(jsonLdForPage(PAGES['/privacy'])).toEqual([]);
    expect(jsonLdForPage(PAGES['/terms'])).toEqual([]);
    expect(jsonLdForPage(PAGES['/data-deletion'])).toEqual([]);
  });

  it('keeps JSON-LD copy voice-compliant', () => {
    for (const page of Object.values(PAGES)) {
      const serialized = JSON.stringify(jsonLdForPage(page));
      expect(violatesVoice(serialized), page.path).toBe(false);
    }
  });
});
