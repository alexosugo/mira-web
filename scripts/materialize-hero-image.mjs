import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chunkDir = path.join(root, 'assets', 'hero');
const output = path.join(root, 'public', 'images', 'sellogram-hero-nairobi.webp');

const chunks = [
  'sellogram-hero-01.b64',
  'sellogram-hero-02.b64',
  'sellogram-hero-03.b64',
  'sellogram-hero-04.b64',
  'sellogram-hero-05.b64',
  'sellogram-hero-06.b64',
  'sellogram-hero-07.b64',
];

const encoded = (
  await Promise.all(chunks.map((name) => readFile(path.join(chunkDir, name), 'utf8')))
)
  .join('')
  .replace(/\s+/g, '');

const image = Buffer.from(encoded, 'base64');

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, image);

console.log(`Materialized Sellogram hero image (${image.byteLength} bytes).`);
