/** STIHL model-code reference. Nominative use only — no logos, no brand
 *  colors, no implication of endorsement (Rule L-4).
 *
 *  The letter system has never been perfectly consistent. STIHL has reused,
 *  retired and changed meanings across decades, so a code on a vintage saw may
 *  not mean today what it means on a current one. The decoder says so rather
 *  than pretending it is a clean system. */

export type Prefix = { code: string; label: string; note: string; saw: boolean };

export const prefixes: Prefix[] = [
  { code: 'MS', label: 'Gas chainsaw', note: 'From the German Motorsäge — “motor saw”. Two-stroke, mix fuel.', saw: true },
  { code: 'MSA', label: 'Battery chainsaw', note: 'Cordless. No mix, no clutch warm-up, and the chain still takes your hand off.', saw: true },
  { code: 'MSE', label: 'Corded electric chainsaw', note: 'Mains powered. Not a storm saw — you are dragging a cord through wet debris.', saw: true },
  { code: 'FS', label: 'Not a chainsaw — brushcutter / trimmer', note: 'String trimmer or brushcutter.', saw: false },
  { code: 'HT', label: 'Not a chainsaw — pole pruner', note: 'Telescoping pole saw. Overhead work near lines: see the power line module.', saw: false },
  { code: 'BR', label: 'Not a chainsaw — backpack blower', note: '', saw: false },
  { code: 'BG', label: 'Not a chainsaw — handheld blower', note: '', saw: false },
  { code: 'TS', label: 'Not a chainsaw — cut-off machine', note: 'Abrasive cut-off saw, sometimes called a Cutquik.', saw: false },
  { code: 'RE', label: 'Not a chainsaw — pressure washer', note: '', saw: false },
  { code: 'HS', label: 'Not a chainsaw — hedge trimmer', note: '', saw: false },
];

export type Band = { min: number; max: number; label: string; note: string };

/** Broad displacement/capability bands. Higher generally means more engine and
 *  more saw, but the bands blur at the edges and always have. */
export const bands: Band[] = [
  { min: 0, max: 260, label: 'Homeowner class', note: 'Firewood, yard cleanup, limbing. Light, cheap, safety chain, narrow oiler. Plenty of Kaua‘i cleanup gets done with these — inside their limits.' },
  { min: 261, max: 311, label: 'Farm and ranch class', note: 'The sweet spot for storm work. Enough saw for a big albizia limb, light enough to carry all day.' },
  { min: 312, max: 499, label: 'Professional class', note: 'Magnesium cases, better AV, rebuildable, designed for hours a day. A used one of these beats a new homeowner saw.' },
  { min: 500, max: 9999, label: 'Big timber and milling', note: 'More saw than any volunteer cleanup needs, and more saw than most people can control when it kicks.' },
];

export type Suffix = { code: string; label: string; note: string };

export const suffixes: Suffix[] = [
  { code: 'B', label: 'Quick chain adjuster', note: 'Tool-free chain tensioning. Convenient; still check tension by hand.' },
  { code: 'C', label: 'Comfort package', note: 'A bundle, not one feature — usually combined with another letter, as in C-M or C-B.' },
  { code: 'D', label: 'Catalytic converter', note: 'Emissions-controlled muffler on some markets and models.' },
  { code: 'E', label: 'Easy2Start', note: 'Softer recoil pull. Nothing to do with how the saw cuts.' },
  { code: 'i', label: 'Fuel injection', note: 'Electronically injected (the 500i and friends). No carburetor to tune.' },
  { code: 'M', label: 'M-Tronic', note: 'Electronic engine management: no carb screws to fiddle with, self-adjusting for altitude and fuel.' },
  { code: 'Q', label: 'Quickstop chain brake', note: 'Historically called out as a suffix. Modern saws all have a chain brake — test it daily regardless.' },
  { code: 'R', label: 'Wrap handle', note: 'Handlebar wrapping the side of the saw, for cutting in more positions. Common on felling saws.' },
  { code: 'T', label: 'Top handle — climbing saw', note: 'Built for a roped arborist in a tree, one-handed by design. In untrained hands it is the most dangerous saw sold.' },
  { code: 'V', label: 'Heated carburetor / winter option', note: 'Irrelevant in Hawai‘i.' },
  { code: 'W', label: 'Heated handles', note: 'Also irrelevant here.' },
  { code: 'Z', label: 'Spark-arresting muffler', note: 'A screen in the exhaust. Required on public land, and a real fire issue on the dry west side.' },
];

export type Decoded = {
  input: string;
  ok: boolean;
  prefix?: Prefix;
  number?: number;
  band?: Band;
  letters: Suffix[];
  unknownLetters: string[];
  messages: string[];
};

const norm = (s: string) => s.toUpperCase().replace(/[\s_.]+/g, '');

export function decodeStihl(raw: string): Decoded {
  const input = raw.trim();
  const out: Decoded = { input, ok: false, letters: [], unknownLetters: [], messages: [] };
  if (!input) return out;

  const s = norm(input).replace(/^STIHL/, '');
  const m = s.match(/^([A-Z]+)?(\d{2,4})(.*)$/);
  if (!m) {
    out.messages.push('That does not look like a STIHL model code. Try something like MS 261 C-M.');
    return out;
  }

  const [, rawPrefix, digits, rest] = m;
  const code = rawPrefix || 'MS';
  if (!rawPrefix) out.messages.push('No prefix given, so this reads it as a gas saw (MS).');

  out.prefix = prefixes.find((p) => p.code === code);
  if (!out.prefix) {
    out.messages.push(`“${code}” is not a prefix this decoder knows. It may be an older or a non-US code.`);
  }

  out.number = Number.parseInt(digits, 10);
  out.band = bands.find((b) => out.number! >= b.min && out.number! <= b.max);

  const tail = rest.replace(/-/g, '');
  for (const ch of tail) {
    const hit = suffixes.find((x) => x.code.toUpperCase() === ch);
    if (hit && !out.letters.some((l) => l.code === hit.code)) out.letters.push(hit);
    else if (!hit) out.unknownLetters.push(ch);
  }

  if (digits.length >= 3) {
    out.messages.push(
      `The last digit is usually a generational revision, not a bigger engine — the ${code} ${digits} sits where the ${code} ${digits.slice(0, -1)}0 range sat.`,
    );
  }
  if (out.letters.some((l) => l.code === 'T')) {
    out.messages.push('Top-handle saws are for roped, trained arborists. If that is not you, this is the wrong saw.');
  }
  out.ok = Boolean(out.prefix || out.number);
  return out;
}
