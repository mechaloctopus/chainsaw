/** Every part gets a job and a failure mode. Rule S-4 applies to hardware too:
 *  knowing a part's name is useless unless you know how it kills the saw or
 *  you. Numbers match the callouts on the diagram. */
export type Part = {
  id: string;
  n: number;
  name: string;
  job: string;
  fail: string;
};

export const parts: Part[] = [
  {
    id: 'bar',
    n: 1,
    name: 'Guide bar',
    job: 'Carries the chain around a steel track and holds the cut open. Its stamp tells you the pitch, gauge and drive link count.',
    fail: 'Rails spread or blued from heat, groove packed with sawdust, oil hole blocked. A worn bar throws chains and cuts in a curve no amount of filing will fix.',
  },
  {
    id: 'chain',
    n: 2,
    name: 'Chain',
    job: 'Cutters, drive links and tie straps riveted into a loop. The drive links ride in the bar groove and are what the sprocket actually pulls.',
    fail: 'Dull, wrong tension, or a damaged drive link. Loose chain derails; tight chain burns the bar and eats the sprocket; dull chain makes dust, heat and pushed cuts.',
  },
  {
    id: 'handguard',
    n: 3,
    name: 'Chain brake handguard',
    job: 'Push it forward and a steel band clamps the clutch drum, stopping the chain. It also fires on inertia in a hard kickback.',
    fail: 'A brake band soaked in oil and packed with sawdust can fail silently. It is the last line, not the first — and it is the one part you test every single day.',
  },
  {
    id: 'tophandle',
    n: 4,
    name: 'Front handle',
    job: 'Your left hand lives here, thumb wrapped underneath, elbow straight. It is the lever you use to hold the saw down when it wants to come up.',
    fail: 'Thumb laid on top instead of wrapped. In a kickback the bar rotates straight out of an open grip and into your face.',
  },
  {
    id: 'rearhandle',
    n: 5,
    name: 'Rear handle',
    job: 'Right hand, throttle hand. Takes the push of the cut.',
    fail: 'Cracked handle or perished anti-vibration mounts let the saw twist in your hands and transmit vibration straight into your wrists.',
  },
  {
    id: 'throttle',
    n: 6,
    name: 'Throttle trigger',
    job: 'Chain speed. Full throttle in the cut — a chain loafing at part throttle grabs.',
    fail: 'Sticky return from dirt or a kinked cable means the chain keeps turning when you let go. That is a stop-work fault, not a quirk.',
  },
  {
    id: 'interlock',
    n: 7,
    name: 'Throttle interlock',
    job: 'The lockout you press with your palm before the trigger will move. Stops the saw revving if it lands on something.',
    fail: 'Taped, wedged, or worn out. People do this. It is how a dropped saw revs itself into a leg.',
  },
  {
    id: 'switch',
    n: 8,
    name: 'Master control / stop switch',
    job: 'Choke, run and stop in one lever on most saws. Stop is the one you want to find without looking.',
    fail: 'Worn detents that slip out of stop. Know where it is by feel before you need it in a hurry.',
  },
  {
    id: 'filter',
    n: 9,
    name: 'Air filter and cover',
    job: 'Keeps grit out of the carburettor and cylinder.',
    fail: 'On Kaua‘i this is the part that kills saws. Red dirt is abrasive; a gap at the cover edge or a filter refitted while damp puts dust straight into the engine. It leans out, overheats and scores the piston.',
  },
  {
    id: 'clutchcover',
    n: 10,
    name: 'Clutch cover',
    job: 'Covers the clutch drum, sprocket and brake band, and clamps the bar when the nuts are tight.',
    fail: 'Packed with oily sawdust — the single most common reason a chain brake stops working. And behind it: the E-clip and washer on the drum. Lose those and you lose the sprocket in the field.',
  },
  {
    id: 'sprocket',
    n: 11,
    name: 'Sprocket (behind the cover)',
    job: 'Drives the chain. Rim type on most pro saws, spur on smaller ones.',
    fail: 'Worn wear-marks deeper than the drive link tangs. A worn sprocket throws a new chain, then eats it.',
  },
  {
    id: 'dogs',
    n: 12,
    name: 'Bumper spikes (dogs)',
    job: 'Bite into the wood so you pivot the saw through the cut instead of pushing it. They are a control feature.',
    fail: 'Never set. Cutting with the dogs off the wood means you are holding the whole weight and the whole reaction with your arms.',
  },
  {
    id: 'catcher',
    n: 13,
    name: 'Chain catcher',
    job: 'A small plastic or metal finger that catches a thrown chain before it reaches your right hand.',
    fail: 'Snapped off and never replaced — a two-dollar part that is the only thing between a derailed chain and your wrist. Look for it every time.',
  },
  {
    id: 'muffler',
    n: 14,
    name: 'Muffler and spark arrestor screen',
    job: 'Exhaust, and a screen that stops burning carbon leaving the saw.',
    fail: 'Clogged screen chokes the saw and makes it feel gutless. A missing one starts fires — a real risk on the dry west side.',
  },
  {
    id: 'caps',
    n: 15,
    name: 'Fuel and bar oil caps',
    job: 'Two tanks, two caps, two vents. Bar oil should empty at roughly the same rate as fuel.',
    fail: 'Swapped caps, blocked vents, or a tank of oil still full after a tank of gas — that last one means the oiler is not feeding and the bar is cooking.',
  },
];
