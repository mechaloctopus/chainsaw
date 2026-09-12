/** Components available to every MDX file with no import line, so content
 *  authors edit prose and never plumbing (Rule T-6). Passed to <Content /> by
 *  the layouts. */
import Hazard from './Hazard.astro';
import StopWork from './StopWork.astro';
import Note from './Note.astro';
import Block from './Block.astro';
import FailureModes from './FailureModes.astro';
import Fail from './Fail.astro';
import Spec from './Spec.astro';
import Checklist from './Checklist.astro';
import Check from './Check.astro';
import FieldLine from './FieldLine.astro';
import Contacts from './Contacts.astro';
import Species from './Species.astro';
import Disclaimer from './Disclaimer.astro';
import SawAnatomy from '../islands/SawAnatomy.astro';
import StihlDecoder from '../islands/StihlDecoder.astro';
import ChainFinder from '../islands/ChainFinder.astro';
import RotationTimer from '../islands/RotationTimer.astro';
// Static diagrams: original SVG, CSS-variable themed, no JS (Rule D-8).
import KickbackZones from '../diagrams/KickbackZones.astro';
import BindOrder from '../diagrams/BindOrder.astro';
import HingeFace from '../diagrams/HingeFace.astro';
import SpringPole from '../diagrams/SpringPole.astro';
import ThirtyFeet from '../diagrams/ThirtyFeet.astro';
import ChainNumbers from '../diagrams/ChainNumbers.astro';
import ToothProfile from '../diagrams/ToothProfile.astro';

export const mdxComponents = {
  Hazard,
  StopWork,
  Note,
  Block,
  FailureModes,
  Fail,
  Spec,
  Checklist,
  Check,
  FieldLine,
  Contacts,
  Species,
  Disclaimer,
  SawAnatomy,
  StihlDecoder,
  ChainFinder,
  RotationTimer,
  KickbackZones,
  BindOrder,
  HingeFace,
  SpringPole,
  ThirtyFeet,
  ChainNumbers,
  ToothProfile,
};
