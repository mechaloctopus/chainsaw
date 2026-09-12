/** The S-7 backlog: every figure or claim on this site that has not yet been
 *  checked against a primary source, and what the primary source is.
 *
 *  This file is the canonical list. VERIFY.md in the repo root points here so
 *  the two cannot disagree. Anything on this list renders on the site as
 *  "unverified — check your manual", never as an authority. */
export type VerifyItem = {
  what: string;
  where: string;
  source: string;
  status: 'open' | 'verified';
};

export const verifyItems: VerifyItem[] = [
  { what: 'Fuel mix ratio (50:1) per specific STIHL and ECHO model', where: 'Module 04', source: "The model's own owner manual", status: 'open' },
  { what: 'Spark plug type and gap per model', where: 'Module 03', source: 'Manufacturer manual', status: 'open' },
  { what: 'Round file size per chain pitch', where: 'Modules 05, 06', source: 'Oregon, STIHL and Carlton filing charts — they differ', status: 'open' },
  { what: 'Top-plate filing angle range (25°–35°)', where: 'Module 06', source: 'Chain manufacturer filing specification for the specific chain', status: 'open' },
  { what: 'Depth gauge setting (.025 in general use)', where: 'Modules 05, 06', source: 'Chain manufacturer spec per chain type and application', status: 'open' },
  { what: 'Bar nut torque figures', where: 'Module 03', source: 'Manufacturer service data', status: 'open' },
  { what: 'Open face (~70°) and conventional (~45°) face cut angles', where: 'Module 14', source: 'NWCG S-212 / Game of Logging course material', status: 'open' },
  { what: 'Hinge thickness as a percentage of DBH (~10%)', where: 'Module 14', source: 'NWCG S-212', status: 'open' },
  { what: 'Chaps standard reference — ASTM F1897 current revision, and UL certification language', where: 'Modules 01, gear', source: 'ASTM and UL, current published revision', status: 'open' },
  { what: 'ANSI Z133 clauses relevant to volunteer ground work', where: 'Site-wide', source: 'ANSI Z133, current edition', status: 'open' },
  { what: 'OSHA 1910.266 (logging) and 1910.269 approach distances, and which apply to unpaid volunteers', where: 'Modules 12, 14', source: 'OSHA, and a Hawai‘i attorney on the volunteer question', status: 'open' },
  { what: 'KIUC outage reporting number and current public guidance', where: 'Module 12, footer, field card', source: 'KIUC directly — confirm by phone, not from a web page', status: 'open' },
  { what: '30-foot clearance figure for downed conductors', where: 'Module 12', source: 'Utility and emergency management guidance; confirm with KIUC', status: 'open' },
  { what: 'County of Kaua‘i green waste and storm debris disposal rules', where: 'Module 10 (swamper piles)', source: 'County of Kaua‘i, current post-storm rules', status: 'open' },
  { what: 'Current STIHL and ECHO model lineups and displacements', where: 'Reference: STIHL, ECHO', source: "The manufacturers' own current catalogues", status: 'open' },
  { what: 'ECHO warranty periods for consumer versus commercial use', where: 'Reference: ECHO', source: 'ECHO warranty terms for the specific model and year', status: 'open' },
  { what: 'NWCG S-212 availability in Hawai‘i', where: 'Module 00', source: 'Hawai‘i agencies running the course', status: 'open' },
  { what: 'Species-specific wood behavior claims (albizia brittleness, ironwood rooting)', where: 'Module 11', source: 'A working Kaua‘i arborist, and DLNR / Albizia Task Force material', status: 'open' },
];
