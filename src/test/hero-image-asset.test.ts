import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const HERO_IMAGE = path.join(process.cwd(), 'public/images/sellogram-hero-nairobi.webp');

function readLossyWebpDimensions(buffer: Buffer) {
  expect(buffer.subarray(0, 4).toString('ascii')).toBe('RIFF');
  expect(buffer.subarray(8, 12).toString('ascii')).toBe('WEBP');
  expect(buffer.subarray(12, 16).toString('ascii')).toBe('VP8 ');

  return {
    width: buffer.readUInt16LE(26) & 0x3fff,
    height: buffer.readUInt16LE(28) & 0x3fff,
  };
}

describe('hero photography asset', () => {
  it('ships the approved full-resolution cobalt stairwell photograph', () => {
    const image = fs.readFileSync(HERO_IMAGE);
    const dimensions = readLossyWebpDimensions(image);

    expect(image.byteLength).toBeGreaterThan(40_000);
    expect(dimensions).toEqual({ width: 1536, height: 1024 });
  });
});
