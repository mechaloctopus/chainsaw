/**
 * Renders /field-card/ to public/field-card.pdf using the page's own print
 * stylesheet, so the PDF and the printed web page cannot disagree.
 *
 * Run it against a built, served copy of the site:
 *   npm run build && npm run serve &   then   npm run field-card
 * The result is committed, so a reader can download the card without this
 * toolchain existing anywhere near the deploy.
 */
import { chromium } from 'playwright-core';

const EXE = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ORIGIN = process.env.ORIGIN ?? 'http://localhost:4321';
const OUT = process.env.OUT ?? 'public/field-card.pdf';

const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto(`${ORIGIN}/field-card/`, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: OUT,
  format: 'Letter',
  printBackground: true,
  margin: { top: '8mm', bottom: '8mm', left: '8mm', right: '8mm' },
});
await browser.close();
console.log(`wrote ${OUT}`);
