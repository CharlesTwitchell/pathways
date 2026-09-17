import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('public/icons', { recursive: true });

const svgPath = 'scripts/icon-source.svg';

const targets = [
  { file: 'public/icons/icon-192.png', size: 192 },
  { file: 'public/icons/icon-512.png', size: 512 },
  { file: 'public/icons/maskable-512.png', size: 512, padding: 0.15 },
  { file: 'public/icons/apple-touch-icon.png', size: 180 },
];

for (const t of targets) {
  const size = t.size;
  const pipeline = sharp(svgPath, { density: 384 }).resize(size, size);
  if (t.padding) {
    const inner = Math.round(size * (1 - t.padding * 2));
    await sharp(svgPath, { density: 384 })
      .resize(inner, inner)
      .extend({
        top: Math.round((size - inner) / 2),
        bottom: Math.round((size - inner) / 2),
        left: Math.round((size - inner) / 2),
        right: Math.round((size - inner) / 2),
        background: '#1f6f5c',
      })
      .png()
      .toFile(t.file);
  } else {
    await pipeline.png().toFile(t.file);
  }
  console.log('wrote', t.file);
}
