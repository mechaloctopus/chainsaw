# Kaua‘i Saw School

Offline-capable chainsaw safety training for volunteers clearing storm debris on
Kaua‘i. Static site, no server, works with the network off.

**It does not certify anyone.** It is written reference material for people who
already own a saw and are about to use it on wood that a hurricane put on the
ground.

---

## What is here

- **Fifteen modules**, 00–14, from the refusal principle through felling
  fundamentals. Each one ends with what goes wrong, when to stop, and the line
  that goes on the field card.
- **Five interactives**, each of which degrades to complete static content: a
  hazard scan of a post-storm yard, a labelled saw anatomy plate, a STIHL model
  decoder, a chain finder, and a tank-for-tank rotation timer.
- **Seven original SVG plates** — kickback quadrant, bind order, hinge and face,
  spring pole, 30 feet, chain numbers, tooth profile. Drawn for this site. No
  traced manufacturer artwork anywhere.
- **A two-sided printable field card**, generated from the modules themselves so
  it cannot drift out of step with them.
- **Offline**: the whole site caches on first visit. 2.2MB, 85 files.

## Running it

```bash
npm install
npm run dev          # http://localhost:4321
```

```bash
npm run build        # astro build -> pagefind -> rebase -> service worker
npm run serve        # serve dist/ on :4321
```

## The checks

Every one of these fails the build rather than filing a ticket. The rule number
from [`PROJECT_RULES.md`](PROJECT_RULES.md) is printed next to each check.

```bash
npm run lint:rules       # D-1 hazard token, S-1 plain-text life safety,
                         # S-2 disclaimers, S-4 failure modes, A-3 clean
                         # life-safety pages, C-4 module template,
                         # L-2 asset licenses, T-5 no third-party requests,
                         # T-7 text equivalents
npm run test:links       # every internal link resolves
npm run test:budget      # JS, CSS, HTML and font budgets per route
npm run test:a11y        # axe on every route + 18px floor + 56px targets
npm run test:lighthouse  # >= 95 in all four categories, mobile
```

The a11y and Lighthouse gates need the site served (`npm run serve &`) and a
Chrome binary. Point `CHROME_PATH` at one if it is not on the default path.

Current numbers:

| | |
|---|---|
| Worst-route JS | **3.3KB** gzipped (budget: 120KB) |
| Worst-route CSS | 6.5KB gzipped, inlined |
| Lighthouse mobile | **96–99 / 100 / 100 / 100** across the audited routes |
| LCP | 1.8–2.3s under Lighthouse's simulated throttling |
| axe violations | **0** across 29 routes |
| Body text contrast | 15.3:1 (AAA), and AAA-clean sitewide |

The charter's LCP target is <1.8s on real 4G. Lighthouse's simulated mobile
throttle is harsher than real 4G and lands at 1.8–2.3s; that number is reported
as measured rather than massaged.

## Deploying

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`.

- **Custom domain:** put the hostname in `public/CNAME`. The workflow detects it
  and builds with `BASE_PATH=/`.
- **Project site** (`user.github.io/chainsaw/`): no CNAME needed. The workflow
  builds with `BASE_PATH=/chainsaw/` and `scripts/rebase.mjs` rewrites the
  root-absolute links that content authors write by hand.

## How it is built

Astro 7, MDX content collections, zero client framework. Islands are plain
`<script>` — the whole site's JavaScript is a rotation timer, a decoder, a chain
finder, five hit targets on an SVG, a theme toggle and a checklist that
remembers its ticks.

```
src/
  content/modules/     00-14, MDX. The actual point of the project.
  content/reference/   glossary, STIHL, ECHO, gear
  components/          StopWork, Hazard, Fail, Spec, Checklist, …
  islands/             the five interactives
  diagrams/            original SVG plates
  data/                one source of truth for numbers, parts, species, specs
  styles/tokens.css    six locked colours, with measured contrast ratios
scripts/               the CI gates, the service worker generator, the PDF
```

Read [`PROJECT_RULES.md`](PROJECT_RULES.md) before changing anything, and
[`CONTENT_STYLE.md`](CONTENT_STYLE.md) before writing anything.

## What this needs most

1. **A second reviewer.** Every module says at the top that it has not been
   reviewed by a working sawyer other than its author, because it hasn't. If you
   cut for a living, read one and push back hard. This is the single most
   valuable contribution available.
2. **Verified numbers.** [`VERIFY.md`](VERIFY.md) and `/about/verify/` list
   eighteen open items, each naming its primary source. KIUC's number and the
   30-foot figure matter most — they are on the field card and in every footer.
3. **Original photography** of real Kaua‘i cleanup work, with releases.
4. **Translation.** Crews here are multilingual; the site is English only.
5. **Legal review** of the disclaimer, terms and trademark handling before a
   public launch on a real domain (S-6).

## Licensing

Code MIT. Content CC BY 4.0 — fork it for your island, change the species,
change the utility number, change the county rules, ship it. Fonts are OFL 1.1
and logged, with every other third-party asset, in
[`ASSET_LICENSES.csv`](ASSET_LICENSES.csv).

STIHL and ECHO are trademarks of their respective owners, used nominatively. No
endorsement, sponsorship or affiliation is claimed.
