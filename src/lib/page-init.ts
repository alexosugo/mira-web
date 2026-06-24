/**
 * Client-side page bootstrap, loaded once via a <script> in BaseLayout.astro.
 *
 * Consolidates what used to live in main.tsx (analytics init) and App.tsx
 * (page-level tracking). No React island is needed — this is plain DOM work:
 *   1. Initialize tracking, then load the Mixpanel chunk lazily (on first
 *      interaction or idle, whichever comes first).
 *   2. Fire the landing page view.
 *   3. Track scroll depth at 25/50/75/100%.
 */
import { initMixpanel } from './mixpanel';
import { initializeTracking, trackPageView, trackEvent } from '../utils/analytics';

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

const startAnalytics = (): void => {
  void initMixpanel();
};

const setupLazyMixpanel = (): void => {
  const onFirstInteraction = (): void => {
    document.removeEventListener('pointerdown', onFirstInteraction, true);
    startAnalytics();
  };
  document.addEventListener('pointerdown', onFirstInteraction, { capture: true, passive: true });

  if ('requestIdleCallback' in window) {
    requestIdleCallback(startAnalytics, { timeout: 3000 });
  } else {
    setTimeout(startAnalytics, 1);
  }
};

const setupScrollDepthTracking = (): void => {
  let maxDepth = 0;
  const fired = new Set<number>();

  const handleScroll = (): void => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (documentHeight <= 0) return;

    const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
    if (scrollPercent <= maxDepth) return;
    maxDepth = scrollPercent;

    for (const milestone of SCROLL_MILESTONES) {
      if (scrollPercent >= milestone && !fired.has(milestone)) {
        fired.add(milestone);
        trackEvent('page_scrolled', { depth_percent: milestone });
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

initializeTracking();
setupLazyMixpanel();
trackPageView('Landing Page', 'main');
setupScrollDepthTracking();
