// Pure helper for resolving the Mixpanel page-view label. Extracted from
// page-init so the resolution logic is testable without triggering page-init's
// side effects (event listeners, lazy Mixpanel init, scroll tracking).

/**
 * Resolve the page name for analytics. Reads the `data-page-name` attribute set
 * by ContentLayout on <body>; falls back to "Landing Page" so the homepage
 * (which does not set the attribute) keeps its existing label unchanged.
 */
export const resolvePageName = (): string =>
  document.body.dataset.pageName || 'Landing Page';
