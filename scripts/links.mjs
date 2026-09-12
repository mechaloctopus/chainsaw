/** Internal link checker. A broken link on a safety site is a page somebody
 *  needed and did not reach. */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep, posix } from 'node:path';

const DIST = process.env.DIST_DIR ?? 'dist';
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/+$/, '') + '/';

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
const present = new Set(files.map((f) => '/' + relative(DIST, f).split(sep).join(posix.sep)));

const exists = async (p) => {
  if (present.has(p)) return true;
  if (present.has(p.replace(/\/$/, '') + '/index.html')) return true;
  if (present.has(p + '/index.html')) return true;
  try {
    return (await stat(join(DIST, p))).isFile();
  } catch {
    return false;
  }
};

let broken = 0;
let checked = 0;
const external = new Set();

for (const file of html) {
  const text = await readFile(file, 'utf8');
  const from = '/' + relative(DIST, file).split(sep).join(posix.sep);
  for (const m of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(raw)) {
      if (raw.startsWith('http')) external.add(new URL(raw).host);
      continue;
    }
    if (!raw.startsWith('/')) continue;
    const target = raw.split('#')[0].split('?')[0];
    if (!target) continue;
    checked++;
    const rel = target.startsWith(BASE) ? '/' + target.slice(BASE.length) : target;
    if (!(await exists(rel))) {
      broken++;
      console.log(`  BROKEN  ${from}  ->  ${raw}`);
    }
  }
}

console.log(`\nLinks: ${checked} internal checked, ${broken} broken.`);
console.log(`External hosts linked: ${[...external].sort().join(', ') || 'none'}`);
if (broken) process.exit(1);
