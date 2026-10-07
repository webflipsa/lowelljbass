#!/usr/bin/env node
/**
 * Convert a photo/graphic to an SEO-friendly WebP in public/assets/img/.
 *
 *   npm run img -- <input> <descriptive-file-name> [--dir=bass] [--quality=88] [--lossless] [--max=2000]
 *
 * Examples
 *   npm run img -- ~/Downloads/IMG_4021.jpg lowell-jeffery-online-bass-lesson
 *   npm run img -- art/neck.png bass-fretboard-neck-tile --dir=bass --lossless
 *
 * - Name the file for what it shows, in kebab-case, e.g. `lowell-jeffery-bass-teacher-pretoria`
 *   (Google Images reads the file name). Don't include an extension.
 * - Photos: lossy WebP at quality 88 (visually transparent), longest side capped at --max (default 2000px),
 *   EXIF rotation applied, metadata (GPS etc.) stripped.
 * - Graphics with transparency: use --quality=96 (or --lossless for textures that must stay pixel-exact).
 * - Prints the width/height to paste into lib/photos.ts and a ready-made entry.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
const [input, name] = args.filter((a) => !a.startsWith('--'));

if (!input || !name) {
  console.error('Usage: npm run img -- <input> <descriptive-file-name> [--dir=bass] [--quality=88] [--lossless] [--max=2000]');
  process.exit(1);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  console.error(`File name "${name}" should be lowercase kebab-case without an extension, e.g. lowell-jeffery-bass-lesson-online`);
  process.exit(1);
}

const outDir = path.join(root, 'public', 'assets', 'img', typeof flags.dir === 'string' ? flags.dir : '');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `${name}.webp`);

const max = Number(flags.max || 2000);
const webp = flags.lossless
  ? { lossless: true, effort: 6 }
  : { quality: Number(flags.quality || 88), alphaQuality: 100, effort: 6, smartSubsample: true };

const info = await sharp(path.resolve(input))
  .rotate() // honour EXIF orientation, then strip metadata (sharp drops it by default)
  .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
  .webp(webp)
  .toFile(outFile);

const rel = path.relative(path.join(root, 'public'), outFile).replaceAll('\\', '/');
console.log(`✓ /${rel}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
console.log(`  photos.ts → p('${rel.replace('assets/img/', '')}', ${info.width}, ${info.height}, 'Describe what is in the photo (alt text)')`);
