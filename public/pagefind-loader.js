/* Loads the Pagefind search index.
 *
 * This file lives in public/ and is copied verbatim, never processed by the
 * bundler — which is the point. The index is generated after the bundler has
 * run, so a dynamic import inside a bundled module gets wrapped in a preload
 * helper that cannot resolve it. Here, the import is exactly what it says.
 */
const base = document.documentElement.dataset.base || '/';
try {
  window.__pagefind = await import(`${base}_pagefind/pagefind.js`);
  window.dispatchEvent(new Event('pagefind:ready'));
} catch {
  window.dispatchEvent(new Event('pagefind:failed'));
}
