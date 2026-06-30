import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Legal drafts excluded from the sitemap until legal review flips them to index.
// Kept in sync with the `indexable: false` flags in src/lib/routes.ts (the test
// harness asserts the two stay in agreement).
const NOINDEX_PATHS = ['/privacy', '/terms'];
const normalizePath = (page) => {
  const pathname = new URL(page).pathname;
  return pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
};

// Static output (default): every page is prerendered to HTML so crawlers and
// JS-disabled visitors get full content. The Netlify function in
// netlify/functions/ ships via Netlify's own pipeline, so no adapter is needed.
// Tailwind is processed via postcss.config.js through Astro's built-in Vite pipeline.
export default defineConfig({
  site: 'https://withmira.co',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !NOINDEX_PATHS.includes(normalizePath(page)),
    }),
  ],
});
