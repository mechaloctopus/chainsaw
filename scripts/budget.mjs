/**
 * Performance budget (T-3). Fails the build rather than filing a ticket.
 *
 * The number that matters on this site is JavaScript: a volunteer opening the
 * power line page on a phone with one bar should not be waiting on a bundle.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep, posix, dirname } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = process.env.DIST_DIR ?? 'dist';
const LIMITS = {
  jsPerRoute: 120 * 1024, // gzipped, per route
  cssPerRoute: 60 * 1024,
  fontsTotal: 200 * 1024,
  htmlPerRoute: 100 * 1024,
};

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = await walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const gzipCache = new Map();

async function gz(path) {
  if (gzipCache.has(path)) return gzipCache.get(path);
  let size = 0;
  try {
    size = gzipSync(await readFile(path)).length;
  } catch {
    size = 0;
  }
  gzipCache.set(path, size);
  return size;
}

const resolve = (from, url) => {
  const clean = url.split('?')[0].split('#')[0];
  if (clean.startsWith('/')) return join(DIST, clean);
  return join(dirname(from), clean);
};

let worstJs = { route: '', bytes: 0 };
let worstCss = { route: '', bytes: 0 };
let worstHtml = { route: '', bytes: 0 };
const failures = [];

for (const file of html) {
  const route = '/' + relative(DIST, file).split(sep).join(posix.sep).replace(/index\.html$/, '');
  const text = await readFile(file, 'utf8');

  let js = 0;
  for (const m of text.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
    if (/^https?:/.test(m[1])) continue;
    js += await gz(resolve(file, m[1]));
  }
  for (const m of text.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    js += gzipSync(Buffer.from(m[1])).length;
  }

  let css = 0;
  for (const m of text.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)) {
    css += await gz(resolve(file, m[1]));
  }
  for (const m of text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
    css += gzipSync(Buffer.from(m[1])).length;
  }

  const htmlBytes = gzipSync(Buffer.from(text)).length;

  if (js > worstJs.bytes) worstJs = { route, bytes: js };
  if (css > worstCss.bytes) worstCss = { route, bytes: css };
  if (htmlBytes > worstHtml.bytes) worstHtml = { route, bytes: htmlBytes };

  if (js > LIMITS.jsPerRoute) failures.push(`${route}: ${(js / 1024).toFixed(1)}KB of JS (limit ${LIMITS.jsPerRoute / 1024}KB gzipped)`);
  if (css > LIMITS.cssPerRoute) failures.push(`${route}: ${(css / 1024).toFixed(1)}KB of CSS (limit ${LIMITS.cssPerRoute / 1024}KB gzipped)`);
  if (htmlBytes > LIMITS.htmlPerRoute) failures.push(`${route}: ${(htmlBytes / 1024).toFixed(1)}KB of HTML (limit ${LIMITS.htmlPerRoute / 1024}KB gzipped)`);
}

let fonts = 0;
for (const f of files.filter((x) => x.endsWith('.woff2'))) fonts += (await stat(f)).size;
if (fonts > LIMITS.fontsTotal)
  failures.push(`fonts total ${(fonts / 1024).toFixed(0)}KB (limit ${LIMITS.fontsTotal / 1024}KB)`);

const kb = (n) => `${(n / 1024).toFixed(1)}KB`;
console.log('\nPerformance budget (gzipped)\n');
console.log(`  worst JS    ${kb(worstJs.bytes).padStart(8)}  ${worstJs.route}`);
console.log(`  worst CSS   ${kb(worstCss.bytes).padStart(8)}  ${worstCss.route}`);
console.log(`  worst HTML  ${kb(worstHtml.bytes).padStart(8)}  ${worstHtml.route}`);
console.log(`  fonts       ${kb(fonts).padStart(8)}  (uncompressed, woff2 is already compressed)`);
console.log(`  routes      ${html.length}`);

if (failures.length) {
  console.log('');
  for (const f of failures) console.log('  OVER BUDGET  ' + f);
  console.log('');
  process.exit(1);
}
console.log('\nEvery route is inside budget.\n');
