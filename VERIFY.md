# Verification backlog (S-7)

**The canonical list lives in [`src/data/verify.ts`](src/data/verify.ts) and is
published at `/about/verify/`.** It is data rather than a document so that the
site and this file cannot disagree, and so that a reader who hits an unverified
number can follow the link and see the whole list.

## The rule

This site publishes a number in one of two states:

1. **Sourced** — `<Spec src="…">` names where it came from, visibly, on the page.
2. **Openly unverified** — `<Spec unverified>` renders
   *[unverified — check your manual]* and links to the list.

There is no third state where a figure quietly hopes to be right.

## How to close an item

1. Get the figure from the primary source named in `src/data/verify.ts` — the
   manufacturer's manual, the current published standard, or the agency itself.
   Not a forum, not another website, not this one.
2. Change the item's `status` to `'verified'` and set `source` to the exact
   document and revision.
3. Change the `<Spec unverified>` in the content to
   `<Spec src="…">` with the same reference.
4. Say in the pull request what you checked it against.

## What is on the list right now

Eighteen open items, including: fuel mix ratios per model, spark plug gaps,
round file sizes per pitch per chain brand, depth gauge settings, bar nut
torques, face cut angles and hinge percentage, the ASTM F1897 / UL chaps
language, ANSI Z133 clauses, OSHA 1910.266 and 1910.269 and whether they reach
unpaid volunteers, KIUC's number and current guidance, County of Kaua‘i debris
rules, current STIHL and ECHO lineups, and NWCG S-212 availability in Hawai‘i.

The two that matter most, because they are the two people will act on fastest:

- **KIUC's number and guidance** — confirm by phone, with KIUC, not from a web
  page. This one appears on the field card, in the footer of every page, and in
  the offline fallback.
- **The 30-foot clearance figure** — confirm with KIUC and county emergency
  management.
