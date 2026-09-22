/**
 * One-time asset optimization pass: converts the project's raster images to
 * WebP (and AVIF for the hero portrait, the single largest-impact image on
 * the page) alongside the originals. Originals are kept as the final
 * <picture> fallback for the very small share of browsers without WebP
 * support -- this is the same layered-format pattern used by Vercel,
 * Stripe, etc. Run with: node scripts/convert-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:');

const EMBLEM_DIR = join(ROOT, 'src/assets/emblems');
const IMAGE_DIR = join(ROOT, 'src/assets/images');

function humanSize(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

// Emblems whose source art is thin hairline strokes with no solid fill (as
// opposed to e.g. India's solid pillar or UAE's solid eagle). Those thin
// lines have a real alpha channel that partially averages away to near-
// transparent when downsampled hard, which is what made Oman's crest read
// as washed-out pink instead of red once shrunk to on-screen size. The fix
// is a larger intermediate resolution (less alpha loss per resize step)
// plus a modest saturation boost -- modulate() leaves true white/gray
// untouched (zero saturation stays zero), so the background never tints.
const DELICATE_LINEART = new Set(['oman.png']);

async function convertEmblems() {
  const files = readdirSync(EMBLEM_DIR).filter((f) => extname(f) === '.png');
  console.log(`\n--- Emblems (${files.length}) -> WebP ---`);
  for (const file of files) {
    const inPath = join(EMBLEM_DIR, file);
    const outPath = join(EMBLEM_DIR, `${basename(file, '.png')}.webp`);
    const before = statSync(inPath).size;
    const isDelicate = DELICATE_LINEART.has(file);

    let pipeline = sharp(inPath).resize(isDelicate ? 480 : 240, isDelicate ? 480 : 240, {
      fit: 'inside',
      kernel: 'lanczos3',
    });
    if (isDelicate) pipeline = pipeline.modulate({ saturation: 1.8 });
    await pipeline.webp({ quality: isDelicate ? 95 : 90, alphaQuality: isDelicate ? 100 : 90 }).toFile(outPath);

    const after = statSync(outPath).size;
    console.log(`${file}: ${humanSize(before)} -> ${basename(outPath)}: ${humanSize(after)} (${Math.round((1 - after / before) * 100)}% smaller)${isDelicate ? '  [delicate lineart: higher-res + saturation boost]' : ''}`);
  }
}

async function convertHeroPortrait() {
  const inPath = join(IMAGE_DIR, 'hero-zeenat.jpg');
  const before = statSync(inPath).size;
  console.log(`\n--- Hero portrait -> AVIF + WebP, source ${humanSize(before)} ---`);

  const webpPath = join(IMAGE_DIR, 'hero-zeenat.webp');
  await sharp(inPath).webp({ quality: 82 }).toFile(webpPath);
  console.log(`hero-zeenat.jpg -> hero-zeenat.webp: ${humanSize(statSync(webpPath).size)}`);

  const avifPath = join(IMAGE_DIR, 'hero-zeenat.avif');
  await sharp(inPath).avif({ quality: 60 }).toFile(avifPath);
  console.log(`hero-zeenat.jpg -> hero-zeenat.avif: ${humanSize(statSync(avifPath).size)}`);
}

await convertEmblems();
await convertHeroPortrait();
console.log('\nDone.');
