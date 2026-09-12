/** Single source of truth for anything that appears in more than one place.
 *  A phone number that is wrong on one page is worse than no phone number. */
export const site = {
  name: "Kaua'i Saw School",
  short: 'Saw School',
  tagline: 'Chainsaw safety for Kaua‘i storm cleanup.',
  description:
    "Free, offline-capable chainsaw safety training for volunteers clearing storm debris on Kaua‘i. Power lines, kickback, storm-loaded wood, crew procedure. Works with no signal.",
  repo: 'https://github.com/mechaloctopus/chainsaw',
} as const;

/** Emergency contacts. Verified status tracked in VERIFY.md (Rule S-7). */
export const contacts = {
  emergency: { label: '911', tel: '911' },
  kiuc: { label: 'KIUC 808-246-4300', tel: '8082464300', name: 'Kaua‘i Island Utility Cooperative' },
  oneCall: { label: 'Hawai‘i One Call 811', tel: '811', alt: '866-423-7287' },
  poison: { label: 'Poison Control 800-222-1222', tel: '8002221222' },
} as const;

/** Fixed, non-negotiable clearance. Rule S-5. */
export const LINE_CLEARANCE_FT = 30;

export const nav = [
  { href: '/modules/', label: 'Modules' },
  { href: '/modules/12-downed-power-lines/', label: 'Power lines' },
  { href: '/field-card/', label: 'Field card' },
  { href: '/tools/', label: 'Tools' },
  { href: '/reference/glossary/', label: 'Glossary' },
  { href: '/about/', label: 'About' },
] as const;
