# Kaua‘i Saw School — project rules

**Binding.** If a design idea, a feature, or a piece of copy violates one of
these, the rule wins. Change them by pull request, not by drifting from them.

Where a rule is enforceable in code it is enforced in code: `npm run lint:rules`
and `npm run test:a11y` fail the build. The rule number is printed next to the
check.

**Scope.** This repository is a website. It is not an in-person training
program, it does not run classes, and nothing in it should be read as
organizing, scheduling or certifying instruction.

---

## S — Safety and liability

| # | Rule | Enforced |
|---|---|---|
| **S-1** | Life-safety content is never behind an interaction. Power lines, kickback, escape routes and stop-work triggers are readable as plain text with JS disabled, images blocked and no network. An interactive is an enhancement, never the only carrier of a fact that can kill someone. | `lint:rules` asserts the power line page carries "30 feet", "911", "808-246-4300" and "energized" as plain text after scripts and styles are stripped |
| **S-2** | No implication of certification or qualification. Never "certified", "qualified", "trained" or "approved" about a reader. Allowed: "oriented", "familiar with", "has reviewed". Every module carries the disclaimer block. | `lint:rules` checks every module page for the disclaimer and scans every page for credential claims |
| **S-3** | The refusal principle is a first-class feature, not a footnote. It appears as a named, styled component (`StopWork`) on every module where it applies, and every module declares its stop-work triggers in frontmatter. | Content schema + `StopWork` component |
| **S-4** | Never teach a technique without its failure mode. Every procedure is paired with what goes wrong and what it looks like on the way to going wrong. | The `Fail` component **requires** a `tell` prop; `lint:rules` asserts every module has a failure-modes section |
| **S-5** | Electrical content is conservative and absolute. No nuance, no "unless". Assume every line is energized. The fixed language lives in module 12 and in `src/data/site.ts`. | One source of truth for every number |
| **S-6** | Legal review before a public launch under a real domain: the disclaimer, the terms, and the trademark handling. (The in-person questions in the original charter are out of scope — this repository is a website.) | Open — see README |
| **S-7** | Numeric specs carry provenance. Any torque, clearance, gap, angle, depth or distance figure is tagged with where it came from. If it cannot be sourced it does not ship as a number — it ships as "check your manual" and appears on `/about/verify/`. | The `Spec` component renders `[source]` or `[unverified — check your manual]`; the backlog is `src/data/verify.ts` |
| **S-8** | No images of unsafe practice without an explicit WRONG treatment, and no photographs of identifiable people without a release. | Currently moot: the site has no photographs. Every illustration is original SVG. |

## C — Content

- **C-1 — Field voice.** Short declaratives. Second person. No corporate
  hedging, no hype. A tired person at 2pm with sawdust in their eyes has to
  parse it.
- **C-2 — One idea per screen.** Authored in screen-sized chunks, not walls.
- **C-3 — Hawai‘i-specific or it does not belong.** Generic chainsaw content is
  everywhere. The value here is albizia, ironwood, java plum, monkeypod, mango,
  coconut, wet ground, salt air, KIUC, county rules, and plantation-era wire
  grown into trunks.
- **C-4 — Every module has:** objective → procedure → failure modes →
  stop-work triggers → field card line. *Enforced by the content schema and
  `lint:rules`.*
- **C-5 — Never reproduce manufacturer diagrams or manual text.** Redraw as
  original SVG.
- **C-6 — Terminology is fixed** in `/reference/glossary/` and used
  consistently. Sawyer. Swamper. Never "operator/assistant".

## D — Design

- **D-1 — Orange is a signal, never decoration.** `--hazard` (high-vis PPE
  orange) is reserved exclusively for hazard, danger and stop-work. Nothing else
  on the site may use it. *Enforced: `lint:rules` walks every stylesheet and
  component and fails if the token appears under a selector that is not a hazard
  component.* The hero makes the rule literal — the scene contains no orange
  until you find something that can kill you.
- **D-2 — Sunlight legibility floor.** Body text 18px minimum; 7:1 contrast for
  body (AAA), 4.5:1 absolute floor for anything. *Enforced: `test:a11y` measures
  the computed body size on every route and runs axe's enhanced-contrast rule.*
  `--steel` measured 3.9:1 on the page ground and is therefore restricted to
  hairlines; `--steel-deep` (7.1:1) carries metadata text.
- **D-3 — Glove-sized targets.** 56×56px minimum on anything you press. No
  hover-dependent information, ever. No tooltips. *Enforced: `test:a11y`
  measures every control at 390px wide, using the label's box where a control
  sits inside one.*
- **D-4 — One-handed reachability.** Primary navigation lives in the bottom
  third of the viewport on mobile.
