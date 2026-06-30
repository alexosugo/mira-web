// Single source of truth for every content route. Drives the sitemap exclusion
// list, the /llms.txt and /llms-full.txt generators, and the test harness.
// @astrojs/sitemap auto-discovers routes for the sitemap itself; this registry
// exists for the llms endpoints, tests, and as the enforceable "all routes"
// checklist.

export type Slice = 2 | 3;

export interface Route {
  path: string;
  /** Exact <title>{Phrase} | Mira</title>. */
  title: string;
  /** Unique meta description, voice-compliant. */
  description: string;
  /** Mixpanel page view label (homepage falls back to "Landing Page"). */
  pageName: string;
  /** false => renders noindex and is excluded from the sitemap. */
  indexable: boolean;
  slice: Slice;
}

export const SITE_URL = 'https://withmira.co';
export const APP_URL = 'https://app.withmira.co';
export const CONTACT_EMAIL = 'hello@withmira.co';

export const ROUTES: Route[] = [
  {
    path: '/pricing',
    title: 'Pricing for Instagram Shops | Mira',
    description:
      'Pricing for Kenyan Instagram shops. Start free, upgrade when the DMs do. Priced in KES, no card needed to begin.',
    pageName: 'Pricing Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/how-it-works',
    title: 'How it works | Mira',
    description:
      'Connect your Instagram shop, Mira learns your catalog, then replies to DMs and hands tricky conversations back to you.',
    pageName: 'How It Works Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/instagram-dm-automation',
    title: 'Instagram DM Automation for Kenyan Shops | Mira',
    description:
      'Instagram DM automation for Kenyan shops. Mira replies to product, stock, and delivery questions and builds carts in the DM.',
    pageName: 'Instagram DM Automation Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/integrations/instagram',
    title: 'Instagram Integration | Mira',
    description:
      'Connect Mira to your Instagram shop. Mira reads your shop DMs, answers product questions, and guides customers to checkout.',
    pageName: 'Instagram Integration Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/features/product-answers',
    title: 'Product Answers for Instagram DMs | Mira',
    description:
      'Mira answers price, stock, sizes, and delivery questions from your catalog so you stop typing the same reply all day.',
    pageName: 'Product Answers Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/features/orders-and-checkout',
    title: 'Orders and Checkout in Instagram DMs | Mira',
    description:
      'From DM question to ready checkout. Mira builds the cart, confirms sizes, and sends an M-Pesa-ready checkout link.',
    pageName: 'Orders and Checkout Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/features/human-handoff',
    title: 'Human Handoff for Instagram DMs | Mira',
    description:
      'Mira hands tricky DMs back to you with the full conversation context, so you always stay in control.',
    pageName: 'Human Handoff Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/use-cases/daily-drop-shops',
    title: 'DM Help for Daily-Drop Shops | Mira',
    description:
      'DM help for daily-drop shops in Nairobi. Mira answers repeat price, stock, delivery, and checkout questions from approved product details.',
    pageName: 'Daily-Drop Shops Use Case Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/use-cases/fashion',
    title: 'DM Help for Fashion Shops | Mira',
    description:
      'DM help for fashion shops. Mira answers size, color, and stock questions and guides customers to checkout.',
    pageName: 'Fashion Use Case Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/use-cases/beauty',
    title: 'DM Help for Beauty Shops | Mira',
    description:
      'DM help for beauty shops. Mira answers shade and stock questions and guides customers to checkout.',
    pageName: 'Beauty Use Case Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/use-cases/accessories',
    title: 'DM Help for Accessories Shops | Mira',
    description:
      'DM help for accessories shops selling bags, jewelry, watches, sunglasses, and phone accessories through Instagram DMs.',
    pageName: 'Accessories Use Case Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/use-cases/fragrances',
    title: 'DM Help for Fragrance Shops | Mira',
    description:
      'DM help for Nairobi fragrance shops selling designer perfumes, niche scents, oud oils, bakhoor, sprays, decants, and gift sets through Instagram DMs.',
    pageName: 'Fragrance Use Case Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/use-cases/home-bakeries-food-brands',
    title: 'DM Help for Home Bakeries and Food Brands | Mira',
    description:
      'DM help for Nairobi home bakeries and food brands taking Instagram orders for cakes, cookies, granola, sauces, chilli oil, and pantry goods.',
    pageName: 'Home Bakeries and Food Brands Use Case Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/use-cases/skincare-haircare-makers',
    title: 'DM Help for Skincare and Haircare Makers | Mira',
    description:
      'DM help for Nairobi skincare and haircare makers selling body butter, black soap, hair oil, scrubs, lip balm, and refill jars through Instagram DMs.',
    pageName: 'Skincare and Haircare Makers Use Case Page',
    indexable: true,
    slice: 2,
  },
  {
    path: '/security',
    title: 'Security | Mira',
    description:
      'How Mira handles your Instagram connection, owner control, and data protection basics. Plain-language security for shop owners.',
    pageName: 'Security Page',
    indexable: true,
    slice: 3,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Mira',
    description: 'How Mira collects and uses information from shop owners and customer DMs.',
    pageName: 'Privacy Page',
    indexable: false,
    slice: 3,
  },
  {
    path: '/terms',
    title: 'Terms of Service | Mira',
    description: 'The terms for using Mira to answer Instagram DMs and sell in the DMs.',
    pageName: 'Terms Page',
    indexable: false,
    slice: 3,
  },
  {
    path: '/data-deletion',
    title: 'Data Deletion | Mira',
    description:
      'Request deletion of your Mira data by email. Include your shop name, Instagram handle, and account email.',
    pageName: 'Data Deletion Page',
    indexable: true,
    slice: 3,
  },
  {
    path: '/about',
    title: 'About | Mira',
    description:
      'Mira is built in Kenya to help Instagram sellers answer DMs and sell without being glued to their phones.',
    pageName: 'About Page',
    indexable: true,
    slice: 3,
  },
  {
    path: '/contact',
    title: 'Contact | Mira',
    description: 'Contact Mira to get started, ask a question, or talk about a custom Elite plan.',
    pageName: 'Contact Page',
    indexable: true,
    slice: 3,
  },
  {
    path: '/help',
    title: 'Help | Mira',
    description: 'Help with Mira: getting started, connecting Instagram, catalog, orders, handoffs, and billing.',
    pageName: 'Help Page',
    indexable: true,
    slice: 3,
  },
];

const ROUTE_MAP = new Map(ROUTES.map((route) => [route.path, route]));

/** Look up a route by path. Throws if missing so route files fail loudly. */
export const getRoute = (path: string): Route => {
  const route = ROUTE_MAP.get(path);
  if (!route) throw new Error(`No route registered for path "${path}"`);
  return route;
};

/** Routes that should appear in the sitemap (indexable only). */
export const INDEXABLE_ROUTES = ROUTES.filter((route) => route.indexable);

/** Paths excluded from the sitemap (noindex legal drafts). */
export const NOINDEX_PATHS = ROUTES.filter((route) => !route.indexable).map((route) => route.path);
