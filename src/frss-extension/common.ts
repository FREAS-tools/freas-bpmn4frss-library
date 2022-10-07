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
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  type: string,
  width: number,
  height: number,
): (event: any) => void => {
  // the function is then called whenever the element is created
  const createFunction = (event: any) => {
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

export interface PaletteEntry {
  [x: string]: {
    action: {
      click: Function;
      dragstart: Function;
    };
    className: string;
    group: string;
    imageUrl: URL;
    title: any;
  }
}

/**
 * Function to create a new palette entry
 *
 * @param {Function} action what is supposed to happen after the entry is pressed
 * @param {string} className name of the css class to assign to
 * @param {string} group where is the entry grouped at
 * @param {*} imageUrl the image which is displayed
 * @param {string} name name of the entry
 * @param {string} title title which is shown on hover
 * @param {Function} translate translate function which takes the title and translates is
 *
 * @returns palette entry
 */
export const createNewPaletteEntry = (
  action: Function,
  className: string,
  group: string,
  imageUrl: URL,
  name: string,
  title: string,
  translate: Function,
): PaletteEntry => (
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

/**
 * Create the palette entry object from a list of entries
 *
 * @param {PaletteEntry[]} paletteEntries entries for the palette
 * @returns single palette entry object
 */
export const createEntryObject = (
  paletteEntries: PaletteEntry[],
): PaletteEntry => {
  // empty object
  let result = {};

  // copy the key-value pairs into the object
  paletteEntries.forEach((entry) => {
    result = {
      ...result,
      ...entry,
    };
  });

  // return finished object
  return result;
};
