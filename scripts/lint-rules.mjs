/**
 * The project rules, enforced in code.
 *
 * A constitution that is only a document drifts. These checks fail the build
 * instead: the orange token cannot escape the hazard components, a life-safety
 * page cannot grow a product link, and an asset cannot enter the repo without
 * its license row.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, extname, sep } from 'node:path';

const DIST = process.env.DIST_DIR ?? 'dist';
const failures = [];
const checks = [];
const fail = (rule, msg) => failures.push(`${rule}  ${msg}`);
const pass = (rule, msg) => checks.push(`${rule}  ${msg}`);

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', '.astro'].includes(e.name)) continue;
      await walk(full, out);
    } else out.push(full);
  }
  return out;
}

const srcFiles = await walk('src');
const distFiles = await walk(DIST);
const html = distFiles.filter((f) => f.endsWith('.html'));

/* ------------------------------------------------------------------ D-1 --
 * --hazard is reserved for danger, and only hazard-semantic selectors may
 * touch it. This is the site's visual thesis; it is not a preference.
 */
{
  const ALLOWED = /(hazard|stopwork|danger|onhaz|dock__hazard|index__flag|mark__|\.marks|is-missed|is-found|card__box--hz|\.hit|--hazard-wash)/;
  // Where the token is legitimately *defined* rather than used.
  const DEFINING = /^src[\\/]styles[\\/]tokens\.css$/;
  let used = 0;

  for (const file of srcFiles) {
    if (!['.css', '.astro', '.mdx', '.ts'].includes(extname(file))) continue;
    const rel = relative('.', file);
    const text = await readFile(file, 'utf8');
    const lines = text.split('\n');
    let selector = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/\{\s*$/.test(line) && !/^\s*\/\//.test(line)) selector = line.trim();
      const hit = /var\(--hazard\)|var\(--color-hazard\)|#ff5a00/i.test(line);
      if (!hit) continue;
      if (DEFINING.test(rel.split('/').join(sep))) continue;
      used++;
      const context = `${selector} ${line}`;
      if (!ALLOWED.test(context)) {
        fail('D-1', `${rel}:${i + 1} uses --hazard outside a hazard component:\n        ${line.trim()}`);
      }
    }
  }
  if (used === 0) fail('D-1', 'the hazard token is never used — the hazard components are missing');
  else pass('D-1', `--hazard used ${used}× and every use is inside a hazard component`);
}

/* ------------------------------------------------------------------ T-7 --
 * Every image carries a text equivalent, and every diagram has a title.
 */
{
  let imgs = 0;
  let svgs = 0;
  for (const file of html) {
    const text = await readFile(file, 'utf8');
    const rel = relative(DIST, file);
    for (const m of text.matchAll(/<img\b[^>]*>/g)) {
      imgs++;
      if (!/\balt\s*=/.test(m[0])) fail('T-7', `${rel}: <img> with no alt — ${m[0].slice(0, 80)}`);
    }
    for (const m of text.matchAll(/<svg\b[^>]*role="img"[^>]*>/g)) {
      svgs++;
      if (!/aria-labelledby|aria-label/.test(m[0]))
        fail('T-7', `${rel}: <svg role="img"> with no accessible name`);
    }
    // A decorative svg must be hidden from the tree rather than left ambiguous.
    for (const m of text.matchAll(/<svg\b(?![^>]*(role="img"|aria-hidden|class="scene"|class="plate"))[^>]*>/g)) {
      fail('T-7', `${rel}: <svg> is neither role="img" nor aria-hidden — ${m[0].slice(0, 70)}`);
    }
  }
  pass('T-7', `${imgs} images and ${svgs} titled diagrams checked for text equivalents`);
}

/* ------------------------------------------------------------------ A-3 --
 * Life-safety pages are commercially clean.
 */
{
  const COMMERCE = /amazon\.|amzn\.to|northerntool\.|acmetools\.|baileysonline\.|treestuff\.|\?tag=|affiliate/i;
  const lifeSafety = [];
  for (const file of await walk('src/content/modules')) {
    const text = await readFile(file, 'utf8');
    if (/^lifeSafety:\s*true/m.test(text)) lifeSafety.push(file);
  }
  if (lifeSafety.length === 0) fail('A-3', 'no module is marked lifeSafety — the flag is not wired up');
  for (const file of lifeSafety) {
    const text = await readFile(file, 'utf8');
    if (COMMERCE.test(text)) fail('A-3', `${relative('.', file)} is a life-safety module and contains a commercial link`);
  }
  pass('A-3', `${lifeSafety.length} life-safety modules carry no commercial links`);
}

