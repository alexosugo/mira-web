import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Static output (default): every page is prerendered to HTML so crawlers and
// JS-disabled visitors get full content. The Netlify function in
// netlify/functions/ ships via Netlify's own pipeline, so no adapter is needed.
// applyBaseStyles:false because src/index.css already owns the @tailwind directives.
export default defineConfig({
  site: 'https://withmira.co',
  integrations: [react(), tailwind({ applyBaseStyles: false })],
});
