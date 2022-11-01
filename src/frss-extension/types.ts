/**
 * The properties of a custom element
 */
export interface FrssElementProperties {
  elementOffset?: {
    x: number,
    y: number,
  }
  elementSize?: {
    x: number,
    y: number,
  },
  identifier: string,
  name: string,
  nameLowercase: string,
}

/**
 * The moddle definition of a custom element
 */
export interface FrssElementDefinition {
  extends?: string[],
  name: string,
  properties: any[],
  superClass?: string[],
}

/**
 * Controls entry of the FRSS Element, used by the pad and/or the palette
 */
export interface FrssElementControlsEntry {
  [x: string]: {
    action: {
      click: Function;
      dragstart: Function;
    };
    className: string;
    group: string;
    imageUrl?: any;
    title: any;
  }
}

/**
 * The function signature for "action function" which is
 * invoked whenever user clicks / drags the controls entry.
 */
export type ActionFunction = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  height: number,
  type: string,
  width: number,
) => ((...any: any[]) => void);

/**
 * Function which can be called by the `constructFrssElementControlEntry`
 * to create a new FRSS element
 *
 * @param {any} bpmnFactory factory that can create bpmn objects
 *                          (according to the custom moddle definition)
 * @param {any} create function that can create the element in the diagram
 * @param {any} elementFactory function that can create (custom) elements
 *                             in the diagram
 * @param {number} height height of the object
 * @param {string} type what kind of object is needed
 * @param {number} width height of the object
 *
 * @returns create function for the new Element
 */
export const constructElementConstructor: ActionFunction = (
  bpmnFactory,
  create,
  elementFactory,
  height,
  type,
  width,
) => {
  // the function is then called whenever the element is created
  const createFunction = (event: any) => {
    // create a business object (according to the custom moddle definition)
    const businessObject = bpmnFactory.create(type);
    const shape = elementFactory.createShape({
      businessObject,
      height,
      type,
      width,
    });

    // create the event with that created shape
    create.start(event, shape);
  };

  return createFunction;
};

/**
 * Function to create a new controls entry, the element then invokes
 * the `actionFunction`
 *
 * @param {ActionFunction} actionFunction function that is executed when
 *                                        the element is clicked or dragged.
 * @param {any} bpmnFactory factory that can create bpmn objects
 *                        (according to the custom moddle definition)
 * @param {string} className name of the css class to assign to
 * @param {Function} create function that can create the element in the diagram
 * @param {any} elementFactory function that can create (custom) elements
 *                           in the diagram
 * @param {string} elementTitle title which is shown on hover
 * @param {string} entryTitle title of the action for the pad/palette provider
 * @param {string} group where is the entry grouped at
 * @param {number} height height of the object
 * @param {any} imageUrl the image which is displayed
 * @param {string} type object identifier
 * @param {Function} translate translate function which takes the title and translates is
 * @param {number} width height of the object
 *
 * @returns palette entry
 */
export const constructFrssElementControlEntry = (
  actionFunction: ActionFunction,
  bpmnFactory: any,
  className: string,
  create: any,
  elementFactory: any,
  elementTitle: string,
  entryTitle: string,
  group: string,
  height: number,
  imageUrl: any | undefined,
  type: string,
  translate: Function,
  width: number,
): FrssElementControlsEntry => {
  // an element constructor function, called
  // each time the element should be created in the Modeler
  const createElement = actionFunction(
    bpmnFactory,
    create,
    elementFactory,
    height,
    type,
    width,
  );

  return {
    [entryTitle]: {
      group,
      imageUrl,
      className,
      title: translate(elementTitle),
      action: {
        dragstart: createElement,
        click: createElement,
      },
    },
  };
};

/**
 * Create the palette entry object from a list of entries
 *
 * @param {FrssElementControlsEntry[]} controlEntries entries for the palette
 * @returns single palette entry object
 */
export const joinAllControlsEntries = (
  controlEntries: FrssElementControlsEntry[],
): FrssElementControlsEntry => {
  // empty object
  let result = {};

  // copy the key-value pairs into the object
  controlEntries.forEach((entry) => {
    result = {
      ...result,
      ...entry,
    };
  });

  // return finished object
  return result;
};

export type ConstructFrssElementControlsEntry = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  translate: Function,
) => FrssElementControlsEntry;

/**
 * Pad Entry is an object that has the array of element identifiers,
 * which should have the pad entry that is defined in `constructPadEntry`
 */
export interface PadEntry {
  /** Pad entry constructor */
  constructPadEntry: ConstructFrssElementControlsEntry,
  elementIdentifiers: string[]
}

/**
 * The controls attributes of a custom elements
 */
export interface FrssElementControls {
  createPaletteEntry: ConstructFrssElementControlsEntry,
  padEntries: PadEntry[],
}

/**
 * The structure of a custom element
 */
export interface FrssElement {
  controls?: FrssElementControls
  definition: FrssElementDefinition,
  icon?: any,
  properties: FrssElementProperties,
  render?: (parentNode: any, element: any) => Element | null,
}
