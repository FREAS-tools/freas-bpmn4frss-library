import {
  constructElementCreateFunction,
  constructPaletteEntry,
  CustomPaletteEntry,
  ELEMENT_FALLBACK_SIZE,
} from '../../common';
import potentialEvidenceSourceIcon
  from './assets/potential-evidence-source.png';
import properties from './properties';

const { elementSize, nameLowercase } = properties;

/**
 * Construct a palette element inside the editor (modeler)
 *
 * @param {*} bpmnFactory factory that can create bpmn objects
 *                        (according to the custom moddle definition)
 * @param {*} create create function which is called when the element is
 *                   being created from the palette
 * @param {*} elementFactory function that can create (custom) elements
 *                           in the diagram
 * @returns a custom function which is able to create a new element
 */
const constructPotentialEvidenceSourceCreateFunction = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
) => (
  constructElementCreateFunction(
    bpmnFactory,
    create,
    elementFactory,
    properties.identifier,
    elementSize?.x ?? ELEMENT_FALLBACK_SIZE,
    elementSize?.y ?? ELEMENT_FALLBACK_SIZE,
  )
);

/**
 * Construct a potential evidence source palette entry
 *
 * @param {Function} translate function which can translate text
 * @param {Function} action action which happens after pressing
 *                          / dragging the element from the palette
 * @returns potential evidence source palette entry
 */
const constructPotentialEvidenceSourcePaletteEntry = (
  action: Function,
  translate: Function,
): CustomPaletteEntry => (
  constructPaletteEntry(
    action,
    nameLowercase,
    'activity',
    potentialEvidenceSourceIcon,
    nameLowercase,
    'Create a Potential Evidence Source',
    translate,
  )
);

// Controls grouped together and exported
const PotentialEvidenceSourceControls = {
  createElementFunction: constructPotentialEvidenceSourceCreateFunction,
  createPaletteEntry: constructPotentialEvidenceSourcePaletteEntry,
};

export default PotentialEvidenceSourceControls;
