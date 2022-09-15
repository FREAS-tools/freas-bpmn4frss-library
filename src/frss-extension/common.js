/**
 * This module contains common constants, shared between files
 */

export const bpmn4frss = 'bpmn4frss';

export const bpmn4frssPrefix = `${bpmn4frss}:`;

/**
 * Set custom priority for FRSS extension.
 * This priority is by default set to 1400 to not interfere
 * with other custom priorities. In case you want to use other extensions,
 * set your PRIORITY value to a different value.
 */
export const FRSS_PRIORITY = 1400;

// /**
//  * Meta function for creating element functions for the palette
//  *
//  * @param {*} event received from the event bus
//  * @param {Object} createShapeArgument the argument for the `createShape`
//  *                                     function
//  * @param {Function} create function that creates the element
//  * @param {*} elementFactory creates the shape
//  */
// export const createElementForPalette = (
//   event,
//   createShapeArgument,
//   create,
//   elementFactory,
// ) => {
//   const shape = elementFactory.createShape(createShapeArgument);
//   create.start(event, shape);
// };

// /**
//  * Meta function for creating the palette entries
//  *
//  * @param {string} entry name of the entry for the event bus
//  * @param {string} group where on the palette to group this element
//  * @param {string} css name of the class for the element (useful when we want
//  *                     to style the element in a certain manner)
//  * @param {string} title what is displayed when the mouse hovers
//  *                       over the palette
//  * @param {Function} translate function for translation
//  * @param {Function} action what action is triggered (create function)
//  * @returns palette entry object
//  */
// export const createPaletteEntry = (
//   entry,
//   group,
//   css,
//   title,
//   translate,
//   action,
// ) => ({
//   [entry]: {
//     group,
//     className: css,
//     title: translate(title),
//     action: {
//       dragstart: action,
//       click: action,
//     },
//   },
// });
