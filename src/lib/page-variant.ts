// Visual family per content page. ContentLayout uses this to pick hero
// treatment, ambient motion, and section styling — content in pages.ts stays
// presentation-free.

export type PageVariant =
  | 'guide' // process pages: /how-it-works, /instagram-dm-automation
  | 'feature' // /features/*, /integrations/*
  | 'useCase' // /use-cases/*
  | 'pricing'
  | 'trust' // /security
  | 'legal' // /privacy, /terms, /data-deletion
  | 'company' // /about
  | 'support'; // /contact, /help

/** Per-use-case decor: the ghosted display word and motif glyph key. */
export interface UseCaseDecor {
  ghostWord: string;
  motif: MotifKey;
}

export type MotifKey =
  | 'drops'
  | 'hanger'
  | 'mirror'
  | 'ring'
  | 'bottle'
  | 'cake'
  | 'jar';

const USE_CASE_DECOR: Record<string, UseCaseDecor> = {
  '/use-cases/daily-drop-shops': { ghostWord: 'drops', motif: 'drops' },
  '/use-cases/fashion': { ghostWord: 'fashion', motif: 'hanger' },
  '/use-cases/beauty': { ghostWord: 'beauty', motif: 'mirror' },
  '/use-cases/accessories': { ghostWord: 'extras', motif: 'ring' },
  '/use-cases/fragrances': { ghostWord: 'scent', motif: 'bottle' },
  '/use-cases/home-bakeries-food-brands': { ghostWord: 'baked', motif: 'cake' },
  '/use-cases/skincare-haircare-makers': { ghostWord: 'made', motif: 'jar' },
};

export function variantForPath(path: string): PageVariant {
  if (path.startsWith('/use-cases/')) return 'useCase';
  if (path.startsWith('/features/') || path.startsWith('/integrations/')) return 'feature';
  if (path === '/how-it-works' || path === '/instagram-dm-automation') return 'guide';
  if (path === '/pricing') return 'pricing';
  if (path === '/security') return 'trust';
  if (path === '/privacy' || path === '/terms' || path === '/data-deletion') return 'legal';
  if (path === '/about') return 'company';
  return 'support';
}

export function decorForPath(path: string): UseCaseDecor | undefined {
  return USE_CASE_DECOR[path];
}

export interface HeroPhoto {
  src: string;
  width: number;
  height: number;
}

const portrait = (src: string): HeroPhoto => ({ src, width: 1122, height: 1402 });

const HERO_PHOTOS: Record<string, HeroPhoto> = {
  '/features/product-answers': portrait('/images/journey/product-question.webp'),
  '/features/orders-and-checkout': portrait('/images/journey/payment-confirmation.webp'),
  '/features/human-handoff': portrait('/images/journey/cocoa-rose-packing.webp'),
  '/integrations/instagram': portrait('/images/journey/cocoa-rose-product.webp'),
  '/use-cases/fragrances': portrait('/images/shops/fragrance.webp'),
  '/use-cases/skincare-haircare-makers': portrait('/images/shops/skincare-haircare.webp'),
  '/use-cases/daily-drop-shops': { src: '/images/shops/daily-drop.webp', width: 1536, height: 1024 },
};

export function heroPhotoForPath(path: string): HeroPhoto | undefined {
  return HERO_PHOTOS[path];
}
