import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const wordmarkCandidates = ['faithful', 'disciplined', 'characterful'] as const;
const historicalSymbolCandidates = [
  ['loop', 'sellogram-loop.svg'],
  ['fragment', 'sellogram-fragment.svg'],
  ['crop', 'sellogram-crop.svg'],
] as const;

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function viewBox(svg: string) {
  const match = svg.match(/viewBox="(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (!match) throw new Error('SVG viewBox not found');
  return match.slice(1).map(Number);
}

describe('Sellogram identity assets', () => {
  it('documents canonical casing and prohibits SG shorthand', () => {
    const text = read('brand/README.md');
    expect(text).toContain('**Sellogram**');
    expect(text).toContain('uppercase `S`, lowercase `ellogram`');
    expect(text).toContain('Never abbreviate it as `SG`');
  });

  it('segments the approved source into the nine canonical letterforms', () => {
    const metrics = JSON.parse(read('brand/identity/wordmark/generated/letter-metrics.json'));
    expect(metrics.letters.map((letter: { label: string }) => letter.label)).toEqual([
      'S', 'e', 'l', 'l', 'o', 'g', 'r', 'a', 'm',
    ]);
    expect(metrics.target_viewbox).toEqual([1264, 300]);
  });

  for (const name of wordmarkCandidates) {
    it(`${name} candidate is an outlined vector wordmark`, () => {
      const svg = read(`brand/identity/wordmark/candidates/${name}/sellogram-${name}.svg`);
      expect(svg).toMatch(/<svg[^>]+viewBox="0 0 1264 300"/);
      expect(svg).toContain('<path');
      expect(svg).toContain('currentColor');
      expect(svg).not.toContain('<text');
      expect(svg).not.toMatch(/font-family|font-size/);
    });
  }

  it('promotes Disciplined byte-for-byte as the production wordmark master', () => {
    const master = read('brand/identity/wordmark/master/sellogram.svg');
    const disciplined = read('brand/identity/wordmark/candidates/disciplined/sellogram-disciplined.svg');
    expect(master).toBe(disciplined);
    expect(master).toMatch(/viewBox="0 0 1264 300"/);
    expect(master).toContain('currentColor');
    expect(master).not.toContain('<text');
  });

  for (const [name, file] of historicalSymbolCandidates) {
    it(`${name} historical compact candidate remains vector-only and square`, () => {
      const svg = read(`brand/identity/symbol/candidates/${name}/${file}`);
      const [, , width, height] = viewBox(svg);
      expect(width).toBe(height);
      expect(svg).toContain('<path');
      expect(svg).toContain('currentColor');
      expect(svg).not.toContain('<text');
      expect(svg).not.toMatch(/font-family|font-size/);
      expect(svg).not.toContain('SG');
    });
  }

  it('promotes S / Pure as the production compact master', () => {
    const candidate = read('brand/identity/symbol/candidates/s-pure/sellogram-s-pure.svg');
    const master = read('brand/identity/symbol/master/sellogram-symbol.svg');
    const [, , width, height] = viewBox(master);

    expect(master).toBe(candidate);
    expect(width).toBe(height);
    expect(master).toContain('<path');
    expect(master).toContain('M92 0');
    expect(master).toContain('currentColor');
    expect(master).not.toContain('<text');
    expect(master).not.toMatch(/font-family|font-size/);
    expect(master).not.toContain('SG');
  });
});
