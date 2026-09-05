import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readText(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function readBuffer(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath));
}

function pngDimensions(buffer: Buffer): [number, number] {
  expect(buffer.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}

describe('Sellogram web identity assets', () => {
  it('renders the approved wordmark master in the header instead of text', () => {
    const header = readText('src/components/Header.tsx');

    expect(header).toContain("../../brand/identity/wordmark/master/sellogram.svg?raw");
    expect(header).toContain('dangerouslySetInnerHTML');
    expect(header).toContain('aria-label="Sellogram"');
    expect(header).toContain('className="block w-32 sm:w-36 text-ink"');
    expect(header).not.toMatch(/>\s*Sellogram\s*</);
  });

  it('uses the locked S / Pure master as the public SVG favicon', () => {
    const master = readText('brand/identity/symbol/master/sellogram-symbol.svg');
    const favicon = readText('public/favicon.svg');

    expect(favicon).toBe(master);
    expect(favicon).toContain('viewBox="-50 -24.5 273 273"');
  });

  it('uses the Sellogram foundation colours in the web manifest and browser tile', () => {
    const manifest = JSON.parse(readText('public/site.webmanifest'));
    const browserConfig = readText('public/browserconfig.xml');

    expect(manifest.theme_color).toBe('#F2F6F3');
    expect(manifest.background_color).toBe('#F2F6F3');
    expect(browserConfig).toContain('<TileColor>#F2F6F3</TileColor>');
    expect(browserConfig).toContain('/mstile-150x150.png');
  });

  for (const [file, size] of [
    ['public/favicon-16x16.png', 16],
    ['public/favicon-32x32.png', 32],
    ['public/apple-touch-icon.png', 180],
    ['public/android-chrome-192x192.png', 192],
    ['public/android-chrome-512x512.png', 512],
    ['public/mstile-150x150.png', 150],
    ['public/favicon.png', 512],
  ] as const) {
    it(`${file} is a ${size}x${size} generated PNG`, () => {
      expect(pngDimensions(readBuffer(file))).toEqual([size, size]);
    });
  }

  it('generates a multi-size favicon.ico', () => {
    const ico = readBuffer('public/favicon.ico');

    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(ico.readUInt16LE(4)).toBeGreaterThanOrEqual(3);
  });
});
