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

/**
 * Function which is called by the palette to create a new diagram element
 *
 * @param {*} bpmnFactory factory that can create bpmn objects
 *                        (according to the custom moddle definition)
 * @param {Function} create function that can create the element in the diagram
 * @param {*} elementFactory function that can create (custom) elements
 *                           in the diagram
 * @param {string} type what kind of object is needed
 * @param {number} width height of the object
 * @param {number} height height of the object
 *
 * @returns create function for the new Element
 */
export const createNewElementFunction = (
  bpmnFactory,
  create,
  elementFactory,
  type,
  width,
  height,
) => {
  // the function is then called whenever the element is created
  const createFunction = (event) => {
    // create a business object (according to the custom moddle definition)
    const businessObject = bpmnFactory.create(type);
    const shape = elementFactory.createShape({
      type,
      width,
      height,
      businessObject,
    });

    // create the event with that created shape
    create.start(event, shape);
  };

  return createFunction;
};

/**
 * Function to create a new palette entry
 *
 * @param {string} name name of the entry
 * @param {string} group where is the entry grouped at
 * @param {*} imageUrl the image which is displayed
 * @param {string} title title which is shown on hover
 * @param {Function} translate translate function which takes the title and translates is
 * @param {Function} action what is supposed to happen after the entry is pressed
 *
 * @returns palette entry
 */
export const createNewPaletteEntry = (
  name,
  group,
  imageUrl,
  title,
  translate,
  action,
  className,
) => (
  {
    [`create.${name}`]: {
      group,
      imageUrl,
      className,
      title: translate(title),
      action: {
        dragstart: action,
        click: action,
      },
    },
  }
);