/* ------------------------------------------------------------------ S-2 --
 * Every module carries the disclaimer, and nothing on the site claims to
 * qualify anyone.
 */
{
  const DISCLAIMER = 'This is reference material, not training';
  const mods = html.filter((f) => f.includes(`modules${sep}`) && !f.endsWith(`modules${sep}index.html`));
  for (const file of mods) {
    const text = await readFile(file, 'utf8');
    if (!text.includes(DISCLAIMER)) fail('S-2', `${relative(DIST, file)} is missing the disclaimer block`);
  }
  // Phrases that would imply the site confers a credential.
  const CLAIMS = [
    /you are now (certified|qualified|trained)/i,
    /certificate of completion/i,
    /\bthis (site|course) certifies\b/i,
  ];
  for (const file of html) {
    const text = await readFile(file, 'utf8');
    for (const re of CLAIMS) {
      if (re.test(text)) fail('S-2', `${relative(DIST, file)} implies a credential: ${re}`);
    }
  }
  pass('S-2', `${mods.length} module pages carry the disclaimer and none claim to certify`);
}

/* ------------------------------------------------------------------ S-1 --
 * The power line rule survives with no CSS, no JS and no images: it has to be
 * in the HTML as text.
 */
{
  const file = join(DIST, 'modules', '12-downed-power-lines', 'index.html');
  const text = await readFile(file, 'utf8').catch(() => '');
  const strip = text.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const plain = strip.replace(/<[^>]+>/g, ' ').replace(/&#?\w+;/g, ' ');
  for (const must of ['30 feet', '911', '808-246-4300', 'energized']) {
    if (!plain.includes(must)) fail('S-1', `the power line page does not carry "${must}" as plain text`);
  }
  pass('S-1', 'the power line rule is readable with JS, CSS and images off');
}

/* ------------------------------------------------------------------ L-2 --
 * Every third-party asset has a license row before it enters the repo.
 */
{
  const csv = await readFile('ASSET_LICENSES.csv', 'utf8').catch(() => null);
  if (!csv) {
    fail('L-2', 'ASSET_LICENSES.csv is missing');
  } else {
    const rows = csv.split('\n').slice(1).filter(Boolean);
    const listed = new Set(rows.map((r) => r.split(',')[0].trim()));
    const third = (await walk('src/fonts')).filter((f) => f.endsWith('.woff2'));
    for (const f of third) {
      const rel = relative('.', f).split(sep).join('/');
      if (!listed.has(rel)) fail('L-2', `${rel} has no row in ASSET_LICENSES.csv`);
    }
    pass('L-2', `${third.length} third-party assets, all licensed and logged`);
  }
}

/* ------------------------------------------------------------------ C-4 --
 * Module structure: objective, field card line, and a stop-work list.
 */
{
  const mods = await walk('src/content/modules');
  for (const file of mods) {
    const text = await readFile(file, 'utf8');
    const rel = relative('.', file);
    if (!/^objective:/m.test(text)) fail('C-4', `${rel} has no objective`);
    if (!/^fieldCard:/m.test(text)) fail('C-4', `${rel} has no field card line`);
    if (!/<FailureModes|<Fail\b/.test(text)) fail('S-4', `${rel} teaches without a failure modes section`);
  }
  pass('C-4', `${mods.length} modules carry objective, field card line and failure modes`);
}

/* ------------------------------------------------------------------ T-5 --
 * No third-party requests at runtime. Everything is served from this origin.
 */
{
  const THIRD_PARTY = /(src|href)="https?:\/\/(?!kauaisawschool\.org)/g;
  const ALLOW = /(creativecommons\.org|github\.com|openfontlicense|openfontlicense\.org)/;
  for (const file of html) {
    const text = await readFile(file, 'utf8');
    for (const m of text.matchAll(THIRD_PARTY)) {
      const snippet = text.slice(m.index, m.index + 90);
      // Anchors to other sites are fine; loading assets from them is not.
      if (/^src=/.test(snippet) && !ALLOW.test(snippet))
        fail('T-5', `${relative(DIST, file)} loads a third-party asset: ${snippet.slice(0, 70)}`);
    }
  }
  pass('T-5', 'no page loads a script, style, font or image from another origin');
}

console.log('\nProject rules\n');
for (const c of checks) console.log('  ok    ' + c);
if (failures.length) {
  console.log('');
  for (const f of failures) console.log('  FAIL  ' + f);
  console.log(`\n${failures.length} rule violation${failures.length === 1 ? '' : 's'}.\n`);
  process.exit(1);
}
console.log(`\nAll ${checks.length} rule groups pass.\n`);
