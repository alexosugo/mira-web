import { describe, it, expect } from 'vitest';
import { generateLlmsTxt, generateLlmsFullTxt } from '../lib/llms';
import { ROUTES } from '../lib/routes';
import { violatesVoice } from '../lib/voice';

const SITE_URL = 'https://withmira.co';

describe('llms.txt generators', () => {
  it('llms.txt starts with the project title and a summary blockquote', () => {
    const out = generateLlmsTxt(SITE_URL);
    expect(out.startsWith('# Sellogram\n')).toBe(true);
    expect(out).toContain('> Sellogram answers Instagram DMs');
  });

  it('llms.txt links every registered route with an absolute URL', () => {
    const out = generateLlmsTxt(SITE_URL);
    for (const route of ROUTES) {
      expect(out, route.path).toContain(`${SITE_URL}${route.path}`);
    }
  });

  it('llms-full.txt includes a section per route', () => {
    const out = generateLlmsFullTxt(SITE_URL);
    expect(out).toContain('## Pages');
    for (const route of ROUTES) {
      expect(out, route.path).toContain(`URL: ${SITE_URL}${route.path}`);
    }
  });

  it('keeps both files voice-compliant', () => {
    expect(violatesVoice(generateLlmsTxt(SITE_URL))).toBe(false);
    expect(violatesVoice(generateLlmsFullTxt(SITE_URL))).toBe(false);
  });
});
