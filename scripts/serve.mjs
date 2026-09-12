/** Minimal static server for the built site: previews, screenshots, and the
 *  a11y / link / PDF scripts all run against it. Not used in production —
 *  production is flat files on GitHub Pages (T-1). */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const DIST = process.env.DIST_DIR ?? 'dist';
const PORT = Number(process.env.PORT ?? 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    let file = join(DIST, path);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    } catch {
      if (!extname(file)) file = join(DIST, path, 'index.html');
    }
    const body = await readFile(file);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(body);
  } catch {
    try {
      const body = await readFile(join(DIST, '404.html'));
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  }
});

server.listen(PORT, () => console.log(`serving ${DIST} on http://localhost:${PORT}`));
