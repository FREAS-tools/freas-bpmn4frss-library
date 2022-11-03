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
export interface FrssElementControlEntry {
  [x: string]: Partial<{
    action: {
      click: Function;
      dragstart: Function;
    };
    className: string;
    group: string;
    imageUrl: any;
    title: any;
  }>
}

export type ActionFunction = (
  (element: any, event?: any, autoActivate?: any) => void
);

export type CreateActionFunctionOptionalArguments = Partial<{
  height: number,
  modeling: any,
  width: number,
}>;

/**
 * The function signature for "action function" which is
 * invoked whenever user clicks / drags the controls entry.
 */
export type CreateActionFunction = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  type: string,
  optionalArgs: CreateActionFunctionOptionalArguments
) => ActionFunction;

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
export const createElementConstructor: CreateActionFunction = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  type: string,
  { height, width }: CreateActionFunctionOptionalArguments,
) => {
  // the function is then called whenever the element is created
  const createFunction = (element: any) => {
    // create a business object (according to the custom moddle definition)
    const businessObject = bpmnFactory.create(type);
    const shape = elementFactory.createShape({
      businessObject,
      height,
      type,
      width,
    });

    // create the element with that created shape
    create.start(element, shape);
  };

  return createFunction;
};

/**
 * Function to create a new controls entry, the `actionFunction` is called when
 * the element is clicked od dragged
 *
 * @param {CreateActionFunction} actionFunction function that is executed when
 *                                              the element is clicked
 *                                              or dragged.
 * @param {any} bpmnFactory factory that can create bpmn objects
 *                          (according to the custom moddle definition)
 * @param {string} className name of the css class to assign to
 * @param {Function} create function that can create the element in the diagram
 * @param {any} elementFactory function that can create (custom) elements
 *                             in the diagram
 * @param {string} elementTitle title which is shown on hover
 * @param {string} entryTitle title of the action for the pad/palette provider
 * @param {string} group where is the entry grouped at
 * @param {number} height height of the object
 * @param {any} imageUrl the image which is displayed
 * @param {string} type object identifier
 * @param {Function} translate translate function
 *                             which takes the title and translates is
 * @param {number} width height of the object
 *
 * @returns palette entry
 */
export const createFrssElementControlEntry = (
  actionFunction: CreateActionFunction,
  bpmnFactory: any,
  className: string,
  create: any,
  elementFactory: any,
  elementTitle: string,
  entryTitle: string,
  group: string,
  type: string,
  translate: Function,
  optionalArgs: CreateActionFunctionOptionalArguments & {
    imageUrl: any,
  },
): FrssElementControlEntry => {
  // an element constructor function, called
  // each time the element should be created in the Modeler
  const createElement = actionFunction(
    bpmnFactory,
    create,
    elementFactory,
    type,
    optionalArgs,
  );

  return {
    [entryTitle]: {
      group,
      imageUrl: optionalArgs.imageUrl,
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
 * @param {FrssElementControlEntry[]} controlEntries entries for the palette
 * @returns single palette entry object
 */
export const joinControlEntries = (
  controlEntries: FrssElementControlEntry[],
): FrssElementControlEntry => {
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

export type CreateFrssElementControlEntry = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  translate: Function,
  optionalArgs: {
    modeling: any,
  }
) => FrssElementControlEntry;

/**
 * Pad Entry is an object that has the array of element identifiers,
 * which should have the pad entry that is defined in `constructPadEntry`
 */
export interface PadEntry {
  /** Pad entry constructor */
  constructPadEntry: CreateFrssElementControlEntry,
  elementIdentifiers: string[]
}

/**
 * The controls attributes of a custom elements
 */
export interface FrssElementControls {
  createPaletteEntry?: CreateFrssElementControlEntry,
  padEntries: PadEntry[],
}

export type FrssRendererEntry = (
  parentNode: any,
  element: any,
  bpmnFactory?: any
) => Element | null;

/**
 * The structure of a custom element
 */
export interface FrssElementSubmodules {
  controls: FrssElementControls
  definition: FrssElementDefinition,
  icon: any,
  render: FrssRendererEntry,
}

// Frss Element is comprised of optional elements
// and a required `properties` key
export type FrssElement = Partial<FrssElementSubmodules>
& { properties: FrssElementProperties };
