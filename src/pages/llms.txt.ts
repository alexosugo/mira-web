import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/routes';
import { generateLlmsTxt } from '../lib/llms';

// /llms.txt — concise factual summary, generated from the route registry.
export const GET: APIRoute = () =>
  new Response(generateLlmsTxt(SITE_URL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
