import {
  createNewElementFunction,
  createNewPaletteEntry,
  PaletteEntry,
} from '../../common';
import potentialEvidenceSourceIcon
  from './assets/potential-evidence-source.png';
import { potentialEvidenceSourceIdentifier } from './rendererEntry';

const ELEMENT_SIZE = {
  x: 28,
  y: 28,
};

// Create a palette element inside the editor (modeler)
const createElementFunction = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
) => (
  createNewElementFunction(
    bpmnFactory,
    create,
    elementFactory,
    potentialEvidenceSourceIdentifier,
    ELEMENT_SIZE.x,
    ELEMENT_SIZE.y,
  )
);

/**
 * Create a potential evidence source palette entry
 *
 * @param {Function} translate function which can translate text
 * @param {Function} action action which happens after pressing
 *                          / dragging the element from the palette
 * @returns potential evidence source palette entry
 */
const createPaletteEntry = (
  action: Function,
  translate: Function,
): PaletteEntry => (
  createNewPaletteEntry(
    action,
    'potential-evidence-source',
    'activity',
    potentialEvidenceSourceIcon,
    'potential-evidence-source',
    'Create a Potential Evidence Source',
    translate,
  )
);

// Controls grouped together and exported
const PotentialEvidenceSourceControls = {
  createElementFunction,
  createPaletteEntry,
};

export default PotentialEvidenceSourceControls;
