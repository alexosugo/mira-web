import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/routes';
import { generateLlmsFullTxt } from '../lib/llms';

// /llms-full.txt — expanded version, generated from the same route registry.
export const GET: APIRoute = () =>
  new Response(generateLlmsFullTxt(SITE_URL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
