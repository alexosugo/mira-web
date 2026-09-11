import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

describe('Sellogram brand foundations', () => {
  it('documents the production palette and typography without changing them', () => {
    const foundations = read('brand/foundations.md');
    const tailwind = read('tailwind.config.js');

    const requiredTokens = [
      ['Paper', '#F3F6F0'],
      ['Ink', '#1E2617'],
      ['Fern', '#9EEB47'],
      ['Dawn', '#A35F0C'],
      ['Night', '#131E09'],
    ] as const;

    for (const [name, value] of requiredTokens) {
      expect(foundations).toContain(name);
      expect(foundations).toContain(value);
      expect(tailwind).toContain(value);
    }

    expect(foundations).toContain('Archivo');
    expect(foundations).toContain('Source Sans 3');
    expect(foundations).toContain('IBM Plex Mono');
    expect(tailwind).toContain("display: ['Archivo', 'system-ui', 'sans-serif']");
    expect(tailwind).toContain("body: ['\"Source Sans 3\"', 'system-ui', 'sans-serif']");
    expect(tailwind).toContain("mono: ['\"IBM Plex Mono\"', 'ui-monospace', 'monospace']");
  });

  it('records the existing semantic roles and UI language', () => {
    const foundations = read('brand/foundations.md');
    const css = read('src/index.css');

    expect(foundations).toContain('Fern is the action colour');
    expect(foundations).toContain('Dawn is the commerce colour');
    expect(foundations).toContain('Night is the dark surface');
    expect(foundations).toContain('rounded-full');
    expect(foundations).toContain('rounded-2xl');
    expect(foundations).toContain('hairline');
    expect(foundations).toContain('fade-in-up');

    expect(css).toContain('.animate-fade-in-up');
    expect(css).toContain('.kicker');
  });

  it('removes retired Mira language from the foundation token comments', () => {
    const tailwind = read('tailwind.config.js');
    expect(tailwind).not.toContain('Mira');
    expect(tailwind).toContain('Sellogram');
  });
});
