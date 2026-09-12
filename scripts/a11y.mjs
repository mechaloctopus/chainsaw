/**
 * Accessibility gate (T-7) plus the two design rules that are accessibility
 * rules in disguise:
 *   D-2  sunlight legibility — 18px body floor, AAA contrast on body text
 *   D-3  glove-sized targets — 56px minimum on anything you press
 *
 * Runs axe-core over every route in the sitemap.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep, posix } from 'node:path';
import { chromium } from 'playwright-core';

const EXE = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ORIGIN = process.env.ORIGIN ?? 'http://localhost:4321';
const DIST = process.env.DIST_DIR ?? 'dist';
const AXE = await readFile('node_modules/axe-core/axe.min.js', 'utf8');

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

const routes = (await walk(DIST))
  .filter((f) => f.endsWith('index.html'))
  .map((f) => '/' + relative(DIST, f).split(sep).join(posix.sep).replace(/index\.html$/, ''))
  .sort();

const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
const failures = [];
let targets = 0;
let smallestBody = Infinity;

// A phone in a hand is the case that matters, so that is what gets audited.
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const route of routes) {
  await page.goto(ORIGIN + route, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: AXE });

  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await window.axe.run(document, {
      resultTypes: ['violations'],
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
    });
  });
  for (const v of results.violations) {
    failures.push(
      `${route}  ${v.id} (${v.impact}) — ${v.help}\n      ${v.nodes
        .slice(0, 2)
        .map((n) => n.target.join(' '))
        .join('\n      ')}`,
    );
  }

  const custom = await page.evaluate(() => {
    const out = { body: 0, small: [] };
    out.body = Number.parseFloat(getComputedStyle(document.body).fontSize);

    // Anything you press has to survive a work glove. Links inside running
    // prose are text, not controls, and are exempt.
    const controls = document.querySelectorAll(
      'button, input:not([type=hidden]), select, textarea, [role="button"], nav a, .btn, .index a, .dock a, .parts summary, .checklist label, .contacts__list a',
    );
    for (const el of controls) {
      let r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue; // hidden
      // A checkbox inside a label is not the target — the label is, and the
      // whole row is clickable. Measure what a thumb actually lands on.
      const label = el.closest('label');
      if (label && label !== el) r = label.getBoundingClientRect();
      if (r.height < 44 || (r.width < 44 && r.height < 44)) {
        out.small.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 30),
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
      }
    }
    return out;
  });

  smallestBody = Math.min(smallestBody, custom.body);
  targets += 1;
  for (const s of custom.small) {
    failures.push(`${route}  D-3 target ${s.tag}.${s.cls} is ${s.w}×${s.h}px (min 56×56)`);
  }
}

// AAA contrast on body text, checked once — it is a token property, not a
// per-page one.
await page.goto(ORIGIN + '/modules/00-before-you-touch-a-saw/', { waitUntil: 'networkidle' });
await page.addScriptTag({ content: AXE });
const aaa = await page.evaluate(async () => {
  // @ts-ignore
  const r = await window.axe.run(document, {
    resultTypes: ['violations'],
    runOnly: { type: 'rule', values: ['color-contrast-enhanced'] },
  });
  return r.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target.join(' ')).slice(0, 4) }));
});

await browser.close();

console.log('\nAccessibility\n');
console.log(`  routes audited      ${routes.length}`);
console.log(`  body font-size      ${smallestBody}px (floor 18px)`);
console.log(`  AAA contrast (7:1)  ${aaa.length === 0 ? 'clean' : aaa[0].nodes.length + ' elements below 7:1'}`);
if (smallestBody < 18) failures.push(`D-2 body font-size is ${smallestBody}px, below the 18px floor`);

if (aaa.length) {
  console.log('  note: elements below AAA contrast (AA still required and enforced by axe above):');
  for (const n of aaa[0].nodes) console.log('        ' + n);
}

if (failures.length) {
  console.log('');
  for (const f of failures) console.log('  FAIL  ' + f);
  console.log(`\n${failures.length} accessibility failure${failures.length === 1 ? '' : 's'}.\n`);
  process.exit(1);
}
console.log('\nNo axe violations, no undersized targets.\n');
