/**
 * Lighthouse gate (T-3). Mobile, throttled, on the routes that matter most:
 * the homepage (the heaviest, because of the hero) and the page somebody
 * opens when a line is down.
 */
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const ORIGIN = process.env.ORIGIN ?? 'http://localhost:4321';
const MIN = Number(process.env.LH_MIN ?? 95);
const ROUTES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/', '/modules/12-downed-power-lines/', '/field-card/', '/reference/stihl/'];

process.env.CHROME_PATH =
  process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] });
const failures = [];
const rows = [];

for (const route of ROUTES) {
  const result = await lighthouse(
    ORIGIN + route,
    { port: chrome.port, output: 'json', logLevel: 'error' },
    undefined,
  );
  const s = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([k, v]) => [k, Math.round((v.score ?? 0) * 100)]),
  );
  rows.push({ route, ...s });
  for (const [cat, score] of Object.entries(s)) {
    if (score < MIN) failures.push(`${route} ${cat} ${score} (min ${MIN})`);
  }
  const lcp = result.lhr.audits['largest-contentful-paint'];
  rows[rows.length - 1].lcp = lcp?.displayValue ?? '—';
}

await chrome.kill();

console.log('\nLighthouse (mobile, throttled)\n');
console.log('  route'.padEnd(42) + 'perf  a11y  bp   seo   LCP');
for (const r of rows) {
  console.log(
    '  ' +
      r.route.padEnd(40) +
      String(r.performance).padEnd(6) +
      String(r.accessibility).padEnd(6) +
      String(r['best-practices']).padEnd(5) +
      String(r.seo).padEnd(6) +
      r.lcp,
  );
}

if (failures.length) {
  console.log('');
  for (const f of failures) console.log('  BELOW THRESHOLD  ' + f);
  console.log('');
  process.exit(1);
}
console.log(`\nEvery audited route scores ${MIN} or better in all four categories.\n`);
