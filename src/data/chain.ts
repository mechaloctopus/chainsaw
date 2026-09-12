/** Chain and bar numbers. Every figure here is flagged with its status:
 *  'verified' means it was checked against the named primary source;
 *  'unverified' means it is working knowledge and ships as a prompt to check
 *  your own manual, never as an authority (Rule S-7). See VERIFY.md. */

export type Status = 'verified' | 'unverified';

export type Pitch = {
  code: string;
  label: string;
  /** Round file diameter for hand filing this pitch. */
  file: string;
  fileStatus: Status;
  fileSource?: string;
  note: string;
  common: string;
};

export const pitches: Pitch[] = [
  {
    code: '1/4',
    label: '1/4 inch',
    file: '5/32 in',
    fileStatus: 'unverified',
    note: 'Small-bar carving and top-handle saws. You will not see much of it on a cleanup crew.',
    common: 'Carving bars, some MSA battery saws',
  },
  {
    code: '.325',
    label: '.325 inch',
    file: '3/16 in',
    fileStatus: 'unverified',
    note: 'Mid-size saws. Cuts fast for its size, and the narrower kerf is easier on a smaller powerhead.',
    common: 'MS 261, CS-490, many 50cc saws',
  },
  {
    code: '3/8LP',
    label: '3/8 inch low profile (also sold as 0.375 LP or “Picco”)',
    file: '5/32 in',
    fileStatus: 'unverified',
    note: 'The homeowner-saw standard. Usually a low-kickback safety chain with a ramped depth gauge.',
    common: 'MS 170–250, CS-310, CS-352',
  },
  {
    code: '3/8',
    label: '3/8 inch (full size)',
    file: '7/32 in',
    fileStatus: 'unverified',
    note: 'The professional default and the easiest chain to find on this island in a hurry.',
    common: 'MS 362–500i, CS-590, CS-620P',
  },
  {
    code: '.404',
    label: '.404 inch',
    file: '7/32 in',
    fileStatus: 'unverified',
    note: 'Big timber and harvester work. More saw than any volunteer job needs.',
    common: 'MS 881 and up',
  },
];

export type Gauge = { code: string; label: string; note: string };

export const gauges: Gauge[] = [
  { code: '.043', label: '.043 in / 1.1 mm', note: 'Thinnest. Battery and small saws. Bends if you lever it.' },
  { code: '.050', label: '.050 in / 1.3 mm', note: 'The most common gauge you will meet on Kaua‘i.' },
  { code: '.058', label: '.058 in / 1.5 mm', note: 'Common on farm and pro saws.' },
  { code: '.063', label: '.063 in / 1.6 mm', note: 'Heavy. Big pro saws.' },
];

export type ChainType = {
  code: string;
  label: string;
  stormRating: 'best' | 'ok' | 'poor';
  note: string;
};

export const chainTypes: ChainType[] = [
  {
    code: 'semi-chisel',
    label: 'Semi-chisel (rounded corner)',
    stormRating: 'best',
    note: 'Holds an edge in dirty wood. Storm debris is dirt, sand, salt and grit in every root ball — this is the cleanup chain.',
  },
  {
    code: 'full-chisel',
    label: 'Full chisel (square corner)',
    stormRating: 'poor',
    note: 'Cuts faster in clean wood and goes dull in one cut through a muddy butt. Save it for milling and clean logs.',
  },
  {
    code: 'low-profile',
    label: 'Low-profile / low-kickback safety chain',
    stormRating: 'ok',
    note: 'Ramped depth gauges resist kickback. Slower, and the ramp makes hand filing fussier. Fine for a new volunteer.',
  },
  {
    code: 'skip',
    label: 'Skip tooth',
    stormRating: 'poor',
    note: 'Fewer cutters for long bars in big wood. Not a cleanup chain.',
  },
];

/** Depth gauge (raker) settings. General-use figure only — set with a gauge
 *  tool made for your chain, and never guess it. */
export const rakerGeneral = { value: '.025 in', status: 'unverified' as Status };
