import { useExperiment } from '@statsig/react-bindings';
import { trackPostHogEvent } from '../utils/analytics';
import { useEffect } from 'react';

export type HeroCtaVariant = 'control' | 'try_free' | 'connect_ig' | 'sell_dms';
export type HeroSubVariant = 'control' | 'ig_commerce';
export type SolutionCopyVariant = 'control' | 'full_journey';
export type ProductExpertVariant = 'control' | 'misspell_aware';

export interface ExperimentVariants {
  heroCta: HeroCtaVariant;
  heroSub: HeroSubVariant;
  solutionCopy: SolutionCopyVariant;
  productExpert: ProductExpertVariant;
}

/** Validates a variant value at runtime, falling back to a default if unexpected. */
function coerceVariant<T extends string>(value: string, allowed: readonly T[], fallback: T): T {
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

const HERO_CTA_VARIANTS: readonly HeroCtaVariant[] = ['control', 'try_free', 'connect_ig', 'sell_dms'];
const HERO_SUB_VARIANTS: readonly HeroSubVariant[] = ['control', 'ig_commerce'];
const SOLUTION_COPY_VARIANTS: readonly SolutionCopyVariant[] = ['control', 'full_journey'];
const PRODUCT_EXPERT_VARIANTS: readonly ProductExpertVariant[] = ['control', 'misspell_aware'];

/** Module-level flag to ensure exposure is tracked exactly once per page load. */
let exposureTracked = false;

export function useExperiments(): ExperimentVariants {
  const heroCta = useExperiment('hero_cta');
  const heroSub = useExperiment('hero_sub');
  const solutionCopy = useExperiment('solution_copy');
  const productExpert = useExperiment('product_expert');

  const variants: ExperimentVariants = {
    heroCta: coerceVariant(heroCta.get('variant', 'control'), HERO_CTA_VARIANTS, 'control'),
    heroSub: coerceVariant(heroSub.get('variant', 'control'), HERO_SUB_VARIANTS, 'control'),
    solutionCopy: coerceVariant(solutionCopy.get('variant', 'control'), SOLUTION_COPY_VARIANTS, 'control'),
    productExpert: coerceVariant(productExpert.get('variant', 'control'), PRODUCT_EXPERT_VARIANTS, 'control'),
  };

  useEffect(() => {
    if (exposureTracked) return;
    exposureTracked = true;
    trackPostHogEvent('experiment_exposure', {
      hero_cta: variants.heroCta,
      hero_sub: variants.heroSub,
      solution_copy: variants.solutionCopy,
      product_expert: variants.productExpert,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return variants;
}

export const HERO_CTA_COPY: Record<HeroCtaVariant, string> = {
  control: 'Get started',
  try_free: 'Try Mira Free',
  connect_ig: 'Connect Your Instagram',
  sell_dms: 'Start Selling in DMs',
};

export const HERO_SUB_COPY: Record<HeroSubVariant, string> = {
  control: 'Mira handles product questions, recommendations, and orders so customers get fast, accurate answers\u2014without you glued to your phone.',
  ig_commerce: 'Mira replies to your Instagram DMs \u2014 answering product questions, helping customers pick the right item, and guiding them all the way to checkout. Your shop sells even when you\u2019re away.',
};

export const SOLUTION_COPY: Record<SolutionCopyVariant, string> = {
  control: 'Mira lives in your DMs and understands your products, replies to customer questions, and guides them through buying wherever they message you. When someone needs you personally, Mira passes the conversation back to you.',
  full_journey: 'Mira works inside your Instagram DMs, answering the questions you answer every day \u2014 what\u2019s in stock, what it costs, what size to pick. When a customer is ready to buy, Mira adds items to their cart and walks them through checkout. When something needs your personal touch, Mira hands the conversation to you with full context.',
};

export const PRODUCT_EXPERT_COPY: Record<ProductExpertVariant, { title: string; description: string }> = {
  control: {
    title: 'Product Expert',
    description: 'Mira understands your catalog well enough to guide customers with clear, helpful answers',
  },
  misspell_aware: {
    title: 'Knows Your Products Inside Out',
    description: 'Mira searches your full catalog to find exactly what a customer is asking for \u2014 even if they misspell it or describe it vaguely',
  },
};
