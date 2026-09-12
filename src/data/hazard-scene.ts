/** The five things in the hero scene. Hotspot radii are in SVG user units;
 *  the plate is 800 wide, so at a 360px phone every target renders at least
 *  56px across (Rule D-3). */
export type SceneHazard = {
  id: string;
  label: string;
  /** Where the marker sits and how big the target is. */
  cx: number;
  cy: number;
  r: number;
  /** Where the label chip goes once it is found. */
  lx: number;
  ly: number;
  anchor: 'start' | 'middle' | 'end';
  what: string;
  why: string;
  href: string;
};

export const sceneHazards: SceneHazard[] = [
  {
    id: 'conductor',
    label: 'Conductor in the crown',
    cx: 600, cy: 232, r: 66, lx: 600, ly: 150, anchor: 'middle',
    what: 'A service line pulled down with the tree, lying in the branches.',
    why: 'It is live until KIUC says it is dead, and a limb under tension will whip it when you cut. Nothing else on this page matters if you miss this one.',
    href: '/modules/12-downed-power-lines/',
  },
  {
    id: 'rootball',
    label: 'Root ball',
    cx: 272, cy: 318, r: 68, lx: 150, ly: 300, anchor: 'end',
    what: 'A partly uprooted base, still hinged and holding the trunk up.',
    why: 'Cut the trunk and the whole mass can slam back into the hole, taking you with it. Never work on the inside of it.',
    href: '/modules/11-storm-hazards/',
  },
  {
    id: 'springpole',
    label: 'Spring pole',
    cx: 432, cy: 330, r: 62, lx: 432, ly: 420, anchor: 'middle',
    what: 'A sapling bent double and pinned under the trunk.',
    why: 'It is a loaded spring at head height. One wrong cut and it releases through the arc you are standing in.',
    href: '/modules/11-storm-hazards/',
  },
  {
    id: 'widowmaker',
    label: 'Hung limb',
    cx: 152, cy: 152, r: 64, lx: 152, ly: 88, anchor: 'middle',
    what: 'A broken limb caught in the standing tree above the work area.',
    why: 'It comes down on its own schedule — vibration, wind, or the thump of the log you just bucked.',
    href: '/modules/11-storm-hazards/',
  },
  {
    id: 'bystander',
    label: 'Bystander',
    cx: 702, cy: 392, r: 62, lx: 660, ly: 444, anchor: 'middle',
    what: 'A neighbor who came to watch, well inside two tree lengths.',
    why: 'You cannot hear him over the saw and he does not know where the log is going. He is as much a hazard as the wood.',
    href: '/modules/10-two-person-saw-team/',
  },
];
