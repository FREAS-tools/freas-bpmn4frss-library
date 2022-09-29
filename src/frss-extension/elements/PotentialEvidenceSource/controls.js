import potentialEvidenceSourceIcon
  from './assets/potential-evidence-source.png';
import { createNewElementFunction, createNewPaletteEntry } from '../../common';
import { potentialEvidenceSourceIdentifier } from './rendererEntry';

// Create a palette element inside the editor (modeler)
const createElementFunction = (
  bpmnFactory,
  create,
  elementFactory,
) => (
  createNewElementFunction(
    bpmnFactory,
    create,
    elementFactory,
    potentialEvidenceSourceIdentifier,
    28,
    28,
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
const createPaletteEntry = (translate, action) => (
  createNewPaletteEntry(
    'potential-evidence-source',
    'activity',
    potentialEvidenceSourceIcon,
    'Create a Potential Evidence Source',
    translate,
    action,
    'potential-evidence-source',
  )
);

// Controls grouped together and exported
const PotentialEvidenceSourceControls = {
  createElementFunction,
  createPaletteEntry,
};

export default PotentialEvidenceSourceControls;
