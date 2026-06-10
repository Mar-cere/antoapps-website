import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const HERO_DIR = join(process.cwd(), 'public/assets/images/hero');
const PNG_PREFIX = 'anto-';

const files = await readdir(HERO_DIR);
const pngs = files.filter((f) => f.startsWith(PNG_PREFIX) && f.endsWith('.png'));

for (const png of pngs) {
  const input = join(HERO_DIR, png);
  const output = join(HERO_DIR, png.replace(/\.png$/, '.webp'));
  await sharp(input).webp({ quality: 85 }).toFile(output);
  const inSize = (await stat(input)).size;
  const outSize = (await stat(output)).size;
  console.log(
    `${png} → ${png.replace(/\.png$/, '.webp')} (${Math.round(inSize / 1024)}KB → ${Math.round(outSize / 1024)}KB)`
  );
}

console.log(`OK: ${pngs.length} screenshots convertidos a WebP.`);
