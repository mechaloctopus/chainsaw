/**
 * Rewrites root-absolute URLs for a GitHub Pages *project* site, which serves
 * from /<repo>/ rather than /.
 *
 * Astro's `base` handles everything that goes through the url helper, but
 * links written in Markdown — `[the refusal principle](/modules/00-.../)` —
 * are authored as plain root-absolute paths on purpose (Rule T-6: content
 * authors edit prose, not plumbing). This fixes those at the end of the build.
 *
 * No-op when BASE_PATH is '/', which is the custom-domain case.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = process.env.DIST_DIR ?? 'dist';
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/+$/, '') + '/';

if (BASE === '/') {
  console.log('rebase: BASE_PATH is /, nothing to do');
  process.exit(0);
}

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = (await walk(DIST)).filter((f) => /\.(html|webmanifest|xml)$/.test(f));
let touched = 0;
let rewrites = 0;

for (const file of files) {
  const text = await readFile(file, 'utf8');
  const next = text.replace(/(href|src|content)="\/(?!\/)([^"]*)"/g, (m, attr, path) => {
    if (('/' + path).startsWith(BASE)) return m;
    rewrites++;
    return `${attr}="${BASE}${path}"`;
  });
  if (next !== text) {
    await writeFile(file, next);
    touched++;
  }
}

console.log(`rebase: ${rewrites} URLs rewritten to ${BASE} across ${touched} files`);