- **D-5 — Spend boldness in one place per page.** On the homepage that is the
  hazard scan. Everything around it is quiet.
- **D-6 — Motion answers action.** Reveals that respond to a tap are good.
  Scroll-triggered fade-ups are banned. One orchestrated page-load moment, on
  the homepage only. `prefers-reduced-motion` fully respected.
- **D-7 — Banned defaults.** Warm cream + terracotta palette; all-caps
  tracked-out eyebrow labels; identical rounded cards with identical grey
  shadows; gradient washes as decoration; `→` appended to button text; meta
  strings joined by middle dots; a single accented word in a headline.
- **D-8 — Diagrams are native SVG,** themed by CSS variables, readable at 360px
  wide, with every label present in the DOM. No raster screenshots of diagrams.

## T — Technical

- **T-1 — Static only.** No server. Flat files on GitHub Pages.
- **T-2 — Offline-first.** The whole site is cached on first visit. A crew with
  no bars must be able to open the power line page. The precache manifest is
  generated from the build output by `scripts/pwa.mjs`.
- **T-3 — Performance budget.** Under 120KB of gzipped JS on any route,
  Lighthouse ≥95 in all four categories on mobile. *Enforced: `test:budget` and
  `scripts/lighthouse.mjs`.* Current worst route: 3.3KB of JS.
- **T-4 — Zero-JS baseline.** Every page renders complete, readable content with
  JavaScript disabled. Interactivity hydrates as islands over content that is
  already there.
- **T-5 — No third-party tracking, no ad networks, no cookie banners** (because
  no cookies). *Enforced: `lint:rules` fails if any page loads an asset from
  another origin.*
- **T-6 — Content lives in MDX, not in components.** A typo must be fixable from
  the GitHub mobile app. Components used in content need no import line — the
  layout passes them in.
- **T-7 — Accessibility is CI-enforced.** axe on every route, keyboard
  complete, visible focus rings, real landmarks, text equivalents on everything.

## L — Licensing and attribution

- **L-1 — Code MIT, content CC BY 4.0.** Maui, Hawai‘i Island, Puerto Rico or
  Florida can fork this.
- **L-2 — Every third-party asset gets a row in `ASSET_LICENSES.csv`** before it
  enters the repo. *Enforced: `lint:rules`.*
- **L-3 — Public domain sources are strongly preferred** over CC BY-SA, to keep
  the content license clean.
- **L-4 — Trademark hygiene.** STIHL and ECHO are used nominatively. No logos,
  no brand colors, no implication of endorsement. Notice in the footer.

## A — Affiliate

- **A-1 — FTC disclosure at the top of any page containing affiliate links,**
  not only in the footer.
- **A-2 — Commission never influences recommendation or order.** Published as
  `/about/editorial-policy/`.
- **A-3 — No affiliate links on life-safety pages.** *Enforced: `lint:rules`
  scans every module marked `lifeSafety` for commercial links and fails.*
- **A-4 — PPE is recommended by standard, not by product.**
- **A-5 — A local dealer is listed alongside any online link.**

---

## Deviations from the original charter

Each of these was a deliberate decision, and each is reversible.

1. **No Tailwind.** The charter specified Tailwind with a locked token config.
   In practice this site has no utility-class usage at all — the layout is a
   single strong column with one structural rail — so Tailwind contributed a
   preflight to fight and bundle weight to justify, against T-3. The tokens are
   locked in `src/styles/tokens.css` as plain custom properties, which gives the
   same guarantee (no arbitrary values) with nothing to purge.

2. **Fonts are vendored, not fetched.** The charter named Archivo Expanded and
   Atkinson Hyperlegible Next from a provider. Both are vendored into
   `src/fonts/` under the OFL and served locally: the build needs no network, no
   third-party request happens at runtime (T-5), and the files land in the
   offline precache (T-2). Archivo's variable width axis is dialled to 115 to
   get Expanded, which is better than the static cut — one file, exact width.

3. **A hand-rolled service worker instead of the Vite PWA plugin.** T-2 needs
   the *whole site* precached, and a generated-from-build-output manifest is
   both smaller and more legible than a plugin configuration. `scripts/pwa.mjs`
   is 120 lines and you can read exactly what will be cached.

4. **Interactives have one canonical home each.** The charter's v1 list ships in
   full (hazard scan, saw anatomy, STIHL decoder, chain finder, rotation timer),
   but each lives on exactly one page rather than being embedded in several, so
   there is no duplicate content. `/tools/` is an index that points at them.

5. **In-person training is out of scope.** The site is the deliverable. The
   charter's in-person curriculum, waiver and insurance items are not in this
   repository.
