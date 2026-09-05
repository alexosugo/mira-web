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
    description: 'Try Sellogram on your own shop. No card needed.',
    features: [
      'Sellogram answers customer questions in your Instagram DMs',
      'Carts and checkout guidance inside the DM',
      'Up to 10 customer conversations a month',
      'Replies include Sellogram branding',
    ],
    cta: 'Get started',
    footnote: 'No card details asked, ever.',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 'KES 3,500',
    priceNote: '/mo',
    description: 'For shops that need Sellogram to answer more customers. While Sellogram is on, it replies day and night.',
    featuresLead: 'Everything in Free, plus:',
    features: [
      'No monthly conversation cap',
      'Replies without Sellogram branding',
      'Pay by M-Pesa, cancel any time',
      'Email support from the Sellogram team',
    ],
    cta: 'Upgrade to Pro',
    footnote: 'Cancel any time.',
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
    cta: 'Ask about Elite',
    footnote: 'Priced to fit your shop.',
  },
];

export interface Step {
  title: string;
  description: string;
}

/** How-it-works steps. Source of truth for the homepage island and /how-it-works. */
export const STEPS: Step[] = [
  {
    title: 'Connect your Instagram',
    description: 'Link your Instagram Professional account. The whole setup takes about ten minutes.',
  },
  {
    title: 'Sellogram learns your shop',
    description: 'Sellogram reads your posts and turns them into products. You add your payment and delivery details.',
  },
  {
    title: 'Test, then go live',
    description: 'Your shop starts in test mode. Ask Sellogram real questions, then turn it on when the answers sound right.',
  },
];

/** Reassurance line shown at the scariest step (handing over your Instagram). */
export const DM_SCOPE_REASSURANCE = "Sellogram reads only your shop's DMs, nothing else on your account.";

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
  sellogram: string;
  ownerNote: string;
}

export type ContentSection =
  | { kind: 'prose'; heading?: string; body: string }
  | { kind: 'split'; heading: string; body: string }
  | { kind: 'list'; heading?: string; items: string[] }
  | { kind: 'numbered'; heading?: string; items: ListItem[] }
  | { kind: 'story'; heading: string; body: string; aside?: string }
  | {
      kind: 'fitGuide';
      heading: string;
      body: string;
      worksBest: string;
      handoff: string;
      ownerGets: string;
    }
  | { kind: 'promiseGrid'; heading: string; items: ListItem[] }
  | { kind: 'beforeAfter'; heading: string; content: BeforeAfterContent }
  | { kind: 'scenarios'; heading: string; items: ScenarioItem[] }
  | { kind: 'archetype'; name: string; role: string; day: string[]; sellogramHelps: string[] }
  | { kind: 'legal'; heading: string; paragraphs: string[] }
  | { kind: 'pricingMatrix' }
  | { kind: 'faq'; items: FaqItem[] };

export interface PageHero {
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
  label: 'Talk to Sellogram',
  href: 'mailto:hello@sellogram.co',
  trackingKey: 'content_contact_email',
  variant: 'secondary',
};

const faq = (items: FaqItem[]): ContentSection => ({ kind: 'faq', items });

