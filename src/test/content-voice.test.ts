import { describe, it, expect } from 'vitest';
import { PLANS, STEPS, DM_SCOPE_REASSURANCE, PAGES, type ContentSection } from '../content/pages';
import { violatesVoice } from '../lib/voice';

// Collects every shipped string from the canonical content module so the voice
// test covers plans, steps, and the reassurance line in one pass.
const allContentStrings: string[] = [];
for (const plan of PLANS) {
  allContentStrings.push(plan.name, plan.price, plan.description, plan.cta, plan.footnote ?? '');
  if (plan.pricePrefix) allContentStrings.push(plan.pricePrefix);
  if (plan.featuresLead) allContentStrings.push(plan.featuresLead);
  allContentStrings.push(...plan.features);
}
for (const step of STEPS) {
  allContentStrings.push(step.title, step.description);
}
allContentStrings.push(DM_SCOPE_REASSURANCE);
const sectionStrings = (section: ContentSection): readonly string[] => {
  switch (section.kind) {
    case 'prose':
      return [section.kicker ?? '', section.heading ?? '', section.body];
    case 'split':
      return [section.kicker ?? '', section.heading, section.body];
    case 'list':
      return [section.kicker ?? '', section.heading ?? '', ...section.items];
    case 'numbered':
      return [
        section.kicker ?? '',
        section.heading ?? '',
        ...section.items.flatMap((item) => [item.title, item.body]),
      ];
    case 'story':
      return [section.kicker ?? '', section.heading, section.body, section.aside];
    case 'fitGuide':
      return [
        section.kicker ?? '',
        section.heading,
        section.body,
        section.worksBest,
        section.handoff,
        section.ownerGets,
      ];
    case 'promiseGrid':
      return [
        section.kicker ?? '',
        section.heading,
        ...section.items.flatMap((item) => [item.title, item.body]),
      ];
    case 'beforeAfter':
      return [section.kicker ?? '', section.heading, ...section.content.before, ...section.content.after];
    case 'scenarios':
      return [
        section.kicker ?? '',
        section.heading,
        ...section.items.flatMap((item) => [item.customer, item.mira, item.ownerNote]),
      ];
    case 'archetype':
      return [section.name, section.role, ...section.day, ...section.miraHelps];
    case 'legal':
      return [section.kicker ?? '', section.heading, ...section.paragraphs];
    case 'pricingMatrix':
      return [];
    case 'faq':
      return section.items.flatMap((item) => [item.question, item.answer]);
  }
};

for (const page of Object.values(PAGES)) {
  allContentStrings.push(page.path, page.hero.kicker ?? '', page.hero.h1, page.hero.intro);
  if (page.hero.primaryCta) {
    allContentStrings.push(page.hero.primaryCta.label, page.hero.primaryCta.href);
  }
  if (page.hero.secondaryLink) {
    allContentStrings.push(page.hero.secondaryLink.label, page.hero.secondaryLink.href);
  }
  for (const section of page.sections) {
    allContentStrings.push(...sectionStrings(section));
  }
}

describe('canonical content module voice compliance', () => {
  it('contains no banned phrases or exclamation points', () => {
    for (const text of allContentStrings) {
      if (!text) continue;
      expect(violatesVoice(text), `offending copy: "${text}"`).toBe(false);
    }
  });

  it('ships exactly three pricing plans (Free, Pro, Elite)', () => {
    expect(PLANS.map((p) => p.key)).toEqual(['free', 'pro', 'elite']);
  });

  it('ships exactly three how-it-works steps', () => {
    expect(STEPS.map((s) => s.number)).toEqual(['01', '02', '03']);
  });

  it('ships body content for every registered content page', () => {
    expect(Object.keys(PAGES)).toHaveLength(21);
  });

  it('uses richer section patterns beyond simple prose and lists', () => {
    const sectionKinds = new Set(Object.values(PAGES).flatMap((page) => page.sections.map((section) => section.kind)));
    expect(sectionKinds).toEqual(
      new Set([
        'pricingMatrix',
        'story',
        'fitGuide',
        'faq',
        'numbered',
        'promiseGrid',
        'beforeAfter',
        'scenarios',
        'prose',
        'list',
        'archetype',
        'legal',
      ]),
    );
  });
});
