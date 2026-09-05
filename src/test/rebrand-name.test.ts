import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const activeBrandFiles = [
  'src/components/EliteContactModal.tsx',
  'src/components/Footer.tsx',
  'src/components/Handles.tsx',
  'src/components/Header.tsx',
  'src/components/Hero.tsx',
  'src/components/HeroChatDemo.tsx',
  'src/components/HowItWorks.tsx',
  'src/components/NightShift.tsx',
  'src/components/Pricing.tsx',
  'src/layouts/BaseLayout.astro',
  'PRODUCT.md',
  'README.md',
  'CLAUDE.md',
  'docs/voice-and-tone.md',
  'public/site.webmanifest',
  'src/content/pages.ts',
  'src/lib/routes.ts',
  'src/lib/llms.ts',
  'src/lib/structured-data.ts',
  'src/lib/voice.ts',
  'src/layouts/ContentLayout.astro',
  'src/components/content/ContentHero.astro',
  'src/components/content/DmThread.astro',
  'src/components/content/PairedLedger.astro',
  'src/components/content/ThreadScene.astro',
] as const;

describe('Sellogram rename', () => {
  it('uses Sellogram for active product and public brand references', () => {
    for (const file of activeBrandFiles) {
      const text = read(file);
      expect(text, file).not.toMatch(/\bMira\b/);
    }
  });

  it('uses Sellogram rather than Mira as the chat actor identifier', () => {
    const chat = read('src/components/HeroChatDemo.tsx');
    const nightShift = read('src/components/NightShift.tsx');

    expect(chat).not.toMatch(/['"]mira['"]/);
    expect(chat).toContain("'sellogram'");
    expect(nightShift).not.toContain('isMira');
    expect(nightShift).toContain('isSellogram');
  });

  it('does not migrate legacy URLs until the domain cutover is explicitly requested', () => {
    const header = read('src/components/Header.tsx');
    const hero = read('src/components/Hero.tsx');
    const pricing = read('src/components/Pricing.tsx');
    const elite = read('src/components/EliteContactModal.tsx');
    const footer = read('src/components/Footer.tsx');
    const layout = read('src/layouts/BaseLayout.astro');
    const readme = read('README.md');

    expect(header).toContain('https://app.withmira.co');
    expect(hero).toContain('https://app.withmira.co');
    expect(pricing).toContain('https://app.withmira.co');
    expect(elite).toContain('app.withmira.co');
    expect(elite).toContain('hello@sellogram.co');
    expect(footer).toContain('https://app.withmira.co');
    expect(footer).toContain('hello@sellogram.co');
    expect(layout).toContain('https://sellogram.co/');
    expect(layout).toContain('https://app.withmira.co');
    expect(readme).toContain('https://app.netlify.com/projects/withmira/deploys');

    for (const file of [header, hero, pricing, elite, footer, layout, readme]) {
      expect(file).not.toContain('app.sellogram.co');
    }
  });
});
