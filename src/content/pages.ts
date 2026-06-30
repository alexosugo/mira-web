// Single typed source of truth for page content. Canonical shared data
// (pricing plans, how-it-works steps) lives here so the homepage islands and
// the dedicated content pages read the same values and cannot drift.
// Route files are thin wrappers: they pull a PageContent from PAGES and a Route
// from lib/routes, then hand both to ContentLayout.

// ---------------------------------------------------------------------------
// Canonical shared data (sourced by homepage islands AND dedicated pages)
// ---------------------------------------------------------------------------

export interface Plan {
  key: string;
  name: string;
  /** Small qualifier rendered before the price, e.g. "from". */
  pricePrefix?: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  featuresLead?: string;
  cta: string;
  footnote?: string;
  /** The highlighted tier gets the filled button and the dawn tag. */
  isHighlighted?: boolean;
}

/** Pricing plans. Source of truth for the homepage Pricing island and /pricing. */
export const PLANS: Plan[] = [
  {
    key: 'free',
    name: 'Free',
    price: 'KES 0',
    priceNote: '/mo',
    description: 'Try Mira on your own shop. No card needed.',
    features: [
      'Mira answers your Instagram DMs and comments',
      'Carts and checkout guidance inside the DM',
      'Up to 10 customer conversations a month',
    ],
    cta: 'Get started',
    footnote: 'No card details asked, ever.',
  },
  {
    key: 'pro',
    name: 'Pro',
    pricePrefix: 'from',
    price: 'KES 3,500',
    priceNote: '/mo',
    description: 'For shops with steady DM traffic. Every message answered, day and night.',
    featuresLead: 'Everything in Free, plus:',
    features: [
      'Unlimited customer conversations',
      'Replies without Mira branding',
      'See what customers ask most',
      'Email support from the Mira team',
    ],
    cta: 'Become pro',
    footnote: 'Scales with your shop as you grow.',
    isHighlighted: true,
  },
  {
    key: 'elite',
    name: 'Elite',
    price: 'Custom',
    description: 'For bigger shops and teams. A plan shaped around how you sell.',
    featuresLead: 'Everything in Pro, plus:',
    features: [
      'Onboarding for you and your team',
      'A dedicated contact who knows your shop',
      'Priority help with technical questions',
      'Custom integrations',
    ],
    cta: "Let's chat",
    footnote: 'Priced to fit your shop.',
  },
];

export interface Step {
  number: string;
  title: string;
  description: string;
}

/** How-it-works steps. Source of truth for the homepage island and /how-it-works. */
export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Connect your Instagram',
    description: 'Link your Instagram Business account. Takes less than two minutes.',
  },
  {
    number: '02',
    title: 'Mira learns your catalog',
    description: 'Mira reads your products and learns how to talk about them like you would.',
  },
  {
    number: '03',
    title: 'Go live',
    description: 'Mira starts replying to DMs. You step in whenever you want.',
  },
];

/** Reassurance line shown at the scariest step (handing over your Instagram). */
export const DM_SCOPE_REASSURANCE = "Mira reads only your shop's DMs, nothing else on your account.";

// ---------------------------------------------------------------------------
// Content page schema (consumed by ContentLayout)
// ---------------------------------------------------------------------------

