import {
  ELEMENT_FALLBACK_SIZE,
} from '../../common';

import {
  constructFrssElementControlEntry,
  FrssElementControls,
  FrssElementControlsEntry,
  constructElementConstructor,
} from '../../types';
import potentialEvidenceSourceIcon
  from './assets/potential-evidence-source.png';
import properties from './properties';

const {
  elementSize,
  identifier,
  nameLowercase,
} = properties;

/**
 * Construct a potential evidence source entry
 *
 * @param {*} bpmnFactory factory that can create bpmn definitions for moddle
 * @param {*} create create function that adds the element to the diagram
 * @param {*} elementFactory factory that can create diagram element objects
 * @param {Function} translate function which can translate text
 * @returns potential evidence source palette entry
 */
const createPotentialEvidenceSource = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  translate: Function,
): FrssElementControlsEntry => constructFrssElementControlEntry(
  constructElementConstructor,
  // the factory that creates moddle objects (bpmn)
  bpmnFactory,
  // classname is the name lowercase
  nameLowercase,
  // create function (creates the diagram element)
  create,
  // the factory that creates diagram elements
  elementFactory,
  // the title that is displayed on hover above
  'Add Potential Evidence Source',
  // entry title - key for the pad/palette provider object
  `create-${nameLowercase}`,
  // group the element belongs in
  'activity',
  // element height
  elementSize?.y ?? ELEMENT_FALLBACK_SIZE,
  potentialEvidenceSourceIcon,
  // element identifier
  identifier,
  // translate fn
  translate,
  // width
  elementSize?.x ?? ELEMENT_FALLBACK_SIZE,
);

// Controls grouped together and exported
const PotentialEvidenceSourceControls: FrssElementControls = {
  padEntries: [],
  createPaletteEntry: createPotentialEvidenceSource,
};

export default PotentialEvidenceSourceControls;
