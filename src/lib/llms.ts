// Pure generators for /llms.txt and /llms-full.txt. Kept pure (data in, string
// out) so they are unit-testable; the Astro endpoints in src/pages are thin
// wrappers that supply the site URL. Both files are generated from the route
// registry so they can never drift from the live routes.
import type { Route } from './routes';
import { ROUTES } from './routes';
import { PAGES, type ContentSection } from '../content/pages';

const SORT_PRIORITY: Record<string, number> = {
  '/pricing': 1,
  '/how-it-works': 2,
  '/instagram-dm-automation': 3,
  '/integrations/instagram': 4,
  '/features/product-answers': 5,
  '/features/orders-and-checkout': 6,
  '/features/human-handoff': 7,
  '/use-cases/daily-drop-shops': 8,
  '/use-cases/fashion': 9,
  '/use-cases/beauty': 10,
  '/use-cases/accessories': 11,
  '/use-cases/fragrances': 12,
  '/use-cases/home-bakeries-food-brands': 13,
  '/use-cases/skincare-haircare-makers': 14,
  '/security': 15,
  '/privacy': 16,
  '/terms': 17,
  '/data-deletion': 18,
  '/about': 19,
  '/contact': 20,
  '/help': 21,
};

const byPriority = (a: Route, b: Route): number =>
  (SORT_PRIORITY[a.path] ?? 99) - (SORT_PRIORITY[b.path] ?? 99);

const stripBrand = (title: string): string => title.replace(/\s*\|\s*Sellogram$/, '');

const line = (text: string): string => `${text}\n`;

const sectionLines = (section: ContentSection): readonly string[] => {
  switch (section.kind) {
    case 'prose':
      return [section.heading, section.body].filter((item): item is string => Boolean(item));
    case 'split':
      return [section.heading, section.body];
    case 'list':
      return [section.heading, ...section.items].filter((item): item is string => Boolean(item));
    case 'numbered':
      return [section.heading, ...section.items.map((item) => `${item.title}: ${item.body}`)].filter(
        (item): item is string => Boolean(item),
      );
    case 'story':
      return [section.heading, section.body, section.aside].filter((item): item is string => Boolean(item));
    case 'fitGuide':
      return [
        section.heading,
        section.body,
        `Works best when: ${section.worksBest}`,
        `Sellogram hands over when: ${section.handoff}`,
        `What the owner gets: ${section.ownerGets}`,
      ];
    case 'promiseGrid':
      return [section.heading, ...section.items.map((item) => `${item.title}: ${item.body}`)];
    case 'beforeAfter':
      return [
        section.heading,
        ...section.content.before.map((item) => `Before Sellogram: ${item}`),
        ...section.content.after.map((item) => `After Sellogram: ${item}`),
      ];
    case 'scenarios':
      return section.items.flatMap((item) => [
        `Customer asks: ${item.customer}`,
        `Sellogram answers: ${item.sellogram}`,
        `Owner control: ${item.ownerNote}`,
      ]);
    case 'archetype':
      return [
        `${section.name}: ${section.role}`,
        ...section.day.map((item) => `Daily flow: ${item}`),
        ...section.sellogramHelps.map((item) => `Sellogram helps: ${item}`),
      ];
    case 'legal':
      return [section.heading, ...section.paragraphs];
    case 'pricingMatrix':
      return ['Pricing matrix: Free, Pro, and Elite plan details match the website pricing table.'];
    case 'faq':
      return section.items.map((item) => `FAQ: ${item.question} ${item.answer}`);
  }
};

/**
 * /llms.txt: concise factual summary with one link per page. Follows the
 * emergent llms.txt convention (title, blockquote summary, link list).
 */
export const generateLlmsTxt = (siteUrl: string): string => {
  const out: string[] = [];
  out.push(line('# Sellogram'));
  out.push(line('> Sellogram answers Instagram DMs for Kenyan shops. It replies to product, stock, and delivery questions, builds carts, and guides customers to M-Pesa-ready checkout. Built in Kenya, priced in KES.'));
  out.push(line(''));
  for (const route of [...ROUTES].sort(byPriority)) {
    out.push(line(`- [${stripBrand(route.title)}](${siteUrl}${route.path}): ${route.description}`));
  }
  out.push(line(''));
  return out.join('');
};

/**
 * /llms-full.txt: expanded version. Same source data, more room per page so an
 * LLM can read a fuller picture without following every link. Still generated,
 * never hand-maintained prose.
 */
export const generateLlmsFullTxt = (siteUrl: string): string => {
  const out: string[] = [];
  out.push(line('# Sellogram — full guide'));
  out.push(line('> Sellogram answers Instagram DMs for Kenyan shops that sell in the DMs. It handles product questions, pricing, stock, sizes, and delivery, builds carts, and guides customers to M-Pesa-ready checkout. It hands tricky conversations back to the shop owner. Built in Kenya, priced in KES.'));
  out.push(line(''));
  out.push(line('## Pages'));
  out.push(line(''));
  for (const route of [...ROUTES].sort(byPriority)) {
    const page = PAGES[route.path];
    out.push(line(`### ${stripBrand(route.title)}`));
    out.push(line(`URL: ${siteUrl}${route.path}`));
    out.push(line(route.description));
    if (page) {
      out.push(line(`Hero: ${page.hero.h1}. ${page.hero.intro}`));
      for (const section of page.sections) {
        for (const text of sectionLines(section)) {
          out.push(line(`- ${text}`));
        }
      }
    }
    out.push(line(''));
  }
  return out.join('');
};
