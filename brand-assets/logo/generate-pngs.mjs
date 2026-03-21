/**
 * PNG Generation Script
 *
 * Generates PNG exports at @1x, @2x, @3x from SVG logo files using Sharp.
 *
 * Usage:
 *   npm install sharp
 *   node brand-assets/logo/generate-pngs.mjs
 *
 * Outputs to brand-assets/logo/png/
 */

import { readFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SVG_DIR = join(__dirname, 'svg');
const PNG_DIR = join(__dirname, 'png');

// Base widths for each logo type at @1x
const LOGO_SIZES = {
  'logo-wordmark-dark':  { width: 320 },
  'logo-wordmark-light': { width: 320 },
  'logo-wordmark-mono':  { width: 320 },
  'logo-full-dark':      { width: 440 },
  'logo-full-light':     { width: 440 },
  'logo-icon':           { width: 128 },
  'logo-icon-dark':      { width: 128 },
  'logo-icon-mono':      { width: 128 },
};

const SCALES = [1, 2, 3];

async function generatePngs() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('Error: sharp is not installed. Run: npm install sharp');
    process.exit(1);
  }

  await mkdir(PNG_DIR, { recursive: true });

  for (const [name, config] of Object.entries(LOGO_SIZES)) {
    const svgPath = join(SVG_DIR, `${name}.svg`);
    const svgBuffer = await readFile(svgPath);

    for (const scale of SCALES) {
      const width = config.width * scale;
      const suffix = scale === 1 ? '' : `@${scale}x`;
      const outPath = join(PNG_DIR, `${name}${suffix}.png`);

      await sharp(svgBuffer)
        .resize(width)
        .png({ quality: 100 })
        .toFile(outPath);

      console.log(`Generated ${outPath} (${width}px wide)`);
    }
  }

  console.log('\nDone! All PNGs generated in brand-assets/logo/png/');
}

generatePngs().catch(console.error);
