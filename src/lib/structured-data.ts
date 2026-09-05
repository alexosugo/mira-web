import { PLANS, type ContentSection, type FaqItem, type PageContent } from '../content/pages';

interface OfferNode {
  readonly '@type': 'Offer';
  readonly name: string;
  readonly priceCurrency?: 'KES';
  readonly price?: string;
  readonly description: string;
}

interface FaqQuestionNode {
  readonly '@type': 'Question';
  readonly name: string;
  readonly acceptedAnswer: {
    readonly '@type': 'Answer';
    readonly text: string;
  };
}

interface FaqPageNode {
  readonly '@type': 'FAQPage';
  readonly mainEntity: readonly FaqQuestionNode[];
}

interface ProductOfferNode {
  readonly '@type': 'Product';
  readonly name: 'Sellogram';
  readonly offers: readonly OfferNode[];
}

export type PageJsonLdNode = FaqPageNode | ProductOfferNode;

const faqItemsFromSections = (sections: readonly ContentSection[]): readonly FaqItem[] =>
  sections.flatMap((section) => (section.kind === 'faq' ? section.items : []));

const offerPrice = (price: string): string | undefined => {
  const digits = price.replace(/[^\d]/g, '');
  return digits.length > 0 ? digits : undefined;
};

const pricingOffers = (): ProductOfferNode => ({
  '@type': 'Product',
  name: 'Sellogram',
  offers: PLANS.map((plan) => {
    const price = offerPrice(plan.price);
    return {
      '@type': 'Offer',
      name: plan.name,
      priceCurrency: price ? 'KES' : undefined,
      price,
      description: plan.description,
    };
  }),
});

const faqPage = (items: readonly FaqItem[]): FaqPageNode => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const jsonLdForPage = (page: PageContent): readonly PageJsonLdNode[] => {
  const nodes: PageJsonLdNode[] = [];
  if (page.path === '/pricing') nodes.push(pricingOffers());

  const faqItems = faqItemsFromSections(page.sections);
  if (faqItems.length > 0) nodes.push(faqPage(faqItems));

  return nodes;
};