export interface Cta {
  label: string;
  href: string;
  /** Mixpanel cta_clicked button_id. */
  trackingKey: string;
  variant?: 'primary' | 'secondary';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ListItem {
  title: string;
  body: string;
}

export interface BeforeAfterContent {
  before: string[];
  after: string[];
}

export interface ScenarioItem {
  customer: string;
  mira: string;
  ownerNote: string;
}

export type ContentSection =
  | { kind: 'prose'; kicker?: string; heading?: string; body: string }
  | { kind: 'split'; kicker?: string; heading: string; body: string }
  | { kind: 'list'; kicker?: string; heading?: string; items: string[] }
  | { kind: 'numbered'; kicker?: string; heading?: string; items: ListItem[] }
  | { kind: 'story'; kicker?: string; heading: string; body: string; aside?: string }
  | {
      kind: 'fitGuide';
      kicker?: string;
      heading: string;
      body: string;
      worksBest: string;
      handoff: string;
      ownerGets: string;
    }
  | { kind: 'promiseGrid'; kicker?: string; heading: string; items: ListItem[] }
  | { kind: 'beforeAfter'; kicker?: string; heading: string; content: BeforeAfterContent }
  | { kind: 'scenarios'; kicker?: string; heading: string; items: ScenarioItem[] }
  | { kind: 'archetype'; name: string; role: string; day: string[]; miraHelps: string[] }
  | { kind: 'legal'; kicker?: string; heading: string; paragraphs: string[] }
  | { kind: 'pricingMatrix' }
  | { kind: 'faq'; items: FaqItem[] };

export interface PageHero {
  kicker?: string;
  h1: string;
  intro: string;
  primaryCta?: Cta;
  secondaryLink?: { label: string; href: string };
}

export interface PageContent {
  /** Canonical path; also the BaseLayout canonical URL path. */
  path: string;
  hero: PageHero;
  sections: ContentSection[];
}

/**
 * Page body registry, keyed by path. Populated by slices 2 and 3. Slice 1
 * establishes the type only; route files in later slices add entries here.
 */
const appCta: Cta = {
  label: 'Get started',
  href: 'https://app.withmira.co',
  trackingKey: 'content_get_started',
};

const talkCta: Cta = {
  label: 'Talk to Mira',
  href: 'mailto:hello@withmira.co',
  trackingKey: 'content_contact_email',
  variant: 'secondary',
};

const faq = (items: FaqItem[]): ContentSection => ({ kind: 'faq', items });

export const PAGES: Record<string, PageContent> = {
  '/pricing': {
    path: '/pricing',
    hero: {
      kicker: 'Pricing',
      h1: 'Pricing for Instagram shops that sell in the DMs',
      intro:
        'Start free, then choose the plan that matches how busy your DMs are. The full matrix is here, using the same plan details shown on the homepage.',
      primaryCta: appCta,
      secondaryLink: { label: 'Ask about Elite', href: 'modal:elite' },
    },
    sections: [
      { kind: 'pricingMatrix' },
      {
        kind: 'story',
        kicker: 'How to think about price',
        heading: 'Price Mira against missed DMs, not software',
        body:
          'The launch plan is clear about the real test: a shop should only pay after Mira has shown that faster replies save time and keep buyers moving. Free is for trying Mira on your own shop. Pro is for steady DM traffic. Elite is for shops that want onboarding, a dedicated contact, and custom help around how they sell.',
        aside:
          'A customer conversation is one shopper thread Mira helps with. It can include product questions, cart help, delivery questions, checkout guidance, and a handoff when the answer needs you.',
      },
      faq([
        { question: 'Is there a free plan?', answer: 'Yes. Free includes up to 10 customer conversations a month.' },
        { question: 'Do I need a card to start?', answer: 'No. The Free plan does not ask for card details.' },
        { question: 'Can I upgrade later?', answer: 'Yes. You can start free and move to Pro when your DMs grow.' },
        { question: 'What happens when Mira needs me?', answer: 'Mira hands the conversation back with context so you can step in.' },
        { question: 'Do you support M-Pesa checkout?', answer: 'Mira guides customers toward an M-Pesa-ready checkout link.' },
      ]),
    ],
  },
  '/how-it-works': {
    path: '/how-it-works',
    hero: {
      kicker: 'How it works',
      h1: 'How Mira starts selling in your Instagram DMs',
      intro:
        'Mira works best when setup feels careful, not rushed. You connect Instagram, review the catalog, test real DMs, and only then let Mira reply to customers.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'numbered',
        kicker: 'Setup',
        heading: 'The simple version',
        items: STEPS.map((step) => ({ title: step.title, body: step.description })),
      },
      {
        kind: 'story',
        kicker: 'Concierge setup',
        heading: 'The careful version is what builds trust',
        body:
          'A shop owner is not just connecting another tool. They are trusting Mira with customer conversations. The safer setup is hands-on: connect Instagram together, review the catalog with the owner, fix prices before going live, and run test conversations from recent posts.',
        aside:
          'Mira should never invent a price. When the catalog does not have enough detail, the right answer is to ask the owner and hand over.',
      },
      {
        kind: 'promiseGrid',
        kicker: 'Owner control',
        heading: 'What happens before Mira speaks for your shop',
        items: [
          { title: 'Catalog review', body: 'Products, prices, sizes, and stock details are checked before Mira starts replying to real customers.' },
          { title: 'Test mode', body: 'You can send sample DMs and see exactly how Mira answers before customers experience it.' },
          { title: 'Clean handoff', body: 'Questions about refunds, discounts, disputes, unusual delivery, or unclear products go back to you.' },
          { title: 'Weekly value proof', body: 'Mira should make the saved work visible: DMs handled, handoffs sent, and repeat questions answered.' },
        ],
      },
      { kind: 'prose', kicker: 'Access', heading: 'DM scope', body: DM_SCOPE_REASSURANCE },
      faq([
        { question: 'How long does setup take?', answer: 'Connecting an Instagram Business account takes less than two minutes. Catalog review takes longer because accuracy matters.' },
        { question: 'Can I take over a conversation?', answer: 'Yes. You can step in whenever a DM needs your judgment.' },
        { question: 'What does Mira read?', answer: DM_SCOPE_REASSURANCE },
      ]),
    ],
  },
  '/instagram-dm-automation': {
    path: '/instagram-dm-automation',
    hero: {
      kicker: 'Instagram DM automation',
      h1: 'Instagram DM replies that help customers buy',
      intro:
        'Mira is for the owner who opens Instagram and sees the same questions stacked up: price, size, delivery, location, availability, and whether the item can be paid for now.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'story',
        kicker: 'The real job',
        heading: 'A customer is ready for minutes, not hours',
        body:
          'When a shopper asks “how much?” under a fresh post, they are usually comparing options right now. A slow reply can turn a warm buyer into a silent thread. Mira keeps the first answer moving while the owner is packing orders, eating dinner, or asleep.',
        aside:
          'The promise is speed and missed-DM reduction. Revenue lift is something to measure with each shop, not something to claim upfront.',
      },
      {
        kind: 'promiseGrid',
        heading: 'What Mira can answer in the DM',
        items: [
          { title: 'Product facts', body: 'Prices, stock, sizes, colors, product notes, and simple recommendations from the shop catalog.' },
          { title: 'Buying next steps', body: 'Cart details, delivery basics, and guidance toward an M-Pesa-ready checkout link.' },
          { title: 'Customer confidence', body: 'Short replies that sound like a helpful shop assistant, with clear limits when Mira is unsure.' },
          { title: 'Owner handoff', body: 'The unusual conversations come back to the owner with context instead of a guessed answer.' },
        ],
      },
    ],
  },
  '/integrations/instagram': {
    path: '/integrations/instagram',
    hero: {
      kicker: 'Instagram integration',
      h1: 'Connect Mira to your Instagram shop',
      intro:
        'Mira connects through the official Instagram path for shop accounts. It should never ask for your Instagram password, and you stay in control of the connection.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'promiseGrid',
        kicker: 'Before connection',
        heading: 'What your shop needs',
        items: [
          { title: 'Instagram Business account', body: 'Mira is built for shops using Instagram professionally, with DMs as a buying channel.' },
          { title: 'Catalog source', body: 'Mira needs product details it can learn from: posts, catalog data, or a shop list you review.' },
          { title: 'Owner permission', body: 'The shop owner approves the connection and can disconnect when needed.' },
          { title: 'Product review', body: 'The catalog should be checked before Mira goes live, especially prices and stock-sensitive details.' },
        ],
      },
      {
        kind: 'story',
        kicker: 'After connection',
        heading: 'Mira works inside the way your customers already buy',
        body:
          'Customers still find you from posts, stories, and your profile. They still ask in DMs. Mira reads the shop DMs it is allowed to handle, answers from your shop details, and brings you in when the conversation needs a human decision.',
        aside:
          'Instagram is the current Mira channel. WhatsApp and other channels should not be treated as live coverage on this site.',
      },
      {
        kind: 'list',
        heading: 'Questions owners usually ask before connecting',
        items: [
          'Will Mira ask for my password? No. Connection should happen through the official Instagram and Meta login path.',
          'Can Mira read my personal messages? Mira is scoped to your shop DMs.',
          'Can I switch it off? Yes. The owner should be able to disconnect or pause Mira.',
          'What if a product has no price? Mira should hand over instead of making one up.',
        ],
      },
    ],
  },
      '/features/product-answers': {
    path: '/features/product-answers',
    hero: {
      //kicker: 'Product answers',
      h1: 'Stop answering the same questions all day',
      intro:
        "Every buyer asks the same things. How much, what sizes, is it in stock, do you deliver. Mira answers all of it from your shop's details — in seconds, not hours.",
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Before Mira, you type every reply. After Mira, the shop replies for you.',
        content: {
          before: [
            'You post. The questions flood in. How much, what size, still available, do you deliver.',
            'You answer the same things, over and over, while packing orders and editing posts.',
            "Stock changes. A caption goes stale. Now you're correcting yourself in 10 threads.",
            'Every late response loses you customers — they tell their friends, sales dip.',
          ],
          after: [
            'Mira answers from your prices, sizes, and stock. Nothing else.',
            "Buyers get a reply in seconds. You're free to pack, post, source, or sleep.",
            "When something's missing or unclear, Mira asks you instead of guessing.",
            'You start to see what people ask most — so you know what to fix in your shop.',
          ],
        },
      },
      {
        kind: 'story',
        //kicker: 'Catalog trust',
        heading: 'Every answer comes straight from your shop',
        body:
          "Mira reads your posts, your captions, your shop page — prices, sizes, stock, ingredients, everything you've already put up. When a buyer asks, the answer comes from what's there. No extra setup, no scripts to write.",
        aside:
          'The more detail you put on your page, the better Mira answers. Post your prices, list your sizes, add your delivery areas — Mira picks it all up.',
      },
      {
        kind: 'promiseGrid',
        //kicker: 'What Mira answers',
        heading: 'The questions buyers ask before they buy',
        items: [
          { title: 'Price and stock', body: '"How much?" and "still available?" — answered from your details.' },
          { title: 'Sizes and options', body: 'Sizes, colors, shades, flavors, bundles — whatever you have listed.' },
          { title: 'Ingredients and safety', body: "Allergens, ingredients, materials, usage — shared when they're on your page, sent to you when they're not." },
          { title: 'Delivery', body: 'Pickup, delivery areas, cutoff times — shared when you have set them up.' },
        ],
      },
      {
        kind: 'scenarios',
        //kicker: 'DMs Mira handles',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'How much is the vanilla musk oil?',
            mira: 'The vanilla musk oil is KES 1,200 for 30ml. Warm vanilla with a musk base. 3 left in stock. Want delivery or pickup?',
            ownerNote: "If the price or size isn't on the page, Mira asks you before saying anything.",
          },
          {
            customer: 'Does the granola have nuts?',
            mira: 'Yes — contains almonds and walnuts. 250g packs, KES 450 each. Fresh batch from Monday. Delivery within Nairobi or pickup in Westlands.',
            ownerNote: "Allergen questions get answered from what's on your page. Anything missing goes to you.",
          },
          {
            customer: 'Can this body butter clear dark spots?',
            mira: "It's a shea butter base with cocoa and vanilla — 200ml, KES 800. Great for dry skin. For dark spots, let me bring in the shop owner to advise you properly.",
            ownerNote: 'Skin, medical, and results claims are yours to make. Mira leaves them to you.',
          },
        ],
      },
      faq([
        { question: 'Where do the answers come from?', answer: "Your posts, your captions, your shop page. That's where everything comes from." },
        { question: "What if a price isn't set?", answer: 'Mira asks you instead of guessing.' },
        { question: 'Can it answer allergen questions?', answer: "Yes, if the details are on your page. If not, the question comes to you." },
        { question: 'Can it answer delivery questions?', answer: "Yes — pickup, delivery areas, cutoffs. Whatever you've put on your shop." },
      ]),
    ],
  },
  '/features/orders-and-checkout': {
    path: '/features/orders-and-checkout',
    hero: {
      kicker: 'Orders and checkout',
      h1: 'From DM question to ready checkout',
      intro:
        'Mira helps the shopper move from "how much?" to a clear cart: item, size, scent, flavor, quantity, delivery notes, and an M-Pesa-ready checkout link.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        //kicker: 'Owner pain',
        heading: 'Before Mira, checkout gets messy in the thread. After Mira, the order is clear before payment.',
        content: {
          before: [
            'The customer asks one question, then the owner has to collect item, size, quantity, delivery area, payment timing, and sometimes pickup preference.',
            'Threads get messy when a buyer changes a shade, adds cookies, swaps a scent, or asks for delivery after the owner already replied.',
            'The owner can lose the order detail while jumping between Instagram, M-Pesa, riders, and packaging.',
            'Customers go quiet when the next step is unclear or the owner takes too long to pull the order together.',
          ],
          after: [
            'Mira keeps item, variant, quantity, and delivery details in one buyer thread.',
            'The shopper gets guided toward an M-Pesa-ready checkout link when the order is clear.',
            'Custom requests, discounts, delivery exceptions, and payment confirmation still go to the owner.',
            'The owner receives a cleaner handoff with what the customer wants and what Mira already confirmed.',
          ],
        },
      },
      {
        kind: 'numbered',
        kicker: 'Buying flow',
        heading: 'The DM becomes an order thread',
        items: [
          { title: 'Confirm the item', body: 'Mira checks the product, size, color, and quantity before treating the shopper as ready to buy.' },
          { title: 'Keep the cart together', body: 'The order details stay in one thread, so the shopper can review what they picked.' },
          { title: 'Move to checkout', body: 'Mira guides the shopper toward an M-Pesa-ready checkout link. It does not claim that payment finishes inside Instagram.' },
          { title: 'Bring in the owner', body: 'Refunds, special delivery requests, discounts, and disputes are owner decisions.' },
        ],
      },
      {
        kind: 'story',
        heading: 'Mira reduces the messy middle',
        body:
          'Instagram selling often breaks between the first question and the final order: the owner loses the thread, the customer asks the same thing twice, or delivery details arrive too late. Mira keeps the buying steps in sequence, then hands over where judgment matters.',
        aside:
          'Mira never confirms a payment and never confirms delivery on behalf of the shop. Those moments need owner or payment-system truth.',
      },
      {
        kind: 'scenarios',
        kicker: 'Checkout DMs',
        heading: 'Mira keeps small order details from scattering',
        items: [
          {
            customer: 'I want the 50ml oud and the pocket spray. How do I pay?',
            mira: 'Mira can confirm the selected items, quantity, delivery area, and checkout next step.',
            ownerNote: 'Payment confirmation, discounts, and out-of-stock substitutions stay owner-controlled.',
          },
          {
            customer: 'Can I order two banana breads for Saturday morning?',
            mira: 'Mira can collect quantity, flavor, date, pickup or delivery area, and approved cutoff details.',
            ownerNote: 'Special baking slots, bulk pricing, and late orders go back to the owner.',
          },
          {
            customer: 'Can you deliver the body butter to Kilimani today?',
            mira: 'Mira can share approved delivery basics and collect the item, size, scent, and delivery area.',
            ownerNote: 'Same-day exceptions, rider coordination, and payment confirmation need the owner or shop system.',
          },
        ],
      },
      faq([
        { question: 'Does payment happen inside Instagram?', answer: 'Mira guides the shopper to an M-Pesa-ready checkout link.' },
        { question: 'Can Mira confirm size and quantity?', answer: 'Yes. Mira can confirm size, quantity, and cart details before checkout.' },
        { question: 'Can Mira confirm payment?', answer: 'No. Payment confirmation needs the shop owner or payment-system truth.' },
      ]),
    ],
  },
  '/features/human-handoff': {
    path: '/features/human-handoff',
    hero: {
      kicker: 'Human handoff',
      h1: 'Mira hands tricky DMs back to you',
      intro:
        'A good assistant knows when to stop. Mira handles repeat questions, then brings the owner back when the reply needs judgment, permission, policy, or care.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        //kicker: 'Owner pain',
        heading: 'Before Mira, every tricky DM interrupts you cold. After Mira, handoffs arrive with context.',
        content: {
          before: [
            'The owner sees a DM that says "can you do this today?" and has to scroll up to understand what the customer wanted.',
            'Complaints, refunds, special delivery, custom orders, and discounts interrupt the day even when Mira could have handled the basics first.',
            'A bot that guesses on sensitive questions can make the shop look careless.',
            'A human handoff that has no context can feel like extra work instead of help.',
          ],
          after: [
            'Mira answers repeat facts first, then hands over the moments that need owner judgment.',
            'The owner sees the customer ask, what Mira answered, and why Mira stopped.',
            'Sensitive categories stay protected: skin claims, food allergens, fragrance authenticity, refunds, complaints, and custom requests.',
            'The customer does not get a made-up answer when Mira is unsure.',
          ],
        },
      },
      {
        kind: 'promiseGrid',
        kicker: 'When Mira stops',
        heading: 'Handoffs protect the shop relationship',
        items: [
          { title: 'Unclear product request', body: 'When the shopper asks for something the catalog does not identify, Mira asks the owner.' },
          { title: 'Special discount', body: 'A discount changes the sale. Mira should not promise one without the owner.' },
          { title: 'Refund or complaint', body: 'Upset customers need a human response, not a cheerful stock answer.' },
          { title: 'Risk-sensitive detail', body: 'Allergens, skin reactions, fragrance authenticity, payment confirmation, and unusual delivery need owner truth.' },
        ],
      },
      {
        kind: 'story',
        kicker: 'Context matters',
        heading: 'A handoff should not make the owner start from zero',
        body:
          'The owner should see what the customer asked, what Mira already answered, and why the conversation came back. That is what makes handoff feel like help instead of interruption.',
        aside:
          'The launch plan tracks owner handoff response time because a slow handoff can feel worse than no assistant at all.',
      },
      {
        kind: 'scenarios',
        kicker: 'Handoff examples',
        heading: 'Good handoff protects speed and trust at the same time',
        items: [
          {
            customer: 'Is this perfume original or tester stock?',
            mira: 'Mira can share approved product facts and then hand over authenticity or sourcing questions.',
            ownerNote: 'Fragrance trust is fragile. Claims about source, batch, tester, or authenticity need the owner.',
          },
          {
            customer: 'My child has a nut allergy. Can they eat this?',
            mira: 'Mira should not improvise. It can share approved allergen notes if present, then bring in the owner.',
            ownerNote: 'Food safety and allergen questions need approved detail and human care.',
          },
          {
            customer: 'Can this oil grow my hairline back?',
            mira: 'Mira avoids treatment claims and hands over after sharing approved product basics.',
            ownerNote: 'Skincare and haircare makers need claim control, especially around hair growth, acne, eczema, and reactions.',
          },
        ],
      },
      faq([
        { question: 'When does Mira hand over?', answer: 'Mira hands over when the conversation needs the shop owner to decide.' },
        { question: 'What does the owner see?', answer: 'The owner gets the conversation context so they can reply quickly.' },
        { question: 'Does Mira guess when it is unsure?', answer: 'No. Uncertain answers become handoffs.' },
      ]),
    ],
  },
      '/use-cases/daily-drop-shops': {
    path: '/use-cases/daily-drop-shops',
    hero: {
      kicker: 'Daily-drop shops',
      h1: 'Built for daily-drop shops that sell from Instagram',
      intro:
        "You post a drop. The questions pile up — price, size, is it available, do you deliver. Mira answers them all, in seconds, from your own details. Buyers don't wait. You don't type.",
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Before Mira, the DMs run your day. After Mira, you run the DMs.',
        content: {
          before: [
            'You post a drop. Within minutes: how much, what sizes, where do you deliver.',
            "You're packing, replying, trying not to miss the buyer who's ready now.",
            'Late-night DMs sit till morning. By then the buyer bought somewhere else.',
            'Your shop looks slow — because every reply is typed by hand.',
          ],
          after: [
            'Mira answers the first questions in seconds — price, size, stock — from your details.',
            'The repeat stuff gets handled while you pack, post, or sleep.',
            'Discounts, holds, refunds, special requests — those come to you with the context.',
            "You can see what Mira handled each week. No more guessing if it's worth it.",
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Wanjiru',
        role: '12k followers. Nairobi. Posts almost every day. Replies to every DM herself.',
        day: [
          'Posts a new drop. Gets price checks before lunch.',
          'Answers size and delivery questions between packing orders.',
          'Misses the late-night DMs. Wakes up to buyers who went quiet.',
          'Stresses about giving the wrong answer and losing trust.',
        ],
        miraHelps: [
          'Answers the first questions in seconds — price, size, stock.',
          'Stops the same questions from eating her whole day.',
          'Brings discounts, holds, and tricky stuff to her instead of guessing.',
          'Shows her the week: how many DMs handled, how many handed over.',
        ],
      },
      {
        kind: 'promiseGrid',
        kicker: 'What Mira adds',
        heading: 'A shop assistant that does not sleep',
        items: [
          { title: 'Replies in seconds', body: 'Price, size, stock, delivery — answered before the buyer loses interest.' },
          { title: 'Knows your shop', body: 'Mira answers from your details, so it never asks you the same thing twice.' },
          { title: 'Knows when to ask you', body: 'If something needs your call — a discount, a hold, a refund — Mira brings it to you.' },
          { title: 'Shows you the work', body: 'Each week, you see how many DMs Mira handled and what it sent back to you.' },
        ],
      },
      {
        kind: 'scenarios',
        //kicker: 'DMs Mira handles',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'Still available? Can you hold the brown jacket till 5?',
            mira: "The brown jacket is KES 1,800. Medium and large are in stock. But holds are your call — Mira sends that part back to you instead of promising something it can't keep.",
            ownerNote: 'Holds affect other buyers, so they always go back to you.',
          },
          {
            customer: 'Can a rider bring it to Kasarani today?',
            mira: "Mira shares your delivery notes, confirms the item, and points them to checkout — Kasarani included, if that's a route you cover.",
            ownerNote: 'Same-day rider costs and late pickups stay with you to approve.',
          },
          {
            customer: 'Do you have size 38 or medium in this drop?',
            mira: "Mira checks what's in stock — size 38 and medium — and tells them what's available before they lose interest and move on.",
            ownerNote: 'If stock is moving fast or the post is outdated, Mira checks with you first.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        kicker: 'Good fit',
        heading: 'Made for shops with too many DMs to answer alone',
        body:
          "If you're getting 15 or more product questions a day, posting often, and hearing the same things on repeat — that's where Mira makes the biggest difference. Below that, you can still use it. It just helps more when the DM load is heavy.",
        worksBest:
          'Shops that post often, sell from Instagram, and spend hours every day answering price, size, stock, and delivery questions.',
        handoff:
          'Discounts, refunds, holds, missing prices, unclear stock — Mira will hand over anything that needs your call.',
        ownerGets:
          "Fewer repeat DMs. Clearer context on every conversation that comes to you. And a weekly tally — how many DMs Mira handled, how many became owner handoffs — so you always know it's worth it.",
      },
      faq([
        { question: 'Does Mira learn from my posts?', answer: "Yes. It picks up your prices, sizes, and details from what's on your page. Anything missing comes to you." },
        { question: 'Can I still reply myself?', answer: 'Always. Mira handles the repeats. You handle the rest.' },
      ]),
    ],
  },
  '/use-cases/fashion': {
    path: '/use-cases/fashion',
    hero: {
      kicker: 'Fashion shops',
      h1: 'DM help for fashion and thrift shops',
      intro:
        'For curated thrift, fashion drops, shoes, bags, and outfit sellers whose customers need a fast answer before the piece sells out or the buyer moves on.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        kicker: 'The money shot',
        heading: 'Before Mira, one item creates twenty threads. After Mira, each buyer gets the right next step.',
        content: {
          before: [
            'A dress, jacket, or shoe drop gets comments and DMs at the same time.',
            'Customers ask size, color, price, pickup, delivery, and whether the exact piece is still available.',
            'The owner keeps switching between selling, packing, editing posts, and apologizing for late replies.',
            'When a one-off item sells, stale DMs keep asking for it because the owner cannot update every thread quickly.',
          ],
          after: [
            'Mira answers approved size, color, price, and delivery details from the catalog.',
            'If a piece is sold or uncertain, Mira can point to approved alternatives or ask the owner.',
            'Ready buyers get cart guidance with item, size, quantity, and delivery notes kept together.',
            'The owner handles the high-value calls: styling nuance, discount decisions, and stock uncertainty.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Achieng, curated thrift seller',
        role: 'Nairobi thrift seller, posts new pieces three times a week, sells mostly from stories',
        day: [
          'Customers ask for waist size, fabric feel, exact color, and whether a piece is still available.',
          'Fast buyers want delivery to CBD, Westlands, Kasarani, or pickup details.',
          'A single item can sell out while ten more shoppers are still asking about it.',
          'The owner needs Mira to be careful because stock changes quickly.',
        ],
        miraHelps: [
          'Answers approved size, color, price, and delivery basics from the catalog.',
          'Points shoppers to available alternatives when the catalog supports it.',
          'Avoids promising stock if the item needs owner confirmation.',
          'Builds a cart when the shopper is ready to buy.',
        ],
      },
      {
        kind: 'promiseGrid',
        kicker: 'Powers Mira adds',
        heading: 'Fashion questions Mira is built to reduce',
        items: [
          { title: 'Size checks', body: '“Do you have medium?” and “will this fit size 10?” can be answered from product details.' },
          { title: 'Color and styling', body: 'Mira can help with simple catalog-backed recommendations, then hand over for personal styling calls.' },
          { title: 'Fast stock changes', body: 'When stock is uncertain, Mira should check with the owner rather than promise availability.' },
          { title: 'Checkout readiness', body: 'Once the shopper picks a piece, Mira keeps the item, size, quantity, and delivery notes together.' },
        ],
      },
      {
        kind: 'scenarios',
        kicker: 'DMs Mira can reduce',
        heading: 'Fashion DMs become buyer-ready threads',
        items: [
          {
            customer: 'Is this UK 8 or small? Can you send waist measurements?',
            mira: 'Mira answers approved size, waist, hip, length, and fit notes when those details are in the catalog, then asks whether the buyer wants to checkout.',
            ownerNote: 'Fit advice, missing measurements, and try-on judgment should go to the owner.',
          },
          {
            customer: 'Is the black pair still available for CBD pickup?',
            mira: 'Mira checks approved stock and pickup notes, then keeps the item, size, and pickup area together in the thread.',
            ownerNote: 'One-off thrift pieces and fast-moving shoes need confirmation when stock is not freshly approved.',
          },
          {
            customer: 'Is the denim jacket thrifted or new, and is the color the same as the photo?',
            mira: 'Mira can share approved condition, color, fabric, and care notes, plus any daylight-photo disclaimer the shop uses.',
            ownerNote: 'Condition disputes, extra videos, and subjective color calls stay owner-led.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        kicker: 'Good fit',
        heading: 'Fashion sellers need speed and restraint at the same time',
        body:
          'The best fashion page for Mira already has demand. The owner is not trying to create interest from zero; they are trying to stop losing interested buyers to slow replies and messy follow-up.',
        worksBest:
          'Curated thrift, shoes, bags, and outfit sellers with repeat questions about size, measurements, condition, color, pickup, delivery, and whether a one-off piece is still available.',
        handoff:
          'Mira should hand over styling judgment, bargaining, damaged-item concerns, custom sourcing, try-on video requests, and stock that has not been confirmed.',
        ownerGets:
          'The owner gets buyer-ready threads with item, size, measurements, delivery area, and the exact point where human judgment is needed.',
      },
      faq([
        { question: 'Can Mira answer fashion size questions?', answer: 'Yes, when sizes are part of the approved product details.' },
        { question: 'Can Mira handle sold-out pieces?', answer: 'Mira can answer from approved stock details or hand over when stock is uncertain.' },
        { question: 'Can Mira give styling advice?', answer: 'Mira can make simple catalog-backed suggestions. Personal styling calls should go to the owner.' },
      ]),
    ],
  },
  '/use-cases/beauty': {
    path: '/use-cases/beauty',
    hero: {
      kicker: 'Beauty shops',
      h1: 'DM help for beauty shops selling on Instagram',
      intro:
        'For beauty sellers answering shade, stock, bundle, delivery, and recommendation questions all day. Mira keeps replies specific while respecting product and health boundaries.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        kicker: 'The money shot',
        heading: 'Before Mira, every shade question waits for the owner. After Mira, safe product facts move first.',
        content: {
          before: [
            'Customers ask which shade is available, what comes in a bundle, and whether delivery can happen today.',
            'The owner repeats the same stock and price answers while trying to avoid risky product claims.',
            'A buyer who only needed a quick confirmation can disappear before the owner replies.',
            'Checkout details get scattered across DMs when small orders pile up.',
          ],
          after: [
            'Mira answers shade, stock, bundle, price, and delivery basics from approved product details.',
            'Recommendations stay tied to catalog facts instead of broad skin, health, or guaranteed-result claims.',
            'Ready buyers get guided toward checkout with the selected item, quantity, and delivery notes clear.',
            'Sensitive, uncertain, or high-trust questions go back to the owner with context.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Njeri, beauty and accessories seller',
        role: 'Nairobi beauty seller, runs product drops from Instagram, closes orders in the DM',
        day: [
          'Customers ask which shade is available, what pairs with what, and whether delivery can happen today.',
          'Some buyers need a quick bundle suggestion before paying.',
          'The owner has to avoid promising results that the product cannot guarantee.',
          'Checkout details need to stay tidy because small orders can pile up fast.',
        ],
        miraHelps: [
          'Answers shade, stock, price, bundle, and delivery basics from approved product details.',
          'Keeps recommendations tied to catalog facts instead of broad claims.',
          'Hands over sensitive or uncertain product questions.',
          'Guides ready buyers toward an M-Pesa-ready checkout link.',
        ],
      },
      {
        kind: 'promiseGrid',
        kicker: 'Powers Mira adds',
        heading: 'Beauty shops get speed without careless claims',
        items: [
          { title: 'Shade and stock answers', body: 'Mira answers availability, price, quantity, and bundle basics when the shop has approved the details.' },
          { title: 'Safer recommendations', body: 'Suggestions stay tied to known catalog facts instead of promising skin results or medical outcomes.' },
          { title: 'Cleaner checkout', body: 'Selected product, bundle, quantity, and delivery notes stay organized before checkout.' },
          { title: 'Sensitive handoff', body: 'Skin reactions, complaints, unusual usage questions, and uncertain product claims go back to the owner.' },
        ],
      },
      {
        kind: 'scenarios',
        kicker: 'DMs Mira can reduce',
        heading: 'Beauty DMs get specific, bounded answers',
        items: [
          {
            customer: 'Do you have Fit Me 330, and is it sealed?',
            mira: 'Mira checks approved shade, stock, price, and sealed-packaging details, then gives the next checkout step.',
            ownerNote: 'If shade data, packaging status, or batch details are missing, Mira hands over.',
          },
          {
            customer: 'Can I swap the toner in the bundle for sunscreen?',
            mira: 'Mira can confirm approved bundle rules, available items, price, and delivery basics when substitutions are allowed.',
            ownerNote: 'Custom bundles, discounts, and substitutions that affect margin stay owner-approved.',
          },
          {
            customer: 'I have oily skin and dark spots. Which one should I use?',
            mira: 'Mira can share approved product facts such as finish, texture, ingredients, and usage notes, then hand over for sensitive recommendations.',
            ownerNote: 'Skin concerns, reactions, acne, dark spots, and guaranteed-result questions need human care.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        kicker: 'Good fit',
        heading: 'Beauty sellers need answers customers can trust',
        body:
          'Beauty DMs are high-volume but trust-sensitive. Mira is useful when the shop has clear product facts and wants faster replies without letting an assistant make claims the owner would not make.',
        worksBest:
          'Beauty shops with clear shade, stock, sealed-packaging, bundle, price, delivery, and checkout details that customers ask for every day.',
        handoff:
          'Mira should hand over skin reactions, acne, dark spots, pregnancy, complaints, substitutions, discounts, and any claim that sounds medical or guaranteed.',
        ownerGets:
          'The owner gets faster routine answers while sensitive trust questions arrive with context instead of guesswork.',
      },
      faq([
        { question: 'Can Mira answer shade and stock questions?', answer: 'Yes, when shade and stock details are approved in the catalog.' },
        { question: 'Can Mira recommend beauty products?', answer: 'Mira can make catalog-backed suggestions. It should not make medical or guaranteed-result claims.' },
        { question: 'What happens with sensitive questions?', answer: 'Mira hands them over to the owner with the conversation context.' },
      ]),
    ],
  },
  '/use-cases/accessories': {
    path: '/use-cases/accessories',
    hero: {
      kicker: 'Accessories shops',
      h1: 'DM help for accessories shops',
      intro:
        'For Nairobi shops selling bags, jewelry, watches, sunglasses, phone accessories, and add-ons through Instagram DMs. Mira answers repeat product questions while the owner keeps control of taste, bundles, and special requests.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        kicker: 'The money shot',
        heading: 'Before Mira, small questions slow every sale. After Mira, customers get quick product clarity.',
        content: {
          before: [
            'Customers ask price, color, material, dimensions, phone model fit, delivery, and whether a set can be bundled.',
            'The owner repeats details from captions, screenshots, and memory while trying to keep up with stock changes.',
            'Gift buyers need quick confidence, especially when they are comparing several shops at once.',
            'Custom requests and bundle pricing interrupt the owner even when the first answer was simple.',
          ],
          after: [
            'Mira answers approved facts about price, color, material, dimensions, compatibility, and delivery.',
            'Gift and bundle questions can be organized into a clean handoff instead of scattered across the thread.',
            'Customers who know what they want get guided toward checkout faster.',
            'Unclear compatibility, custom work, discounts, and special packaging requests go back to the owner.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Linet, accessories seller',
        role: 'Nairobi shop owner, posts bags and jewelry drops, closes orders from DMs',
        day: [
          'Customers ask for the price of a bag, the color of a strap, or whether earrings are stainless steel.',
          'Gift buyers need delivery timing, packaging, and bundle clarity before they pay.',
          'Phone accessory buyers ask whether a case, charger, or holder fits their model.',
          'The owner wants speed without letting Mira promise custom work or compatibility it cannot verify.',
        ],
        miraHelps: [
          'Answers approved product facts, delivery basics, and checkout next steps.',
          'Keeps bundle requests tidy before the owner decides final pricing.',
          'Hands over compatibility, custom packaging, and special-order questions when details are uncertain.',
          "Shows which repeated questions Mira removed from the owner's day.",
        ],
      },
      {
        kind: 'promiseGrid',
        kicker: 'Powers Mira adds',
        heading: 'Accessories shops get fast answers for detail-heavy products',
        items: [
          { title: 'Product detail memory', body: 'Mira keeps price, color, material, dimensions, and stock facts ready when customers ask.' },
          { title: 'Compatibility caution', body: 'Phone model fit or technical compatibility is answered only when approved details support it.' },
          { title: 'Gift-buyer support', body: 'Delivery timing, packaging notes, and bundle basics can be handled before the owner steps in.' },
          { title: 'Clean handoff', body: 'Custom orders, discounts, and uncertain product fit come back to the owner with context.' },
        ],
      },
      {
        kind: 'scenarios',
        kicker: 'DMs Mira can reduce',
        heading: 'Accessories DMs move from detail checks to ready orders',
        items: [
          {
            customer: 'Is the gold necklace stainless steel or does it tarnish?',
            mira: 'Mira answers approved material, care, price, stock, and delivery details when the shop has confirmed them.',
            ownerNote: 'Material, tarnish, and hypoallergenic claims need approved product facts.',
          },
          {
            customer: 'Does this MagSafe case fit iPhone 15 Pro Max?',
            mira: 'Mira answers compatibility only when the catalog has the supported model list, color, and stock details.',
            ownerNote: 'Model-fit uncertainty goes to the owner because a wrong answer creates returns and trust issues.',
          },
          {
            customer: 'Can you pack the bag, earrings, and sunglasses as a birthday gift?',
            mira: 'Mira can collect the items, budget, card message, delivery area, and needed date before handing over.',
            ownerNote: 'Custom bundles, gift packaging, and special pricing stay owner-approved.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        kicker: 'Good fit',
        heading: 'Accessories shops win when details are clear',
        body:
          'Accessories DMs are detail-heavy. Buyers want to know material, size, color, phone model fit, packaging, delivery timing, and whether several small items can become one giftable order.',
        worksBest:
          'Bag, jewelry, watch, sunglasses, phone-case, and gifting pages with approved material notes, dimensions, model compatibility, colors, stock, and delivery rules.',
        handoff:
          'Mira should hand over custom work, repair questions, unclear compatibility, gift packaging promises, discounts, and any material claim that is not approved.',
        ownerGets:
          'The owner gets cleaner bundle requests and fewer repeated checks about price, material, fit, stock, and delivery.',
      },
      faq([
        { question: 'Can Mira answer jewelry and bag questions?', answer: 'Yes. Mira can answer approved price, color, material, dimensions, stock, and delivery details.' },
        { question: 'Can Mira answer phone accessory compatibility?', answer: 'Only when compatibility is approved in the catalog. If it is uncertain, Mira hands over.' },
        { question: 'Can Mira handle gift bundles?', answer: 'Mira can collect the items and delivery details, then hand custom bundle pricing to the owner.' },
      ]),
    ],
  },
  '/use-cases/fragrances': {
    path: '/use-cases/fragrances',
    hero: {
      kicker: 'Fragrance shops',
      h1: 'DM help for fragrance shops',
      intro:
        'For Nairobi perfume sellers moving designer bottles, niche scents, Arabian oils, oud, bakhoor, body mists, pocket sprays, decants, discovery sets, and gift boxes through Instagram DMs.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        kicker: 'The money shot',
        heading: 'Before Mira, every scent question waits. After Mira, buyers get clear fragrance facts fast.',
        content: {
          before: [
            'Customers ask whether a scent is sweet, woody, fresh, clean, strong, unisex, office-safe, date-night, or good for gifting.',
            'The owner repeats prices for decants, 3ml oils, 6ml roll-ons, 30ml bottles, 50ml sprays, body mists, bakhoor, and gift sets.',
            'Trust-sensitive questions about tester stock, source, batch, bottle size, longevity, projection, and authenticity interrupt the owner.',
            'A buyer comparing several perfume pages can go quiet before the owner replies with notes, price, and delivery.',
          ],
          after: [
            'Mira answers approved scent notes, sizes, prices, stock, gift options, and delivery basics.',
            'Repeat questions about designer, niche, Arabian, oud, musk, amber, vanilla, citrus, florals, and freshies move quickly.',
            'Unverified source, authenticity, batch, tester, dupe, longevity, or projection claims go back to the owner.',
            'Ready buyers get guided toward a clean cart: scent, size, quantity, delivery area, and checkout next step.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Amina, Nairobi fragrance seller',
        role: 'Perfume shop owner, posts scent drops and closes orders from DMs',
        day: [
          'Customers ask whether a vanilla musk is sweet, whether a designer-inspired scent lasts, or whether a fresh fragrance works for office wear.',
          'Gift buyers need help choosing between a decant, roll-on oil, pocket spray, body mist, bakhoor set, or wrapped gift box.',
          'Some shoppers ask about source, tester bottles, packaging, batch, longevity, and whether a scent is original.',
          'The owner wants fast replies but cannot let Mira make trust claims it cannot prove.',
        ],
        miraHelps: [
          'Answers approved scent notes, concentration, size, price, stock, packaging, and delivery basics.',
          'Groups gift requests into a clean handoff when the customer wants advice or bundle pricing.',
          'Hands over source, authenticity, tester, batch, longevity, and unusual product questions.',
          'Keeps checkout details tidy once the shopper picks a scent and size.',
        ],
      },
      {
        kind: 'promiseGrid',
        kicker: 'Powers Mira adds',
        heading: 'Fragrance shops get speed without careless trust claims',
        items: [
          { title: 'Scent note memory', body: 'Mira keeps approved notes like oud, amber, musk, vanilla, citrus, rose, powdery, smoky, fresh, sweet, and woody ready for buyers.' },
          { title: 'Size and price clarity', body: 'Decants, roll-on oils, pocket sprays, body mists, full bottles, bakhoor sets, and gift boxes can each have clear approved prices.' },
          { title: 'Gift buyer support', body: 'Mira can collect budget, scent preference, occasion, packaging need, and delivery area before handing over nuanced recommendations.' },
          { title: 'Authenticity handoff', body: 'Questions about source, tester stock, batches, originality, longevity, and projection stay owner-led unless approved details exist.' },
        ],
      },
      {
        kind: 'scenarios',
        kicker: 'DMs Mira can reduce',
        heading: 'Perfume DMs become scent-aware buying threads',
        items: [
          {
            customer: 'Do you have something fresh for office wear, not too loud?',
            mira: 'Mira can share approved fresh, clean, citrus, aquatic, or soft musk options with size, price, and delivery basics.',
            ownerNote: 'Subjective scent matching and high-trust recommendations can still be handed to the owner.',
          },
          {
            customer: 'How much is the 10ml decant, 6ml vanilla musk oil, and Lattafa gift box?',
            mira: 'Mira answers approved price, stock, scent notes, size, packaging, and delivery basics for each item.',
            ownerNote: 'If size, source, price, or packaging is missing, Mira asks the owner before quoting.',
          },
          {
            customer: 'Is this designer bottle original, tester, or inspired?',
            mira: 'Mira shares only approved sourcing language and hands over if the answer needs the owner’s trust promise.',
            ownerNote: 'Authenticity, tester, batch, dupe, projection, longevity, and source claims need owner control.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        kicker: 'Good fit',
        heading: 'Fragrance is popular enough to deserve its own page',
        body:
          'Nairobi fragrance DMs have a different rhythm from general beauty. Shoppers ask about notes, strength, longevity, size, gifting, packaging, designer comparisons, niche taste, oils, and trust. Mira helps when the shop has clear product details and wants faster answers without careless claims.',
        worksBest:
          'Perfume pages selling designer, niche, Arabian, oils, decants, body mists, bakhoor, discovery sets, and gift boxes with approved notes, prices, sizes, and sourcing language.',
        handoff:
          'Mira should hand over authenticity, tester, batch, dupe, projection, longevity, source, subjective scent matching, and premium gift recommendations unless the owner has approved the exact answer.',
        ownerGets:
          'The owner gets scent-aware buyer threads with budget, occasion, notes, size, delivery area, and the trust question that needs a human answer.',
      },
      faq([
        { question: 'Can Mira answer perfume note questions?', answer: 'Yes, when scent notes and product details are approved in the catalog.' },
        { question: 'Can Mira recommend gifts?', answer: 'Mira can collect budget, scent preference, occasion, and delivery needs, then answer from approved products or hand over.' },
        { question: 'Can Mira answer authenticity questions?', answer: 'Only with approved sourcing language. If the answer is uncertain, Mira hands over.' },
      ]),
    ],
  },
  '/use-cases/home-bakeries-food-brands': {
    path: '/use-cases/home-bakeries-food-brands',
    hero: {
      kicker: 'Home bakeries and food brands',
      h1: 'DM help for home bakeries and food brands',
      intro:
        'For Nairobi home bakers, snack brands, pantry brands, and home kitchens selling cakes, cupcakes, cookies, brownies, banana bread, granola, sauces, chilli oil, grazing boxes, and weekly menus through Instagram DMs.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        kicker: 'The money shot',
        heading: 'Before Mira, every order needs manual follow-up. After Mira, buyers get menu and delivery clarity.',
        content: {
          before: [
            'Customers ask what is available today, which flavors are left, what the delivery cutoff is, and whether pickup is possible.',
            'The owner repeats prices, sizes, flavors, allergens, shelf life, delivery days, and M-Pesa steps while baking, cooking, or packing.',
            'Food safety questions need careful answers, especially around nuts, dairy, gluten, eggs, storage, and reheating.',
            'Birthday cakes, grazing boxes, office snack orders, and weekend slots interrupt the owner even when the first question was simple.',
          ],
          after: [
            'Mira answers approved menu, batch, price, ingredient, allergen, pickup, and delivery details.',
            'Customers get guided toward a clean order: item, quantity, date, delivery area, and checkout next step.',
            'Allergen, custom cake, bulk order, refund, late-order, and special-event questions go back to the owner.',
            'The owner spends less time repeating menu facts and more time making the food.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Muthoni, home bakery and pantry brand owner',
        role: 'Nairobi food entrepreneur, posts weekly menus and takes orders in DMs',
        day: [
          'Posts cakes, cupcakes, banana bread, granola, chilli oil, sauces, cookies, brownies, or weekend grazing boxes.',
          "Customers ask about today's menu, delivery to Kilimani or Westlands, pickup timing, and M-Pesa.",
          'Some buyers ask about nuts, dairy, gluten, eggs, shelf life, storage instructions, or reheating.',
          'The owner needs orders organized without letting Mira improvise on food safety.',
        ],
        miraHelps: [
          'Answers approved menu, prices, batch availability, ingredients, allergens, delivery windows, and pickup notes.',
          'Collects quantity, date, delivery area, and checkout details before the owner steps in.',
          'Hands over custom cakes, bulk orders, allergen-sensitive questions, and late-order requests.',
          'Shows which food questions Mira answered instead of the owner typing during prep.',
        ],
      },
      {
        kind: 'promiseGrid',
        kicker: 'Powers Mira adds',
        heading: 'Food brands get order clarity before the kitchen gets interrupted',
        items: [
          { title: 'Menu memory', body: 'Mira keeps approved menu items, flavors, portions, batch limits, prices, and pickup notes ready.' },
          { title: 'Allergen caution', body: 'Nuts, dairy, gluten, eggs, storage, and reheating questions use approved facts or hand over.' },
          { title: 'Cutoff discipline', body: 'Delivery windows, order cutoffs, weekend slots, and preorder rules can be answered only when the shop has set them.' },
          { title: 'Custom order handoff', body: 'Birthday cakes, corporate orders, grazing boxes, custom menus, and large quantities come back to the owner with context.' },
        ],
      },
      {
        kind: 'scenarios',
        kicker: 'DMs Mira can reduce',
        heading: 'Food DMs move from menu checks to clear orders',
        items: [
          {
            customer: 'Do you have banana bread or brownies today, and can I get them before 4?',
            mira: 'Mira answers approved menu, batch availability, price, pickup, delivery window, and checkout next step.',
            ownerNote: 'If the batch is almost sold out or timing changed, Mira asks the owner before confirming.',
          },
          {
            customer: 'Does the granola have nuts, honey, or dairy?',
            mira: 'Mira shares approved ingredient and allergen notes from the catalog, plus storage notes if the shop has approved them.',
            ownerNote: 'Allergen, shelf-life, storage, and dietary questions need approved facts. Missing details go to the owner.',
          },
          {
            customer: 'Can I order a Bento cake and cupcakes for Saturday in Kilimani?',
            mira: 'Mira can collect date, quantity, delivery area, flavor, message, and budget before handing over.',
            ownerNote: 'Custom cake design, weekend slots, deposits, large orders, and special pricing stay owner-led.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        kicker: 'Good fit',
        heading: 'Home food brands need speed with food-safety restraint',
        body:
          'Food DMs are repeatable but sensitive. Mira helps when the shop has a clear menu, approved ingredient notes, delivery rules, and a handoff path for custom or safety-sensitive questions.',
        worksBest:
          'Home bakeries, snack brands, pantry brands, and weekly-menu kitchens with clear prices, flavors, batch limits, pickup notes, delivery windows, and ingredient facts.',
        handoff:
          'Mira should hand over custom cakes, office orders, allergen-sensitive requests, late orders, refunds, deposits, shelf-life questions, and storage or reheating advice that is not approved.',
        ownerGets:
          'The owner gets cleaner orders with item, quantity, date, area, budget, and the exact food-safety or custom-order question that needs attention.',
      },
      faq([
        { question: 'Can Mira answer menu and price questions?', answer: 'Yes, when menu, price, and batch details are approved in the catalog.' },
        { question: 'Can Mira answer allergen questions?', answer: 'Yes, only from approved ingredient and allergen notes. Otherwise Mira hands over.' },
        { question: 'Can Mira handle custom cakes or bulk food orders?', answer: 'Mira can collect the details, then hand the custom order to the owner.' },
      ]),
    ],
  },
  '/use-cases/skincare-haircare-makers': {
    path: '/use-cases/skincare-haircare-makers',
    hero: {
      kicker: 'Skincare and haircare makers',
      h1: 'DM help for skincare and haircare makers',
      intro:
        'For Nairobi makers selling shea body butter, black soap, hair oil, growth oils, lip balm, whipped creams, scrubs, turmeric soap, beard oil, refill jars, and small-batch self-care products through Instagram DMs.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'beforeAfter',
        kicker: 'The money shot',
        heading: 'Before Mira, every ingredient question pulls the maker away. After Mira, approved product facts answer first.',
        content: {
          before: [
            'Customers ask whether a body butter is greasy, what scent it has, which jar size is available, and how to use it.',
            'The maker repeats prices, ingredients, scent options, refill notes, delivery areas, hair type notes, and batch dates.',
            'Some buyers ask sensitive questions about acne, eczema, dark spots, hair growth, pregnancy, or reactions.',
            'Custom scent, salon refill, wholesale, and bulk requests interrupt the maker while they are batching or packing.',
          ],
          after: [
            'Mira answers approved ingredients, sizes, scents, prices, stock, refill options, hair type notes, and delivery basics.',
            'Sensitive treatment claims and skin or hair concerns get handed to the maker instead of improvised.',
            "Custom scent, salon refill, wholesale, and bulk requests arrive with the customer's context already collected.",
            'The maker gets fewer repeat DMs while keeping full control of product claims.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Terry, skincare and haircare maker',
        role: 'Nairobi small-batch maker, sells self-care products through Instagram drops',
        day: [
          'Posts shea body butter, black soap, hair oil, turmeric soap, lip balm, beard oil, or whipped scrub batches.',
          'Customers ask about scent, texture, jar size, ingredients, hair type, refill options, and delivery.',
          'Some buyers want treatment claims the maker should answer carefully or avoid.',
          'The maker needs Mira to protect trust while taking repeat facts off the phone.',
        ],
        miraHelps: [
          'Answers approved product facts, sizes, prices, ingredients, scent options, hair type notes, and delivery basics.',
          'Hands over medical, skin-result, pregnancy, reaction, and hair-growth questions.',
          'Collects custom scent, wholesale, refill, salon, and bulk-order details before handoff.',
          'Keeps checkout details tidy for ready buyers.',
        ],
      },
      {
        kind: 'promiseGrid',
        kicker: 'Powers Mira adds',
        heading: 'Skincare and haircare makers get fast replies without risky claims',
        items: [
          { title: 'Ingredient memory', body: 'Mira can share approved ingredients, scents, textures, sizes, prices, refill notes, hair type notes, and stock.' },
          { title: 'Claim control', body: 'Acne, eczema, hair growth, dark spots, pregnancy, and reaction questions go back to the maker.' },
          { title: 'Batch clarity', body: 'Mira can answer what is in stock, what is made to order, and when the next batch is available.' },
          { title: 'Custom request handoff', body: 'Wholesale, custom scent, salon refill, and bulk requests arrive with useful customer context.' },
        ],
      },
      {
        kind: 'scenarios',
        kicker: 'DMs Mira can reduce',
        heading: 'Skincare and haircare DMs need facts first and claims handled carefully',
        items: [
          {
            customer: 'Do you have vanilla body butter in 250g, or only 100g?',
            mira: 'Mira answers approved scent, jar size, price, stock, refill, and delivery basics.',
            ownerNote: 'If the batch is sold out, made to order, or waiting on jars, Mira asks the maker before confirming.',
          },
          {
            customer: 'Can this black soap clear acne or eczema?',
            mira: 'Mira avoids treatment claims, shares approved ingredients and usage basics, then hands over.',
            ownerNote: 'Skin results, reactions, pregnancy, acne, eczema, and sensitive usage questions need maker control.',
          },
          {
            customer: 'Can I get unscented jars and hair oil refills for my salon?',
            mira: 'Mira can collect quantity, jar size, oil size, deadline, pickup or delivery area, and hand over.',
            ownerNote: 'Wholesale pricing, custom scent, salon refill, and bulk timing stay owner-approved.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        kicker: 'Good fit',
        heading: 'Skincare and haircare makers need Mira to be careful, not loud',
        body:
          'Small-batch self-care brands win trust through product detail, consistency, and honest boundaries. Mira helps when the maker has clear product facts and wants faster replies without letting an assistant promise results.',
        worksBest:
          'Small-batch makers selling body butter, black soap, hair oil, scrubs, beard oil, lip balm, refill jars, and salon sizes with approved ingredients, scents, sizes, and batch notes.',
        handoff:
          'Mira should hand over acne, eczema, hair growth, dark spots, pregnancy, reactions, custom scents, wholesale pricing, salon refills, and any result claim the maker has not approved.',
        ownerGets:
          'The maker gets fewer repeat product-fact DMs while sensitive claims and bulk requests arrive clearly packaged for a human reply.',
      },
      faq([
        { question: 'Can Mira answer ingredient and size questions?', answer: 'Yes, when ingredients, sizes, scents, and prices are approved in the catalog.' },
        { question: 'Can Mira answer skin or hair result questions?', answer: 'Mira should avoid treatment claims and hand those questions to the maker.' },
        { question: 'Can Mira handle wholesale, salon, or refill requests?', answer: 'Mira can collect the details, then hand custom requests to the owner.' },
      ]),
    ],
  },
  '/security': {
    path: '/security',
    hero: {
      kicker: 'Security',
      h1: 'Security at Mira',
      intro:
        'Shop owners worry about account safety, customer trust, and wrong answers. This page explains what Mira connects to, what it reads, and how owners stay in control.',
      primaryCta: talkCta,
    },
    sections: [
      {
        kind: 'promiseGrid',
        heading: 'Plain-language security promises',
        items: [
          { title: 'No Instagram password', body: 'Mira should connect through the official Instagram and Meta path, never by asking for your password.' },
          { title: 'Shop DMs only', body: DM_SCOPE_REASSURANCE },
          { title: 'Owner control', body: 'The owner can step in, pause, or disconnect when the shop needs direct control.' },
          { title: 'No guessed prices', body: 'When product details are missing or uncertain, Mira should hand over instead of making up an answer.' },
        ],
      },
      {
        kind: 'legal',
        heading: 'Report a concern',
        paragraphs: [
          'Email hello@withmira.co if you have a security question, account concern, or suspicious activity to report.',
          'Do not send passwords or payment details by email. Mira will never ask for your Instagram password.',
        ],
      },
    ],
  },
  '/privacy': {
    path: '/privacy',
    hero: {
      kicker: 'Privacy',
      h1: 'Privacy Policy',
      intro:
        'Mira uses shop and customer information to answer Instagram DMs, build carts, hand conversations back to the owner, and support the account. These terms stay plain because trust is the product.',
      primaryCta: talkCta,
    },
    sections: [
      {
        kind: 'legal',
        heading: 'Information Mira collects from shop owners',
        paragraphs: [
          'Mira may collect your name, shop name, Instagram handle, email address, phone number, plan, billing status, catalog details, product information, prices, stock notes, delivery notes, and support messages.',
          'If you ask about Elite or contact Mira, we collect the details you submit so we can reply and support the inquiry.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Information Mira processes from Instagram DMs',
        paragraphs: [
          'Mira processes shop DMs so it can answer customer questions, build carts, guide checkout, and hand tricky conversations back to the shop owner.',
          'Customer messages may include product questions, order details, delivery questions, names, contact details, and other information the customer chooses to send in the DM.',
        ],
      },
      {
        kind: 'legal',
        heading: 'How Mira uses information',
        paragraphs: [
          'Mira uses information to run the service, answer DMs, keep catalog replies accurate, send handoffs, provide support, improve setup quality, prevent misuse, and manage billing.',
          'Mira does not sell shop or customer DM information. Mira should not be used to collect sensitive customer information that is not needed to answer the shop conversation.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Third parties and service providers',
        paragraphs: [
          'Mira may use service providers for hosting, analytics, email, support, form handling, database storage, payment operations, and Instagram account connection through Meta services.',
          'These providers are used to operate Mira. They should only receive information needed for their role.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Retention, deletion, and contact',
        paragraphs: [
          'Mira keeps information for as long as needed to provide the service, support the shop, maintain account records, meet legal or billing needs, and resolve safety issues.',
          'To request deletion, email hello@withmira.co with your shop name, Instagram handle, and account email. Some records may be kept where required for billing, safety, fraud prevention, or legal reasons.',
        ],
      },
    ],
  },
  '/terms': {
    path: '/terms',
    hero: {
      kicker: 'Terms',
      h1: 'Terms of Service',
      intro:
        'These terms explain how shops can use Mira, what the owner remains responsible for, and where Mira should hand conversations back instead of guessing.',
      primaryCta: talkCta,
    },
    sections: [
      {
        kind: 'legal',
        heading: 'Using Mira',
        paragraphs: [
          'Mira helps Instagram shops answer customer DMs, build carts, guide checkout, and hand conversations back to the owner. You are responsible for your shop, your catalog, your customer promises, and the decisions you make after a handoff.',
          'You must provide accurate product, price, stock, delivery, and shop information. Mira can only answer well when the information you approve is accurate.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Account connection and owner responsibility',
        paragraphs: [
          'You must have permission to connect the Instagram shop account to Mira. Do not share passwords with Mira or with anyone claiming to be Mira.',
          'You are responsible for keeping your Instagram account, payment accounts, and business records safe. You can pause or disconnect Mira when needed.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Acceptable use',
        paragraphs: [
          'Do not use Mira to mislead customers, sell goods you are not allowed to sell, send spam, break Instagram rules, impersonate another shop, collect unnecessary sensitive information, or make claims your shop cannot support.',
          'Mira may pause or refuse service if a shop uses it in a way that creates safety, legal, payment, or customer-trust risk.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Plans, payments, and changes',
        paragraphs: [
          'Mira offers Free, Pro, and Elite plans. Prices are shown in KES where a fixed price is listed. Elite is shaped around the shop and may include onboarding, a dedicated contact, priority help, and custom integrations.',
          'Plans, features, and prices may change over time. If a paid plan changes in a way that affects you, Mira should give reasonable notice where practical.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Limits and contact',
        paragraphs: [
          "Mira is a shop assistant. It does not replace the owner's judgment, confirm payments, confirm delivery completion, resolve disputes on its own, or promise that every customer will buy.",
          'Questions about these terms can be sent to hello@withmira.co.',
        ],
      },
    ],
  },
  '/data-deletion': {
    path: '/data-deletion',
    hero: {
      kicker: 'Data deletion',
      h1: 'Data deletion',
      intro:
        'You can ask Mira to delete shop data connected to your account. The request path is intentionally simple because this page may be used for Instagram app review and customer trust checks.',
      primaryCta: talkCta,
      secondaryLink: { label: 'Read privacy policy', href: '/privacy' },
    },
    sections: [
      { kind: 'list', heading: 'What to include', items: ['Your shop name', 'Your Instagram handle', 'Your account email', 'The data you want deleted'] },
      {
        kind: 'legal',
        heading: 'What happens next',
        paragraphs: [
          'Mira confirms the request status by email. We may need to verify that the requester controls the shop account before deleting account-connected data.',
          'Some records may be kept where needed for billing, safety, fraud prevention, security, or legal reasons.',
        ],
      },
    ],
  },
  '/about': {
    path: '/about',
    hero: {
      kicker: 'About',
      h1: 'About Mira',
      intro:
        'Mira is built in Kenya for Instagram sellers who answer customer DMs all day and need a teammate that understands shop work, not another dashboard.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'story',
        heading: 'Built for the DM-first shop owner',
        body:
          'Mira starts with a narrow customer: Kenyan Instagram shops where the owner or a tiny team personally answers product questions, stock checks, and delivery requests. That focus keeps the product grounded in the selling day people already have.',
        aside:
          'The beachhead is Nairobi fashion, beauty, accessories, and related Instagram shops with steady DM volume.',
      },
      {
        kind: 'promiseGrid',
        heading: 'What Mira cares about',
        items: [
          { title: 'Speed without recklessness', body: 'Reply quickly, but hand over instead of guessing when the answer is uncertain.' },
          { title: 'Catalog truth', body: "Use the shop's own products and approved details, because wrong prices break trust." },
          { title: 'Owner control', body: 'Keep the owner close to the moments that need judgment.' },
          { title: 'Visible value', body: 'Show the shop what Mira handled so the saved work does not disappear.' },
        ],
      },
    ],
  },
  '/contact': {
    path: '/contact',
    hero: {
      kicker: 'Contact',
      h1: 'Contact Mira',
      intro:
        'Start with the app, ask a question by email, or talk to Mira about a higher-touch setup for a shop with steady DM traffic.',
      primaryCta: appCta,
      secondaryLink: { label: 'Email hello@withmira.co', href: 'mailto:hello@withmira.co' },
    },
    sections: [
      {
        kind: 'promiseGrid',
        heading: 'Choose the path that fits your shop',
        items: [
          { title: 'Start Mira', body: 'Use the app if you want to try Mira on your shop and see how it handles your DMs.' },
          { title: 'Ask a question', body: 'Email hello@withmira.co for account, setup, billing, privacy, or data-deletion questions.' },
          { title: 'Talk about Elite', body: 'Use the Elite inquiry form when your shop needs onboarding, priority help, or custom integrations.' },
          { title: 'Report a concern', body: 'Send account safety, suspicious activity, or security concerns to hello@withmira.co.' },
        ],
      },
    ],
  },
  '/help': {
    path: '/help',
    hero: {
      kicker: 'Help',
      h1: 'Help with Mira',
      intro:
        'Start here if you are checking whether Mira fits your shop, what it needs from Instagram, how catalog answers work, or how to request deletion.',
      primaryCta: talkCta,
    },
    sections: [
      {
        kind: 'promiseGrid',
        heading: 'Help topics',
        items: [
          { title: 'Getting started', body: 'Connect Instagram, review your catalog, test DMs, then go live when the answers feel right.' },
          { title: 'Products and catalog', body: 'Mira answers best when prices, stock, sizes, and delivery notes are reviewed.' },
          { title: 'Orders and checkout', body: 'Mira can build a cart and guide shoppers toward an M-Pesa-ready checkout link.' },
          { title: 'Privacy and deletion', body: 'Read the privacy page or request deletion by emailing hello@withmira.co.' },
        ],
      },
      faq([
        { question: 'How do I start?', answer: 'Open the app, connect your Instagram Business account, and add your shop details.' },
        { question: 'Can I step in?', answer: 'Yes. Mira can hand tricky conversations back to you with context.' },
        { question: 'How do I ask for data deletion?', answer: 'Email hello@withmira.co with your shop name, Instagram handle, and account email.' },
        { question: 'What if Mira does not know an answer?', answer: 'Mira should hand over to the shop owner instead of guessing.' },
      ]),
    ],
  },
};
