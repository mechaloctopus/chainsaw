# Content style

How to write for this site. If you are fixing a typo, ignore all of this and
just fix the typo.

## Voice

Short declaratives. Second person. Present tense.

The reader is tired, hot, wearing a helmet, and about to do something
dangerous. Write for that person, not for a person at a desk.

- **Say the thing.** "Stay 30 feet back." Not "it is recommended that a minimum
  clearance of 30 feet be maintained."
- **No hedging.** If it is a rule, it is a rule. If it is a judgement call, say
  which way you would call it and why.
- **No hype.** No "game-changing", no "pro tips", no exclamation marks.
- **Respect the reader.** They own a saw and have been using it. Lead with what
  they do not know, not with what they should have known.
- **Name the consequence.** "A chain brake packed with oily sawdust cannot
  clamp" beats "keep the saw clean".
- **Second person for the reader, not for hypotheticals.** "You cut the
  compression side first." Not "one should".

Spelling is US English throughout: *energized*, *color*, *neighbor*,
*carburetor*, *recognize*.

## Terminology

Fixed in [the glossary](src/content/reference/glossary.mdx) and used the same
way everywhere. Sawyer. Swamper. Depth gauge (or raker — both, consistently,
and the glossary says which is used where). Conductor, not "wire". Never
"operator/assistant" or "cutter/helper".

## Module template

Every module carries all five parts. The content schema refuses to build one
that does not, and `npm run lint:rules` checks the rest.

```mdx
---
num: "07"                    # two digits, authoritative, drives the URL
title: Changing a chain and field repair
objective: One sentence. What you can do after reading this.
summary: A line for the index. Field voice, no hype.
phase: 2                     # 1 = life safety, ships first
lifeSafety: false            # true = no commercial links, ever (A-3)
reviewed: false              # true only when a working sawyer who is not the
                             # author has read it and pushed back
updated: 2026-09-12
fieldCard:                   # goes on the printed card, verbatim
  - "Carry 2–4 sharp spare chains per saw."
stopWork:                    # any one of these ends the work (S-3)
  - "The chain came off and you cannot find why."
---
```

Then, in this order:

1. **A paragraph that earns the module.** Why this matters, in the specific.
2. **`<Block kicker="…">`** sections for procedure. Numbered steps, or a
   `<Checklist>` when it is a ritual the reader runs every time.
3. **`<FailureModes>`** with `<Fail tell="…">` children. **The `tell` is
   required** — it is what the failure looks like on the way to happening. A
   failure mode without a tell is not a failure mode, it is a warning.
4. **`<StopWork>`** wherever a refusal belongs in the flow. The frontmatter
   list renders at the end of the module automatically.
5. **`<FieldLine>`** — the one sentence that ends up on the card.

## Components available in any MDX file

No import lines needed; the layout supplies them.

`Hazard` · `StopWork` · `Note` · `Block` · `FailureModes` · `Fail` · `Spec` ·
`Checklist` · `Check` · `FieldLine` · `Contacts` · `Species` · `Disclaimer` ·
`SawAnatomy` · `StihlDecoder` · `ChainFinder` · `RotationTimer` ·
`KickbackZones` · `BindOrder` · `HingeFace` · `SpringPole` · `ThirtyFeet` ·
`ChainNumbers` · `ToothProfile`

## Numbers

Any figure that can be measured — a torque, a gap, an angle, a distance, a file
size — goes through `<Spec>`:

```mdx
<Spec src="Oregon filing chart">7/32 in</Spec>     <!-- sourced -->
<Spec unverified>.025 in</Spec>                    <!-- honest about it -->
```

`unverified` renders as *[unverified — check your manual]* and links to
`/about/verify/`. Add the item to `src/data/verify.ts` at the same time.

**Do not publish a number you have not checked without the flag.** A safety
site that publishes an unchecked torque figure is worse than one that says
"check your manual", because the first one gets believed.

## Hazard, Note, StopWork — which one

- **`Hazard`** — this thing can hurt you, and here is the mechanism. Breaks the
  left rail, bleeds into the margin, orange.
- **`StopWork`** — put the saw down. Not a caution: a refusal. The heaviest
  treatment on the site and the thesis of the whole thing.
- **`Note`** — useful, not dangerous. Green, quiet, inside the column. Verify
  notes, buying context, "check before you sign up".

Using `Hazard` for something that is merely important devalues every real one.
The orange is a signal, and signals only work if they are rare.
