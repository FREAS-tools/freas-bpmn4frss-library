import {
  createFrssElementControlEntry,
  FrssElementControls,
  FrssElementControlEntry,
  createElementConstructor,
  CreateFrssElementControlEntry,
} from '../../types';
import evidenceSourceIcon
  from './assets/evidence-source.png';
import properties from './properties';

/**
 * Construct a potential evidence source entry
 *
 * @param {*} bpmnFactory factory that can create bpmn definitions for moddle
 * @param {*} create create function that adds the element to the diagram
 * @param {*} elementFactory factory that can create diagram element objects
 * @param {Function} translate function which can translate text
 * @returns potential evidence source palette entry
 */
const createEvidenceSource: CreateFrssElementControlEntry = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  translate: Function,
  optionalArgs: {
    modeling: any
  },
): FrssElementControlEntry => createFrssElementControlEntry(
  createElementConstructor,
  // the factory that creates moddle objects (bpmn)
  bpmnFactory,
  // classname is the name lowercase
  properties.nameLowercase,
  // create function (creates the diagram element)
  create,
  // the factory that creates diagram elements
  elementFactory,
  // the title that is displayed on hover above
  'Add Evidence Source',
  // entry title - key for the pad/palette provider object
  `create-${properties.nameLowercase}`,
  // group the element belongs in
  'activity',
  // element identifier
  properties.identifier,
  // translate fn
  translate,
  {
    ...optionalArgs,
    height: properties.elementSize?.y,
    imageUrl: evidenceSourceIcon,
    width: properties.elementSize?.x,
  },
);

// Controls grouped together and exported
const EvidenceSourceControls: FrssElementControls = {
  padEntries: [],
  createPaletteEntry: createEvidenceSource,
};

export default EvidenceSourceControls;