export const PAGES: Record<string, PageContent> = {
  '/pricing': {
    path: '/pricing',
    hero: {
      h1: 'Pricing for Instagram shops that sell in the DMs',
      intro:
        'Start free and move to Pro when you need Sellogram to answer more customer conversations. Elite is for shops that want a team around them.',
      primaryCta: appCta,
      secondaryLink: { label: 'Ask about Elite', href: 'modal:elite' },
    },
    sections: [
      { kind: 'pricingMatrix' },
      {
        kind: 'story',
        heading: 'Pay for saved sales, not software',
        body:
          "You shouldn't pay until Sellogram has shown you it's worth it. Start free and watch what it handles: the questions answered, the orders taking shape, the conversations handed to you with context. Free is for trying Sellogram on your own shop. Pro is for shops that need Sellogram to answer more customers. Elite is for shops that want onboarding, a dedicated contact, and custom help around how they sell.",
        aside:
          'A customer conversation is one message thread with a unique Instagram account. It can include product questions, cart help, delivery questions, checkout guidance, and a handoff when the answer needs you.',
      },
      faq([
        { question: 'Is there a free plan?', answer: 'Yes. Free includes up to 10 customer conversations a month, with Sellogram branding on replies.' },
        { question: 'Do I need a card to start?', answer: 'No. The Free plan does not ask for card details. Pro is paid by M-Pesa.' },
        { question: 'What happens when I use up the 10 free conversations?', answer: 'Sellogram stops replying to new messages for the rest of the month — but keeps learning from your posts, so it is ready the moment you upgrade or the month resets.' },
        { question: 'Can I upgrade later?', answer: 'Yes. Start free and move to Pro when your DMs grow.' },
        { question: 'What happens when Sellogram needs me?', answer: 'Sellogram hands the conversation back with context so you can step in.' },
        { question: 'Do you support M-Pesa checkout?', answer: 'Yes. Sellogram sends customers an M-Pesa-ready checkout link in the DM.' },
      ]),
    ],
  },
  '/how-it-works': {
    path: '/how-it-works',
    hero: {
      h1: 'How Sellogram starts selling in your Instagram DMs',
      intro:
        'Connect your Instagram, review your catalog, test real DMs — and only then let Sellogram talk to customers. Careful setup is the point: Sellogram speaks for your shop.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'numbered',
        heading: 'The simple version',
        items: STEPS.map((step) => ({ title: step.title, body: step.description })),
      },
      {
        kind: 'story',
        heading: "You're not connecting a tool. You're trusting it with your customers.",
        body:
          'So Sellogram does not go live the moment you connect. Every new shop starts in test mode: only an Instagram account you choose can message the shop, so you can ask Sellogram real questions about your own products and check the answers first. Sellogram only starts replying to customers when you turn it on from your dashboard.',
        aside:
          'Sellogram never invents a price. When a post is missing one, it asks you to fill it in.',
      },
      {
        kind: 'promiseGrid',
        heading: 'What happens before Sellogram speaks for your shop',
        items: [
          { title: 'Products from your posts', body: 'Sellogram reads your posts and photos and turns them into products. When a post updates, the product updates too.' },
          { title: 'Test mode', body: 'Send sample DMs from an account you choose and see exactly how Sellogram answers before customers do.' },
          { title: 'Handoffs, your way', body: 'When Sellogram is unsure, it notifies you on Instagram, WhatsApp, or email — you pick the channel during setup.' },
          { title: 'Your dashboard', body: 'Every conversation is there with a summary. Take over a thread whenever you want, and hand it back when you are done.' },
        ],
      },
      { kind: 'prose', heading: 'DM scope', body: DM_SCOPE_REASSURANCE },
      faq([
        { question: 'How long does setup take?', answer: 'About ten minutes. Connect your Instagram Professional account, choose where handoff notifications go, and add your payment and delivery details.' },
        { question: 'What kind of Instagram account do I need?', answer: 'A Professional account. Instagram requires it for tools like Sellogram.' },
        { question: 'Can I take over a conversation?', answer: 'Yes. Open the thread from your dashboard or the DM itself, take over, and hand back to Sellogram when you are done.' },
        { question: 'What does Sellogram read?', answer: DM_SCOPE_REASSURANCE },
      ]),
    ],
  },
  '/instagram-dm-automation': {
    path: '/instagram-dm-automation',
    hero: {
      h1: 'Instagram DM replies that help customers buy',
      intro:
        "You open Instagram and the same questions are stacked up: price, size, delivery, is it available, can I pay now. While Sellogram is on, it answers them from your shop's details, even when you cannot be on your phone.",
      primaryCta: appCta,
      secondaryLink: { label: 'How Sellogram works', href: '/how-it-works' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Before Sellogram, buyers wait for you. After Sellogram, they get answers while you work.',
        content: {
          before: [
            'A shopper asks “how much?” under a fresh post. They are comparing options right now.',
            'You reply when you can — between packing, posting, and everything else.',
            'By the time you answer, the warm buyer is a silent thread.',
            'Late-night DMs sit till morning.',
          ],
          after: [
            'Sellogram replies in seconds with your prices, sizes, and stock.',
            'Buyers get the next step — cart, delivery, checkout link — without waiting.',
            'Anything tricky comes to you with context.',
            'You wake up to orders, not a backlog.',
          ],
        },
      },
      {
        kind: 'numbered',
        heading: 'Going live takes three steps',
        items: STEPS.map((step) => ({ title: step.title, body: step.description })),
      },
      {
        kind: 'promiseGrid',
        heading: 'What Sellogram can answer in the DM',
        items: [
          { title: 'Product facts', body: "Prices, stock, sizes, colors, and simple recommendations from your shop's details." },
          { title: 'Buying next steps', body: 'Cart details, delivery basics, and an M-Pesa-ready checkout link.' },
          { title: 'A voice like yours', body: 'Short, helpful replies, with clear limits when Sellogram is unsure.' },
          { title: 'Handoffs', body: 'The unusual conversations come back to you with context, never a guessed answer.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'How much is this? Can it reach Rongai today?',
            sellogram: "It's KES 1,450, and yes — Rongai delivery is KES 250, same day if you order before 2pm. Want me to set up your order?",
            ownerNote: "If delivery to an area isn't on your page, Sellogram checks with you first.",
          },
        ],
      },
      {
        kind: 'story',
        heading: 'A customer is ready for minutes, not hours',
        body:
          'When a shopper asks “how much?” under a fresh post, they are usually comparing options right now. A slow reply turns a warm buyer into a silent thread. Sellogram keeps the first answer moving while you pack orders, eat dinner, or sleep.',
        aside:
          "The promise is speed and fewer missed DMs. What that does for your sales is something you'll see in your own DMs and dashboard, not something we claim upfront.",
      },
      faq([
        { question: 'Is Sellogram a bot?', answer: "Sellogram is a shop assistant that answers from your details. When it's unsure, it hands the conversation to you instead of guessing." },
        { question: 'Will it sound like my shop?', answer: 'Sellogram learns from your posts and captions and keeps replies short and helpful. You can test it before customers ever see it.' },
        { question: 'What does it cost?', answer: 'There is a free plan with up to 10 customer conversations a month. Pro is KES 3,500/mo, paid by M-Pesa.' },
      ]),
    ],
  },
  '/integrations/instagram': {
    path: '/integrations/instagram',
    hero: {
      h1: 'Connect Sellogram to your Instagram shop',
      intro:
        "Sellogram connects through Instagram's official Meta login for business accounts. It never asks for your password, and you can disconnect any time.",
      primaryCta: appCta,
      secondaryLink: { label: 'Read the security promises', href: '/security' },
    },
    sections: [
      {
        kind: 'promiseGrid',
        heading: 'What your shop needs',
        items: [
          { title: 'Instagram Professional account', body: 'Instagram requires a Professional account for DM tools like Sellogram. Personal accounts cannot connect.' },
          { title: 'Catalog source', body: 'Sellogram builds products from your posts, captions, and photos — and you can add products by hand.' },
          { title: 'Your permission', body: 'You approve the connection, and you can disconnect whenever you want.' },
          { title: 'Product review', body: 'Prices and stock get checked before Sellogram goes live.' },
        ],
      },
      {
        kind: 'story',
        heading: 'Sellogram works inside the way your customers already buy',
        body:
          'Customers still find you from posts, stories, and your profile. They still ask in DMs. Sellogram reads your shop DMs, answers from your details, and brings you in when a conversation needs a human decision.',
        aside:
          'Instagram is where Sellogram works today. More channels come later — the DMs come first.',
      },
      faq([
        { question: 'Will Sellogram ask for my password?', answer: "No. Connection happens through Instagram's official Meta login. Nobody from Sellogram will ever ask for your password." },
        { question: 'Can Sellogram read my personal messages?', answer: "No. Sellogram reads only your shop's DMs, nothing else on your account." },
        { question: 'Can I switch it off?', answer: 'Yes. Pause or disconnect Sellogram any time.' },
        { question: 'What if a product has no price?', answer: 'Sellogram asks you instead of making one up.' },
      ]),
    ],
  },
      '/features/product-answers': {
    path: '/features/product-answers',
    hero: {
      h1: 'Stop answering the same questions all day',
      intro:
        "Every buyer asks the same things. How much, what sizes, is it in stock, do you deliver. Sellogram answers all of it from your shop's details — in seconds, not hours.",
      primaryCta: appCta,
      secondaryLink: { label: 'See how orders come together', href: '/features/orders-and-checkout' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Your shop replies for you',
        content: {
          before: [
            'You post. The questions flood in. How much, what size, still available, do you deliver.',
            'You answer the same things, over and over, while packing orders and editing posts.',
            "Stock changes. A caption goes stale. Now you're correcting yourself in 10 threads.",
            'Every late reply is a buyer who may not wait.',
          ],
          after: [
            'Sellogram answers from your prices, sizes, and stock. Nothing else.',
            "Buyers get a reply in seconds. You're free to pack, post, source, or sleep.",
            "When something's missing or unclear, Sellogram asks you instead of guessing.",
            'You start to see what people ask most — so you know what to fix in your shop.',
          ],
        },
      },
      {
        kind: 'story',
        heading: 'Every answer comes straight from your shop',
        body:
          "Sellogram reads your posts, your captions, your shop page — prices, sizes, stock, ingredients, everything you've already put up. When a buyer asks, the answer comes from what's there. No extra setup, no scripts to write.",
        aside:
          'The more detail you put on your page, the better Sellogram answers. Post your prices, list your sizes, add your delivery areas — Sellogram picks it all up.',
      },
      {
        kind: 'promiseGrid',
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
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'How much is the vanilla musk oil?',
            sellogram: 'The vanilla musk oil is KES 1,200 for 30ml. Warm vanilla with a musk base, and it is in stock. Want delivery or pickup?',
            ownerNote: "If the price or size isn't on the page, Sellogram asks you before saying anything.",
          },
          {
            customer: 'Does the granola have nuts?',
            sellogram: 'Yes — contains almonds and walnuts. 250g packs, KES 450 each. Fresh batch from Monday. Delivery within Nairobi or pickup in Westlands.',
            ownerNote: "Allergen questions get answered from what's on your page. Anything missing goes to you.",
          },
          {
            customer: 'Can this body butter clear dark spots?',
            sellogram: "It's a shea butter base with cocoa and vanilla — 200ml, KES 800. Great for dry skin. For dark spots, let me bring in the shop owner to advise you properly.",
            ownerNote: 'Skin, medical, and results claims are yours to make. Sellogram leaves them to you.',
          },
        ],
      },
      faq([
        { question: 'Where do the answers come from?', answer: "Your posts, your captions, your shop page. That's where everything comes from." },
        { question: "What if a price isn't set?", answer: 'Sellogram asks you instead of guessing.' },
        { question: 'Can it answer allergen questions?', answer: "Yes, if the details are on your page. If not, the question comes to you." },
        { question: 'Can it answer delivery questions?', answer: "Yes — pickup, delivery areas, cutoffs. Whatever you've put on your shop." },
      ]),
    ],
  },
  '/features/orders-and-checkout': {
    path: '/features/orders-and-checkout',
    hero: {
      h1: 'Help customers finish an order in the same conversation',
      intro:
        'A buyer asks a question. Sellogram confirms the item, size, and quantity, keeps the whole order in one place, and sends an M-Pesa-ready checkout link when everything is clear. You confirm the payment.',
      primaryCta: appCta,
      secondaryLink: { label: 'See what happens when Sellogram needs you', href: '/features/human-handoff' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'The order gets confirmed, not scattered across the thread',
        content: {
          before: [
            "A buyer asks one question. Then you're collecting item, size, quantity, delivery area, and payment timing — by hand, between packing orders.",
            'They change the shade, add cookies, swap a scent. Now the order lives in five different messages.',
            "You're juggling Instagram, M-Pesa, and riders. One missed detail and the wrong thing ships.",
            "When the next step isn't clear, buyers go quiet.",
          ],
          after: [
            'Sellogram confirms the item, size, and quantity as the buyer decides.',
            'The whole order stays in one thread — changes included.',
            'When the order is clear, the buyer gets an M-Pesa-ready checkout link.',
            'Discounts, refunds, and special requests come to you, with the order details already collected.',
          ],
        },
      },
      {
        kind: 'numbered',
        heading: 'The DM becomes an order thread',
        items: [
          { title: 'Confirm the item', body: 'Sellogram checks product, size, color, and quantity before treating anyone as ready to buy.' },
          { title: 'Keep the cart together', body: 'Every detail stays in one thread, so the buyer can see exactly what they picked.' },
          { title: 'Send the checkout link', body: 'When the order is clear, the buyer gets an M-Pesa-ready link in the DM.' },
          { title: 'Bring you in', body: 'Refunds, discounts, and special delivery are your decisions. Sellogram collects the details and hands over.' },
        ],
      },
      {
        kind: 'story',
        heading: 'Most Instagram sales die in the messy middle',
        body:
          "The first question is easy. The order is where it breaks: you lose the thread, the buyer asks the same thing twice, the delivery area arrives after you've already quoted. Sellogram keeps the buying steps in order, so by the time money moves, everyone agrees on what's being bought.",
        aside:
          'Sellogram never confirms a payment. When the M-Pesa message arrives it marks the order as payment pending, and you confirm the money actually landed.',
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'I want the 50ml oud and the pocket spray. How do I pay?',
            sellogram: "Nice picks — the 50ml oud is KES 2,500 and the pocket spray is KES 800, both in stock. Delivery or pickup? Once I have your area, I'll send the checkout link.",
            ownerNote: 'Discounts and substitutions come to you before Sellogram promises anything.',
          },
          {
            customer: 'Can I order two banana breads for Saturday morning?',
            sellogram: "Two banana breads for Saturday — KES 900 total. Pickup in Westlands or delivery? Orders close Friday at 6pm, so you're right on time.",
            ownerNote: 'Special baking slots and bulk pricing go to you first, every time.',
          },
          {
            customer: 'Can you deliver the body butter to Kilimani today?',
            sellogram: 'The 200ml vanilla body butter is KES 800, and Kilimani delivery is KES 200 — usually same day if you order before 2pm. Want me to set it up?',
            ownerNote: 'Same-day exceptions and rider timing stay your call, never assumed.',
          },
        ],
      },
      faq([
        { question: 'Does payment happen inside Instagram?', answer: 'The buyer pays through an M-Pesa-ready checkout link Sellogram sends in the DM.' },
        { question: 'Can Sellogram confirm size and quantity?', answer: 'Yes. Every order detail is confirmed in the thread before checkout.' },
        { question: 'Can Sellogram confirm payment?', answer: 'No. When the M-Pesa confirmation message arrives, Sellogram marks the order as payment pending — and you confirm the money landed.' },
        { question: 'What if the buyer changes their order?', answer: 'Sellogram updates the cart in the same thread, so the final order is the one that gets paid for.' },
      ]),
    ],
  },
  '/features/human-handoff': {
    path: '/features/human-handoff',
    hero: {
      h1: 'Sellogram hands tricky DMs back to you',
      intro:
        'A good assistant knows when to stop. Sellogram answers the repeat questions, then brings you in when a reply needs judgment, permission, or care — with the whole story attached.',
      primaryCta: appCta,
      secondaryLink: { label: 'What Sellogram answers on its own', href: '/features/product-answers' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Handoffs arrive with context, not cold',
        content: {
          before: [
            'A DM says "can you do this today?" and you scroll up trying to work out what they wanted.',
            'Complaints, refunds, and custom orders interrupt your day — even when the first three questions were easy ones.',
            'A bot that guesses on sensitive questions makes your shop look careless.',
            'A handoff with no context is just more work.',
          ],
          after: [
            'Sellogram answers the repeat facts first, then hands over the moments that need you.',
            'You see what the customer asked, what Sellogram answered, and why it stopped.',
            'Skin claims, allergens, authenticity, refunds, complaints — always yours.',
            'The customer never gets a made-up answer.',
          ],
        },
      },
      {
        kind: 'story',
        heading: 'What a handoff looks like',
        body:
          'You get the thread, not a mystery. Something like: "Sarah asked whether the hair oil helps with hairlines. I shared the ingredients and price, and told her you\'d advise her properly — the thread is yours." You reply in one message instead of starting from zero.',
        aside:
          'Handoffs are built to be fast. A slow handoff can feel worse than no assistant at all.',
      },
      {
        kind: 'promiseGrid',
        heading: 'Handoffs protect the shop relationship',
        items: [
          { title: 'Unclear product request', body: "If your catalog can't identify what the shopper wants, Sellogram asks you." },
          { title: 'Discounts', body: 'A discount changes the sale. Sellogram never promises one without you.' },
          { title: 'Refunds and complaints', body: 'Upset customers need a human, not a cheerful stock answer.' },
          { title: 'Risk-sensitive details', body: 'Allergens, skin reactions, authenticity, payment confirmation: owner territory.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How a good handoff sounds',
        items: [
          {
            customer: 'Is this perfume original or tester stock?',
            sellogram: "It's the 50ml EDP at KES 3,200, sealed. On sourcing — let me bring in the owner so you can hear it from her directly.",
            ownerNote: 'Fragrance trust is fragile. Source, batch, and authenticity claims are always yours.',
          },
          {
            customer: 'My child has a nut allergy. Can they eat this?',
            sellogram: "The listed ingredients include almonds, so I wouldn't recommend it — but let me get the owner to advise you properly before you decide.",
            ownerNote: 'Food safety and allergen questions get your judgment, every time.',
          },
          {
            customer: 'Can this oil grow my hairline back?',
            sellogram: "It's a castor and rosemary blend, KES 650 for 100ml. On what it can do for hairlines — the owner knows her products best. Let me bring her in.",
            ownerNote: 'Treatment and results claims stay with you, never improvised by Sellogram.',
          },
        ],
      },
      faq([
        { question: 'When does Sellogram hand over?', answer: 'Whenever a conversation needs your judgment: discounts, refunds, complaints, safety questions, or anything your catalog cannot answer.' },
        { question: 'How do I find out Sellogram needs me?', answer: 'You get a notification on Instagram, WhatsApp, or email — you choose the channel during setup.' },
        { question: 'What do I see?', answer: 'The customer question, what Sellogram already answered, and why it stopped — so you can reply in one message.' },
        { question: 'Can I hand the conversation back to Sellogram?', answer: 'Yes. Take over from your dashboard or the DM itself, then hand back when you are done.' },
        { question: 'Does Sellogram guess when it is unsure?', answer: 'No. Unsure becomes a handoff.' },
      ]),
    ],
  },
      '/use-cases/daily-drop-shops': {
    path: '/use-cases/daily-drop-shops',
    hero: {
      h1: 'Built for daily-drop shops that sell from Instagram',
      intro:
        "You post a drop. The questions pile up — price, size, is it available, do you deliver. Sellogram answers them all, in seconds, from your own details. Buyers don't wait. You don't type.",
      primaryCta: appCta,
      secondaryLink: { label: 'What Sellogram answers on its own', href: '/features/product-answers' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'You run the DMs, not the other way around',
        content: {
          before: [
            'You post a drop. Within minutes: how much, what sizes, where do you deliver.',
            "You're packing, replying, trying not to miss the buyer who's ready now.",
            'Late-night DMs sit till morning. By then the buyer bought somewhere else.',
            'Your shop looks slow, even though you never stop typing.',
          ],
          after: [
            'Sellogram answers the first questions in seconds — price, size, stock — from your details.',
            'The repeat stuff gets handled while you pack, post, or sleep.',
            'Discounts, holds, refunds, special requests — those come to you with the context.',
            "Every conversation sits in your dashboard, so you can see exactly what Sellogram handled.",
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Wanjiru',
        role: 'Posts almost every day. Replies to every DM herself.',
        day: [
          'Posts a new drop. Gets price checks before lunch.',
          'Answers size and delivery questions between packing orders.',
          'Misses the late-night DMs. Wakes up to buyers who went quiet.',
          'Stresses about giving the wrong answer and losing trust.',
        ],
        sellogramHelps: [
          'Answers the first questions in seconds — price, size, stock.',
          'Stops the same questions from eating her whole day.',
          'Brings discounts, holds, and tricky stuff to her instead of guessing.',
          'Keeps every conversation in her dashboard, with a summary, so she can take over any time.',
        ],
      },
      {
        kind: 'promiseGrid',
        heading: 'A shop assistant that answers while you work',
        items: [
          { title: 'Replies in seconds', body: 'Price, size, stock, delivery — answered before the buyer loses interest.' },
          { title: 'Knows your shop', body: 'Sellogram answers from your details, so it never asks you the same thing twice.' },
          { title: 'Knows when to ask you', body: 'If something needs your call — a discount, a hold, a refund — Sellogram brings it to you.' },
          { title: 'Shows you the work', body: 'Every conversation lands in your dashboard with a summary — take over any thread, hand it back when you are done.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'Still available? Can you hold the brown jacket till 5?',
            sellogram: "The brown jacket is KES 1,800. Medium and large are in stock. But holds are your call — Sellogram sends that part back to you instead of promising something it can't keep.",
            ownerNote: 'Holds affect other buyers, so they always go back to you.',
          },
          {
            customer: 'Can a rider bring it to Kasarani today?',
            sellogram: "Sellogram shares your delivery notes, confirms the item, and points them to checkout — Kasarani included, if that's a route you cover.",
            ownerNote: 'Same-day rider costs and late pickups stay with you to approve.',
          },
          {
            customer: 'Do you have size 38 or medium in this drop?',
            sellogram: "Sellogram checks what's in stock — size 38 and medium — and tells them what's available before they lose interest and move on.",
            ownerNote: 'If stock is moving fast or the post is outdated, Sellogram checks with you first.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        heading: 'Made for shops with too many DMs to answer alone',
        body:
          "If you're getting 15 or more product questions a day, posting often, and hearing the same things on repeat — that's where Sellogram makes the biggest difference. Below that, you can still use it. It just helps more when the DM load is heavy.",
        worksBest:
          'Shops that post often, sell from Instagram, and spend hours every day answering price, size, stock, and delivery questions.',
        handoff:
          'Discounts, refunds, holds, missing prices, unclear stock — Sellogram will hand over anything that needs your call.',
        ownerGets:
          "Fewer repeat DMs. Clearer context on every conversation that comes to you. And every thread in your dashboard — what Sellogram answered, what it handed over — so you always know it's worth it.",
      },
      faq([
        { question: 'Does Sellogram learn from my posts?', answer: "Yes. It picks up your prices, sizes, and details from what's on your page. Anything missing comes to you." },
        { question: 'Can I still reply myself?', answer: 'Always. Sellogram handles the repeats. You handle the rest.' },
      ]),
    ],
  },
  '/use-cases/fashion': {
    path: '/use-cases/fashion',
    hero: {
      h1: 'DM help for fashion and thrift shops',
      intro:
        'One good piece gets twenty DMs: size, price, is it still there. Sellogram answers them from your page before the buyer moves on — and checks with you when stock is moving fast.',
      primaryCta: appCta,
      secondaryLink: { label: 'How orders come together', href: '/features/orders-and-checkout' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Twenty threads about one item, each with a next step',
        content: {
          before: [
            'A dress drops and the comments and DMs land at the same time: size, color, price, pickup, still available.',
            'You switch between selling, packing, editing posts, and apologizing for late replies.',
            'A one-off piece sells — and the DMs keep asking for it, thread after thread.',
            "The buyer who wanted it most is the one who couldn't wait.",
          ],
          after: [
            'Sellogram answers size, color, price, and delivery from your page in seconds.',
            'Sold or uncertain? Sellogram points to alternatives you have — or checks with you.',
            'Ready buyers get a cart: piece, size, delivery area, checkout link.',
            "You keep the calls that matter: styling, bargaining, and stock you haven't confirmed.",
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Achieng',
        role: 'Curated thrift seller in Nairobi. Posts new pieces three times a week, sells mostly from stories.',
        day: [
          'Posts a story. Ten people ask the waist size of the same pair of jeans.',
          'Fast buyers want delivery to CBD, Westlands, or Kasarani — today.',
          'A piece sells while ten more shoppers are still asking about it.',
          'One wrong "yes, it\'s available" costs her more than a slow reply.',
        ],
        sellogramHelps: [
          'Answers size, measurements, color, price, and delivery from her page.',
          'Suggests similar available pieces when the one they want is gone.',
          'Never promises stock it has not confirmed — it asks her first.',
          'Builds the cart when the buyer says yes.',
        ],
      },
      {
        kind: 'promiseGrid',
        heading: 'What Sellogram handles for a fashion page',
        items: [
          { title: 'Size checks', body: '“Do you have medium?” and “will this fit a size 10?” — answered from your measurements.' },
          { title: 'Fast stock', body: 'When stock is uncertain, Sellogram checks with you instead of promising.' },
          { title: 'Condition and color', body: "Thrift or new, true-to-photo notes, fabric and care — from what you've written." },
          { title: 'Checkout', body: 'Piece, size, quantity, and delivery kept together in one thread.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'Is this UK 8 or small? Can you send waist measurements?',
            sellogram: "It's a UK 8 — waist 30cm flat, length 102cm. KES 1,200, and it's still available. Want delivery or CBD pickup?",
            ownerNote: 'Fit advice and try-on judgment go to you. Sellogram sticks to the measurements.',
          },
          {
            customer: 'Is the black pair still available for CBD pickup?',
            sellogram: "Let me check with the owner — these are moving fast and I'd rather confirm than promise. Meanwhile: they're KES 2,000, sizes 39–41.",
            ownerNote: 'One-off pieces get confirmed with you before Sellogram says "it\'s yours."',
          },
          {
            customer: 'Is the denim jacket thrifted or new, and is the color true to the photo?',
            sellogram: "It's curated thrift, excellent condition — photographed in daylight, so the color is close. KES 1,500. Want more photos before you decide?",
            ownerNote: 'Condition disputes and extra video requests stay with you to handle.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        heading: 'Fashion sellers need speed and restraint at the same time',
        body:
          "Your page already has demand. The job is to stop losing interested buyers to slow replies — without ever promising a piece you can't deliver.",
        worksBest:
          'Curated thrift, shoes, bags, and outfit pages with repeat questions about size, measurements, condition, color, pickup, delivery, and whether a one-off piece is still available.',
        handoff:
          "Always a handoff: styling judgment, bargaining, damaged-item concerns, custom sourcing, try-on video requests, and any stock you haven't confirmed.",
        ownerGets:
          'Buyer-ready threads with piece, size, measurements, and delivery sorted — and the judgment calls flagged for you.',
      },
      faq([
        { question: 'Can Sellogram answer size questions?', answer: 'Yes, from the sizes and measurements on your page.' },
        { question: 'What about sold-out pieces?', answer: 'Sellogram suggests available alternatives or checks with you. It never promises stock it cannot see.' },
        { question: 'Can Sellogram give styling advice?', answer: 'Simple suggestions from your catalog, yes. Personal styling stays with you.' },
      ]),
    ],
  },
  '/use-cases/beauty': {
    path: '/use-cases/beauty',
    hero: {
      h1: 'DM help for beauty shops selling on Instagram',
      intro:
        'Shades, bundles, sealed stock, delivery today — the questions never stop. Sellogram answers them from your page and leaves the skin advice to you.',
      primaryCta: appCta,
      secondaryLink: { label: 'How handoffs work', href: '/features/human-handoff' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Shade questions get product facts, not silence',
        content: {
          before: [
            "Which shade is in stock, what's in the bundle, can it come today — again and again.",
            'You repeat the same price and stock answers while being careful not to promise results.',
            'A buyer who needed one quick confirmation disappears before you reply.',
            'Small orders pile up and checkout details scatter across threads.',
          ],
          after: [
            'Sellogram answers shade, stock, bundle, price, and delivery from your page.',
            'Recommendations stick to product facts — never skin promises.',
            'Ready buyers get a tidy cart and an M-Pesa-ready checkout link.',
            'Skin concerns and complaints come to you, with the thread attached.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Njeri',
        role: 'Beauty seller in Nairobi. Runs product drops from Instagram, closes orders in the DMs.',
        day: [
          'Posts a restock. "Do you have 330?" arrives thirty times.',
          'Buyers want a quick bundle suggestion before they pay.',
          'She is careful never to promise what a product cannot do.',
          'Small orders stack up faster than she can keep the details straight.',
        ],
        sellogramHelps: [
          'Answers shade, stock, price, and bundle questions the moment they land.',
          'Suggests from her products without promising results.',
          'Hands skin concerns and complaints to her with the full thread.',
          'Sends ready buyers the checkout link.',
        ],
      },
      {
        kind: 'promiseGrid',
        heading: 'What Sellogram handles for a beauty page',
        items: [
          { title: 'Shade and stock', body: '"Do you have 330, sealed?" — answered from your stock details.' },
          { title: 'Bundles', body: "What's in the set, what it costs, what can be swapped — by your rules." },
          { title: 'Cleaner checkout', body: 'Product, quantity, and delivery kept together before payment.' },
          { title: 'Skin questions', body: 'Acne, reactions, dark spots, pregnancy — always handed to you.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'Do you have Fit Me 330, and is it sealed?',
            sellogram: 'Yes — Fit Me 330 is in stock, sealed, KES 1,350. Want delivery or pickup? I can send the checkout link.',
            ownerNote: 'If shade or packaging details are missing from your page, Sellogram checks with you.',
          },
          {
            customer: 'Can I swap the toner in the bundle for sunscreen?',
            sellogram: 'The glow bundle allows one swap — toner for sunscreen works, same price at KES 2,800. Should I set that up?',
            ownerNote: "Swaps only happen by rules you've set. Anything that changes your margin comes to you.",
          },
          {
            customer: 'I have oily skin and dark spots. Which one should I use?',
            sellogram: 'I can tell you the facts — the gel moisturizer is oil-free and light, KES 900. For your skin specifically, let me bring in the owner to advise you properly.',
            ownerNote: 'Skin concerns and results questions get human care, every time.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        heading: 'Beauty DMs are high-volume and trust-sensitive',
        body:
          'Sellogram is useful when your product facts are clear and you want faster replies without an assistant making claims you would not make yourself.',
        worksBest:
          'Beauty shops with clear shade, stock, sealed-packaging, bundle, price, and delivery details that customers ask about every day.',
        handoff:
          'Always a handoff: skin reactions, acne, dark spots, pregnancy, complaints, custom bundles, discounts, and anything that sounds medical or guaranteed.',
        ownerGets:
          'You get faster routine answers, and the sensitive questions arrive with context instead of guesswork.',
      },
      faq([
        { question: 'Can Sellogram answer shade and stock questions?', answer: 'Yes, from the details on your page.' },
        { question: 'Can Sellogram recommend products?', answer: 'It suggests from your catalog facts. It never makes medical or guaranteed-result claims.' },
        { question: 'What happens with sensitive questions?', answer: 'They come to you with the whole conversation attached.' },
      ]),
    ],
  },
  '/use-cases/accessories': {
    path: '/use-cases/accessories',
    hero: {
      h1: 'DM help for accessories shops',
      intro:
        'Bags, jewelry, watches, phone cases — detail-heavy products bring detail-heavy questions. Sellogram answers the facts fast and keeps the taste, bundles, and custom calls with you.',
      primaryCta: appCta,
      secondaryLink: { label: 'How orders come together', href: '/features/orders-and-checkout' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Small questions stop slowing the sale',
        content: {
          before: [
            'Price, color, material, dimensions, does it fit an iPhone 15 — over and over.',
            'You answer from captions, screenshots, and memory while stock keeps changing.',
            'Gift buyers comparing three shops buy from whoever sounds surest, soonest.',
            'Custom requests interrupt you even when the first question was simple.',
          ],
          after: [
            'Sellogram answers price, color, material, dimensions, and compatibility from your details.',
            'Gift orders arrive organized: items, budget, date, delivery — collected before you step in.',
            'Buyers who know what they want go straight to checkout.',
            'Custom work, discounts, and uncertain fits come to you.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Linet',
        role: 'Accessories seller in Nairobi. Posts bags and jewelry drops, closes orders in the DMs.',
        day: [
          '"How much is the bag? Is the necklace stainless? Does this case fit a 15 Pro Max?"',
          'Gift buyers need packaging, timing, and bundle answers before they pay.',
          'One wrong compatibility answer means a return and an unhappy buyer.',
          'She wants speed — without Sellogram promising custom work it cannot check.',
        ],
        sellogramHelps: [
          'Answers the product facts and delivery basics instantly.',
          'Collects gift orders — items, budget, card message, date — before she steps in.',
          'Only answers model-fit when her page lists the supported models.',
          'Keeps every conversation in her dashboard so she can step in whenever she wants.',
        ],
      },
      {
        kind: 'promiseGrid',
        heading: 'What Sellogram handles for an accessories page',
        items: [
          { title: 'Product details', body: 'Price, color, material, dimensions, stock — ready when buyers ask.' },
          { title: 'Compatibility, carefully', body: 'Phone-model fit answered only when your page lists the models. Otherwise it asks you.' },
          { title: 'Gift buyers', body: 'Timing, packaging notes, and bundle basics handled before you step in.' },
          { title: 'Custom work', body: 'Special orders and bundle pricing come to you with the details collected.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'Is the gold necklace stainless steel or does it tarnish?',
            sellogram: "It's 316 stainless steel — doesn't tarnish with normal wear. KES 850, in stock. Want it delivered or picked up?",
            ownerNote: "Material and hypoallergenic claims only come from what you've listed.",
          },
          {
            customer: 'Does this MagSafe case fit iPhone 15 Pro Max?',
            sellogram: 'Yes — this one is listed for the 15 Pro Max. KES 1,600, black and clear in stock. Which color?',
            ownerNote: "If a model isn't on your list, Sellogram asks you — a wrong fit answer costs a return.",
          },
          {
            customer: 'Can you pack the bag, earrings, and sunglasses as a birthday gift?',
            sellogram: "Lovely combo — that's KES 4,300 together. When do you need it, and where's it going? I'll pass the wrapping request to the owner with everything ready.",
            ownerNote: 'Gift packaging promises and bundle pricing stay yours to decide.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        heading: 'Accessories shops win on details',
        body:
          'Buyers want material, size, fit, and packaging answers before they trust a page. One wrong compatibility answer costs a return — so Sellogram answers what your page supports and asks you about the rest.',
        worksBest:
          'Bag, jewelry, watch, sunglasses, phone-case, and gifting pages with material notes, dimensions, model lists, colors, stock, and delivery rules written up.',
        handoff:
          'Always a handoff: custom work, repairs, unclear compatibility, gift packaging promises, discounts, and any material claim you have not listed.',
        ownerGets:
          'You get cleaner bundle requests and far fewer repeat checks on price, material, fit, stock, and delivery.',
      },
      faq([
        { question: 'Can Sellogram answer jewelry and bag questions?', answer: 'Yes: price, color, material, dimensions, stock, and delivery — from your page.' },
        { question: 'Can Sellogram answer phone accessory compatibility?', answer: 'Only when your page lists the supported models. Uncertain fits come to you.' },
        { question: 'Can Sellogram handle gift bundles?', answer: 'It collects the items and delivery details, then hands the pricing and packaging to you.' },
      ]),
    ],
  },
  '/use-cases/fragrances': {
    path: '/use-cases/fragrances',
    hero: {
      h1: 'Scent questions answered from your own posts',
      intro:
        'You post a new scent and the same messages arrive: how much, is it sweet, does it last, is it original. Sellogram answers the facts from your page the moment buyers ask, and sends the trust questions straight to you.',
      primaryCta: appCta,
      secondaryLink: { label: 'How handoffs work', href: '/features/human-handoff' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Buyers get the notes, the price, and the next step',
        content: {
          before: [
            'Every post brings the same questions: sweet or woody, how strong, is it unisex, how much for the small size.',
            "You type out the prices for the oil, the decant, and the full bottle — again — while packing yesterday's orders.",
            '"Is this original?" lands in the middle of your day, and it deserves a careful answer.',
            'A buyer comparing three perfume pages buys from whoever replies first.',
          ],
          after: [
            'Sellogram answers notes, sizes, prices, and stock from your page in seconds.',
            'Gift buyers get help choosing within budget, and you get the details when they want a wrapped set.',
            'Authenticity, tester, and sourcing questions come straight to you. Sellogram never improvises trust.',
            'Ready buyers get a clear cart — scent, size, quantity, delivery — and a checkout link.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Amina',
        role: 'Perfume seller in Nairobi. Posts scent drops, closes every order in the DMs.',
        day: [
          'Posts a new oud. The "how much" messages start before she puts the phone down.',
          'Explains for the tenth time that the vanilla musk comes in 3ml, 6ml, and 30ml.',
          'A buyer asks if a designer bottle is original. She stops everything — that one she answers herself.',
          "Gift buyers want advice, and advice takes time she doesn't have.",
        ],
        sellogramHelps: [
          'Answers notes, sizes, prices, and stock the moment buyers ask.',
          'Collects budget, occasion, and preference from gift buyers before Amina steps in.',
          'Sends authenticity and sourcing questions straight to her, untouched.',
          'Builds the cart once the buyer picks a scent and size.',
        ],
      },
      {
        kind: 'promiseGrid',
        heading: 'What Sellogram handles for a perfume page',
        items: [
          { title: 'Scent notes', body: '"Is it sweet? Is it strong?" — answered from the notes you have written up.' },
          { title: 'Every size, every price', body: 'Oils, decants, sprays, full bottles, gift sets. Each one quoted right.' },
          { title: 'Gift buyers', body: 'Budget, occasion, and packaging collected, so you step in with everything you need.' },
          { title: 'Trust stays yours', body: 'Original, tester, batch, and sourcing questions always come to you.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'Do you have something fresh for office wear, not too loud?',
            sellogram: 'The citrus vetiver is the most office-safe on the page — clean and fresh, not sweet. KES 1,500 for 30ml, or KES 350 for a 3ml try-size. Want one in your cart?',
            ownerNote: 'When a buyer wants a personal recommendation, Sellogram hands the thread to you.',
          },
          {
            customer: 'How much is the 10ml decant, the 6ml vanilla musk oil, and the Lattafa gift box?',
            sellogram: 'The 10ml decant is KES 700, the vanilla musk oil is KES 450, and the Lattafa gift box is KES 3,200 — all in stock. Delivery or pickup?',
            ownerNote: 'If a price or size is missing from your page, Sellogram asks you before quoting anything.',
          },
          {
            customer: 'Is this designer bottle original, tester, or inspired?',
            sellogram: 'Everything on this page is sealed retail stock — and for this bottle, let me bring in the owner so you can hear it from her directly.',
            ownerNote: 'Authenticity, tester, and batch claims are always yours — Sellogram only repeats the sourcing language you wrote.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        heading: 'Made for perfume pages where trust is the product',
        body:
          'Fragrance buyers ask two kinds of questions: facts (notes, size, price, stock) and trust (original, tester, source). Sellogram takes the facts off your plate and treats every trust question as yours.',
        worksBest:
          'Perfume pages selling designer, niche, Arabian, oils, decants, body mists, bakhoor, discovery sets, and gift boxes, with notes and prices written up on the page.',
        handoff:
          'Always a handoff: authenticity, tester, batch, dupe, projection, longevity, source, and personal scent matching — unless you have written the exact answer.',
        ownerGets:
          'Buyer-ready threads with budget, occasion, and size sorted — and the trust question waiting for your answer, untouched.',
      },
      faq([
        { question: 'Can Sellogram answer perfume note questions?', answer: 'Yes, from the notes and details on your page.' },
        { question: 'Can Sellogram recommend gifts?', answer: 'It collects budget, scent preference, occasion, and delivery needs, then suggests from your products or brings you in.' },
        { question: 'Can Sellogram answer authenticity questions?', answer: 'Only with the exact sourcing language you have written. Anything more comes to you.' },
      ]),
    ],
  },
  '/use-cases/home-bakeries-food-brands': {
    path: '/use-cases/home-bakeries-food-brands',
    hero: {
      h1: 'DM help for home bakeries and food brands',
      intro:
        'What is available today, does it have nuts, can it reach Kilimani by four. Sellogram answers your menu questions while you bake — and never improvises on food safety.',
      primaryCta: appCta,
      secondaryLink: { label: 'What Sellogram answers on its own', href: '/features/product-answers' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Menu and delivery answers without the chasing',
        content: {
          before: [
            "What's available today, which flavors are left, when's the cutoff, can I pick up — while your hands are in dough.",
            'You repeat prices, sizes, allergens, and delivery days between the oven and the packing table.',
            'Allergy questions deserve careful answers, and careful takes time.',
            'Custom cakes and office orders interrupt, even when the first question was simple.',
          ],
          after: [
            "Sellogram answers your menu, prices, flavors, allergens, and cutoffs from what you've set.",
            'Orders arrive clear: item, quantity, date, delivery area, checkout link.',
            'Allergen gaps, custom cakes, and bulk orders come to you — never guessed.',
            'You spend the saved time making the food.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Muthoni',
        role: 'Home bakery and pantry brand in Nairobi. Posts weekly menus, takes orders in the DMs.',
        day: [
          'Posts the weekend menu. The "what\'s left?" messages start immediately.',
          'Answers delivery and M-Pesa questions while three things are in the oven.',
          'A nut-allergy question stops everything — that answer has to be right.',
          'Saturday slots fill up and she loses track of who confirmed what.',
        ],
        sellogramHelps: [
          'Answers menu, prices, batch availability, allergen notes, delivery windows, and pickup times instantly.',
          'Collects quantity, date, delivery area, and checkout details before the owner steps in.',
          'Hands over custom cakes, bulk orders, allergen-sensitive questions, and late-order requests.',
          'Shows which food questions Sellogram answered instead of the owner typing during prep.',
        ],
      },
      {
        kind: 'promiseGrid',
        heading: 'What Sellogram handles for a food page',
        items: [
          { title: 'Menu memory', body: "Today's items, flavors, portions, batch limits, and prices — ready when buyers ask." },
          { title: 'Allergen caution', body: 'Nuts, dairy, gluten, eggs — answered only from your notes, or handed to you.' },
          { title: 'Order cutoffs', body: "Delivery windows, weekend slots, and preorder rules — as you've set them." },
          { title: 'Custom orders', body: 'Birthday cakes, grazing boxes, and office orders come to you with details collected.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'Do you have banana bread or brownies today, and can I get them before 4?',
            sellogram: 'Both — banana bread is KES 450, brownies KES 600 a box. Orders before 1pm make the 4pm delivery. Want one of each?',
            ownerNote: 'If a batch is nearly sold out or timing changed, Sellogram checks with you before confirming.',
          },
          {
            customer: 'Can I order a Bento cake and cupcakes for Saturday in Kilimani?',
            sellogram: "Yes — Saturday still has slots. Bento cakes are KES 1,800, cupcakes KES 1,200 for six. What flavors, and what should the cake say? I'll pass the details to the baker to confirm your slot.",
            ownerNote: 'Custom designs, deposits, and weekend slots get your final confirmation.',
          },
          {
            customer: 'Does the granola have nuts, and does the chilli oil need a fridge?',
            sellogram: "The granola has almonds and cashews — that's from the maker's own notes. The chilli oil keeps for a month in a cool cupboard, three in the fridge. KES 700 a jar, from this week's batch.",
            ownerNote: "Allergen, storage, and shelf-life answers only come from notes you've written. Gaps come to you.",
          },
        ],
      },
      {
        kind: 'fitGuide',
        heading: 'Food brands need speed with food-safety restraint',
        body:
          'Food DMs repeat all day, but the sensitive ones cannot be improvised. Sellogram helps when your menu, prices, and ingredient notes are written up — and every safety gap comes straight to you.',
        worksBest:
          'Home bakeries, snack brands, pantry brands, and weekly-menu kitchens with clear prices, flavors, batch limits, pickup notes, delivery windows, and ingredient facts.',
        handoff:
          'Always a handoff: custom cakes, office orders, allergy-sensitive requests, late orders, refunds, deposits, and any storage or dietary question you have not written up.',
        ownerGets:
          'Clear orders — item, quantity, date, area — and the food-safety questions flagged for your careful answer.',
      },
      faq([
        { question: 'Can Sellogram answer menu and price questions?', answer: "Yes, from the menu and prices you've set." },
        { question: 'Can Sellogram answer allergen questions?', answer: 'Only from your own ingredient notes. Anything missing comes to you.' },
        { question: 'Can Sellogram take custom cake or bulk orders?', answer: 'It collects the details, then hands the order to you to confirm.' },
      ]),
    ],
  },
  '/use-cases/skincare-haircare-makers': {
    path: '/use-cases/skincare-haircare-makers',
    hero: {
      h1: 'DM help for skincare and haircare makers',
      intro:
        'Is it greasy, what is in it, which size is left — your DMs fill with the same questions between batches. Sellogram answers the product facts and leaves every results claim to you.',
      primaryCta: appCta,
      secondaryLink: { label: 'How handoffs work', href: '/features/human-handoff' },
    },
    sections: [
      {
        kind: 'beforeAfter',
        heading: 'Ingredient questions stop pulling you away',
        content: {
          before: [
            'Is the body butter greasy, what scent, which jar size, how do I use it — on repeat.',
            'You retype ingredients, prices, and refill notes while a batch waits.',
            "Acne, eczema, and hair-growth questions need care you can't give mid-pour.",
            'Wholesale and salon requests interrupt with ten questions each.',
          ],
          after: [
            'Sellogram answers ingredients, sizes, scents, prices, and stock from your page.',
            'Results and skin-concern questions come to you — never improvised.',
            'Wholesale and refill requests arrive with quantities and deadlines collected.',
            'You keep full control of every claim your brand makes.',
          ],
        },
      },
      {
        kind: 'archetype',
        name: 'Terry',
        role: 'Small-batch skincare and haircare maker in Nairobi. Sells through Instagram drops.',
        day: [
          'Posts a body butter batch. The scent and size questions start before it cools.',
          'Retypes the ingredients list for the fifth time today.',
          'Someone asks if the oil regrows hairlines. That answer has to be hers.',
          'A salon wants unscented refills — quantities, sizes, deadline, all in one thread.',
        ],
        sellogramHelps: [
          'Answers ingredients, sizes, scents, prices, and what is in stock.',
          'Hands every results, reaction, and pregnancy question to her.',
          'Collects wholesale and salon orders before she steps in.',
          'Tells buyers when the next batch lands — when she has set it.',
        ],
      },
      {
        kind: 'promiseGrid',
        heading: "What Sellogram handles for a maker's page",
        items: [
          { title: 'Ingredient memory', body: 'Full ingredients, scents, textures, sizes, and refill options — from your listings.' },
          { title: 'Claim control', body: 'Acne, eczema, hair growth, pregnancy, reactions — always handed to you.' },
          { title: 'Batch clarity', body: "In stock, made to order, or next batch Friday — as you've set it." },
          { title: 'Bulk requests', body: 'Wholesale, salon, and custom-scent asks arrive with the details collected.' },
        ],
      },
      {
        kind: 'scenarios',
        heading: 'How it sounds in the DM',
        items: [
          {
            customer: 'Do you have vanilla body butter in 250g, or only 100g?',
            sellogram: "Both — 250g is KES 950, 100g is KES 450, and both are in stock from Tuesday's batch. Delivery or pickup?",
            ownerNote: 'If a batch is sold out or waiting on jars, Sellogram checks with you before promising.',
          },
          {
            customer: 'Can this black soap clear acne or eczema?',
            sellogram: "It's raw black soap with shea and neem — gentle enough for daily use, KES 350. For acne or eczema specifically, let me bring in the maker to advise you properly.",
            ownerNote: 'Skin results, reactions, and sensitive usage questions stay with you.',
          },
          {
            customer: 'Can I get unscented jars and hair oil refills for my salon?',
            sellogram: "We can do that — how many jars, which sizes, and when do you need them? I'll pass it to the maker with your details for pricing.",
            ownerNote: 'Wholesale pricing, custom scents, and salon refill timing are your call.',
          },
        ],
      },
      {
        kind: 'fitGuide',
        heading: 'Makers need Sellogram to be careful, not loud',
        body:
          'Small-batch brands win trust through detail, consistency, and honest boundaries. Sellogram answers the facts you have written and treats every claim as yours to make.',
        worksBest:
          'Small-batch makers selling body butter, black soap, hair oils, scrubs, beard oil, lip balm, refill jars, and salon sizes, with ingredients, scents, sizes, and batch notes written up.',
        handoff:
          'Always a handoff: acne, eczema, hair growth, dark spots, pregnancy, reactions, custom scents, wholesale pricing, salon refills, and any result claim you have not written.',
        ownerGets:
          'Fewer repeat product-fact DMs — and the sensitive questions packaged for a careful human reply from you, the maker.',
      },
      faq([
        { question: 'Can Sellogram answer ingredient and size questions?', answer: 'Yes, from the ingredients, sizes, scents, and prices on your page.' },
        { question: 'Can Sellogram answer skin or hair result questions?', answer: 'No. Those always come to you.' },
        { question: 'Can Sellogram handle wholesale, salon, or refill requests?', answer: 'It collects the details, then hands the request to you.' },
      ]),
    ],
  },
  '/security': {
    path: '/security',
    hero: {
      h1: 'Security at Sellogram',
      intro:
        'Handing your DMs to software is a big ask. This page says plainly what Sellogram connects to, what it reads, and how you stay in control.',
      primaryCta: talkCta,
    },
    sections: [
      {
        kind: 'promiseGrid',
        heading: 'Plain-language security promises',
        items: [
          { title: 'No Instagram password', body: "Sellogram connects through Instagram's official Meta login. It never asks for your password — and neither will anyone from Sellogram." },
          { title: 'Shop DMs only', body: DM_SCOPE_REASSURANCE },
          { title: "You're in control", body: 'Step in, pause, or disconnect Sellogram whenever you want.' },
          { title: 'No guessed answers', body: 'When product details are missing or uncertain, Sellogram hands the conversation to you instead of making something up.' },
        ],
      },
      {
        kind: 'legal',
        heading: 'Report a concern',
        paragraphs: [
          'Email hello@sellogram.co with any security question, account concern, or suspicious activity.',
          'Never send passwords or payment details by email. Sellogram will never ask for your Instagram password.',
        ],
      },
    ],
  },
  '/privacy': {
    path: '/privacy',
    hero: {
      h1: 'Privacy Policy',
      intro:
        'Sellogram uses shop and customer information to answer Instagram DMs, build carts, hand conversations back to the owner, and support the account. These terms stay plain because trust is the product.',
      primaryCta: talkCta,
    },
    sections: [
      {
        kind: 'legal',
        heading: 'Information Sellogram collects from shop owners',
        paragraphs: [
          'Sellogram may collect your name, shop name, Instagram handle, email address, phone number, plan, billing status, catalog details, product information, prices, stock notes, delivery notes, and support messages.',
          'If you ask about Elite or contact Sellogram, we collect the details you submit so we can reply and support the inquiry.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Information Sellogram processes from Instagram DMs',
        paragraphs: [
          'Sellogram processes shop DMs so it can answer customer questions, build carts, guide checkout, and hand tricky conversations back to the shop owner.',
          'Customer messages may include product questions, order details, delivery questions, names, contact details, and other information the customer chooses to send in the DM.',
        ],
      },
      {
        kind: 'legal',
        heading: 'How Sellogram uses information',
        paragraphs: [
          'Sellogram uses information to run the service, answer DMs, keep catalog replies accurate, send handoffs, provide support, improve setup quality, prevent misuse, and manage billing.',
          'Sellogram does not sell shop or customer DM information. Sellogram must not be used to collect sensitive customer information that is not needed to answer the shop conversation.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Third parties and service providers',
        paragraphs: [
          'Sellogram may use service providers for hosting, analytics, email, support, form handling, database storage, payment operations, and Instagram account connection through Meta services.',
          'These providers are used to operate Sellogram. They only receive the information needed for their role.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Retention, deletion, and contact',
        paragraphs: [
          'Sellogram keeps information for as long as needed to provide the service, support the shop, maintain account records, meet legal or billing needs, and resolve safety issues.',
          'To request deletion, email hello@sellogram.co with your shop name, Instagram handle, and account email. Some records may be kept where required for billing, safety, fraud prevention, or legal reasons.',
        ],
      },
    ],
  },
  '/terms': {
    path: '/terms',
    hero: {
      h1: 'Terms of Service',
      intro:
        'These terms explain how shops can use Sellogram, what you remain responsible for, and where Sellogram hands conversations back instead of guessing.',
      primaryCta: talkCta,
    },
    sections: [
      {
        kind: 'legal',
        heading: 'Using Sellogram',
        paragraphs: [
          'Sellogram helps Instagram shops answer customer DMs, build carts, guide checkout, and hand conversations back to the owner. You are responsible for your shop, your catalog, your customer promises, and the decisions you make after a handoff.',
          'You must provide accurate product, price, stock, delivery, and shop information. Sellogram can only answer well when the information you approve is accurate.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Account connection and owner responsibility',
        paragraphs: [
          'You must have permission to connect the Instagram shop account to Sellogram. Do not share passwords with Sellogram or with anyone claiming to be Sellogram.',
          'You are responsible for keeping your Instagram account, payment accounts, and business records safe. You can pause or disconnect Sellogram when needed.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Acceptable use',
        paragraphs: [
          'Do not use Sellogram to mislead customers, sell goods you are not allowed to sell, send spam, break Instagram rules, impersonate another shop, collect unnecessary sensitive information, or make claims your shop cannot support.',
          'Sellogram may pause or refuse service if a shop uses it in a way that creates safety, legal, payment, or customer-trust risk.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Plans, payments, and changes',
        paragraphs: [
          'Sellogram offers Free, Pro, and Elite plans. Prices are shown in KES where a fixed price is listed. Elite is shaped around the shop and may include onboarding, a dedicated contact, priority help, and custom integrations.',
          'Plans, features, and prices may change over time. If a paid plan changes in a way that affects you, Sellogram will give reasonable notice where practical.',
        ],
      },
      {
        kind: 'legal',
        heading: 'Limits and contact',
        paragraphs: [
          "Sellogram is a shop assistant. It does not replace the owner's judgment, confirm payments, confirm delivery completion, resolve disputes on its own, or promise that every customer will buy.",
          'Questions about these terms can be sent to hello@sellogram.co.',
        ],
      },
    ],
  },
  '/data-deletion': {
    path: '/data-deletion',
    hero: {
      h1: 'Data deletion',
      intro:
        'You can ask Sellogram to delete the shop data connected to your account. Here is exactly what to send and what happens next.',
      primaryCta: talkCta,
      secondaryLink: { label: 'Read privacy policy', href: '/privacy' },
    },
    sections: [
      { kind: 'list', heading: 'What to include', items: ['Your shop name', 'Your Instagram handle', 'Your account email', 'The data you want deleted'] },
      {
        kind: 'legal',
        heading: 'What happens next',
        paragraphs: [
          'Sellogram confirms the request status by email. We may need to verify that the requester controls the shop account before deleting account-connected data.',
          'Some records may be kept where needed for billing, safety, fraud prevention, security, or legal reasons.',
        ],
      },
    ],
  },
  '/about': {
    path: '/about',
    hero: {
      h1: 'About Sellogram',
      intro:
        'Sellogram is built in Kenya for Instagram sellers who answer customer DMs all day and need a teammate that understands shop work, not another dashboard.',
      primaryCta: appCta,
    },
    sections: [
      {
        kind: 'story',
        heading: 'Built for the DM-first shop owner',
        body:
          'Sellogram starts with a narrow customer: Kenyan Instagram shops where you — or a tiny team — personally answer product questions, stock checks, and delivery requests. That focus keeps the product grounded in the selling day you already have.',
        aside:
          'Sellogram starts with Nairobi fashion, beauty, accessories, and fragrance shops — the sellers who live in their DMs.',
      },
      {
        kind: 'promiseGrid',
        heading: 'What Sellogram cares about',
        items: [
          { title: 'Speed without recklessness', body: 'Reply quickly, but hand over instead of guessing when the answer is uncertain.' },
          { title: 'Catalog truth', body: "Use the shop's own products and details, because wrong prices break trust." },
          { title: 'Owner control', body: 'Keep you close to the moments that need judgment.' },
          { title: 'Visible value', body: 'Show the shop what Sellogram handled so the saved work does not disappear.' },
        ],
      },
      {
        kind: 'prose',
        body: "Sellogram is built in Nairobi, by people who've watched sellers answer DMs at midnight.",
      },
    ],
  },
  '/contact': {
    path: '/contact',
    hero: {
      h1: 'Contact Sellogram',
      intro:
        'Start with the app, ask a question by email, or talk to us about a higher-touch setup for your shop.',
      primaryCta: appCta,
      secondaryLink: { label: 'Email hello@sellogram.co', href: 'mailto:hello@sellogram.co' },
    },
    sections: [
      {
        kind: 'promiseGrid',
        heading: 'Choose the path that fits your shop',
        items: [
          { title: 'Start Sellogram', body: 'Use the app if you want to try Sellogram on your shop and see how it handles your DMs.' },
          { title: 'Ask a question', body: 'Email hello@sellogram.co for account, setup, billing, privacy, or data-deletion questions.' },
          { title: 'Talk about Elite', body: 'Use the Elite inquiry form when your shop needs onboarding, priority help, or custom integrations.' },
          { title: 'Report a concern', body: 'Send account safety, suspicious activity, or security concerns to hello@sellogram.co.' },
        ],
      },
    ],
  },
  '/help': {
    path: '/help',
    hero: {
      h1: 'Help with Sellogram',
      intro:
        'Start here if you are checking whether Sellogram fits your shop, what it needs from Instagram, how catalog answers work, or how to request deletion.',
      primaryCta: talkCta,
    },
    sections: [
      {
        kind: 'promiseGrid',
        heading: 'Help topics',
        items: [
          { title: 'Getting started', body: 'Connect Instagram, review your catalog, test DMs, then go live when the answers feel right.' },
          { title: 'Products and catalog', body: 'Sellogram answers best when prices, stock, sizes, and delivery notes are reviewed.' },
          { title: 'Orders and checkout', body: 'Sellogram can build a cart and guide shoppers toward an M-Pesa-ready checkout link.' },
          { title: 'Privacy and deletion', body: 'Read the privacy page or request deletion by emailing hello@sellogram.co.' },
        ],
      },
      faq([
        { question: 'How do I start?', answer: 'Open the app, connect your Instagram Professional account, and add your payment and delivery details. Setup takes about ten minutes.' },
        { question: 'Can I step in?', answer: 'Yes. Sellogram can hand tricky conversations back to you with context.' },
        { question: 'How do I ask for data deletion?', answer: 'Email hello@sellogram.co with your shop name, Instagram handle, and account email.' },
        { question: 'What if Sellogram does not know an answer?', answer: 'Sellogram hands the conversation to you instead of guessing.' },
      ]),
    ],
  },
};
