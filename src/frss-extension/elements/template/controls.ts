import {
  createNewElementFunction,
  createNewPaletteEntry,
  PaletteEntry,
} from '../../common';
// DELETE this if the element does not have an icon
import xIcon
  from './assets/x.png';
import { xIdentifier } from './rendererEntry';

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
    xIdentifier,
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
    'x',
    'activity',
    xIcon,
    'x',
    'Create a x',
    translate,
  )
);

// DELETE this if the element you intend to create is not shown
// in the Viewer and you only need it for the moddle
const xControls = {
  createElementFunction,
  createPaletteEntry,
};

export default xControls;
