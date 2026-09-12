/** Screenshots at the sizes that matter: a phone in the hand, and a laptop. */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const EXE = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ORIGIN = process.env.ORIGIN ?? 'http://localhost:4321';
const OUT = process.env.SHOT_DIR ?? 'shots';

const pages = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/', '/modules/12-downed-power-lines/', '/modules/02-anatomy-of-the-saw/', '/field-card/', '/reference/stihl/'];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });

for (const [name, viewport, full] of [
  ['mobile', { width: 390, height: 844 }, true],
  ['desktop', { width: 1280, height: 900 }, false],
]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const path of pages) {
    await page.goto(ORIGIN + path, { waitUntil: 'networkidle' });
    const slug = path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home';
    await page.screenshot({ path: `${OUT}/${slug}-${name}.png`, fullPage: full });
  }
  await ctx.close();
}
await browser.close();
console.log('shots written to ' + OUT);
