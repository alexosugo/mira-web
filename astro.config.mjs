import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Static output (default): every page is prerendered to HTML so crawlers and
// JS-disabled visitors get full content. The Netlify function in
// netlify/functions/ ships via Netlify's own pipeline, so no adapter is needed.
// Tailwind is processed via postcss.config.js through Astro's built-in Vite pipeline.
export default defineConfig({
  site: 'https://withmira.co',
  integrations: [react()],
});
