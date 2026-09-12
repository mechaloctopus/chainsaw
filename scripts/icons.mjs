import sharp from 'sharp';
import fs from 'node:fs';
const svg = fs.readFileSync('public/icon.svg');
await sharp(svg, { density: 384 }).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(svg, { density: 384 }).resize(512, 512).png().toFile('public/icon-512.png');
const inner = await sharp(svg, { density: 384 }).resize(400, 400).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#141210' } })
  .composite([{ input: inner, top: 56, left: 56 }])
  .png()
  .toFile('public/icon-maskable-512.png');
console.log('icons written');
