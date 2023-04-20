// type guard
import { hasSizeAndOffset } from '../properties';

// types
import type {
  ActionHandler,
  CreateActionHandler,
  CreateShape,
} from './actionHandler';
import type { ControlsContext } from './context';
import type {
  ControlEntryPropsAndActions,
  ControlEntryProps,
  ControlEntry,
  ControlEntryData,
} from './entry';
import type { FrssProperties } from '../properties';

/**
 * Default function for creating the FRSS element. This can is used
 * by the `PaletteProvider`
 *
 * @param context the context from the pad/palette provider
 * @param properties renderable element properties
 * @returns the function that can create an element
 */
export const createElement: CreateActionHandler = (
  { bpmnFactory, create, elementFactory },
  properties,
) => {
  // the function is then called whenever the element is created
  const createFunction: ActionHandler = (event: any) => {
    // create a business object (according to the custom moddle definition)
    const businessObject = bpmnFactory.create(properties.identifier);
    // diagram-js object data
    let createObject: CreateShape = {
      businessObject,
      type: properties.identifier,
    };

    // if the element has size and offset, add it to the shape
    if (hasSizeAndOffset(properties)) {
      createObject = {
        ...createObject,
        height: properties.size.height,
        width: properties.size.width,
      };
    }

    // create the shape
    const shape = elementFactory.createShape(createObject);

    // create a new element with that created shape
    create.start(event, shape);
  };

  return createFunction;
};

/**
 * Template function for creating an element entry.
 *
 * @param newActionHandler the action that should be performed
 *                         on click and on drag
 * @param context context from the pad/palette provider
 * @param elementProps props of the element
 * @param entryProps entry properties
 * @returns control entry of specified element
 */
export const newControlEntry: CreateControlEntry = (
  newActionHandler,
  context,
  elementProps,
  entryProps,
) => {
  // create the function that handles the click action
  const actionHandler = newActionHandler(context, elementProps);

  const entry: ControlEntryPropsAndActions = {
    ...entryProps,
    title: context.translate(entryProps.title),
    action: {
      click: actionHandler,
    },
  };

  return entry;
};

type CreateControlEntry = (
  newActionHandler: CreateActionHandler,
  context: ControlsContext,
  elementProps: FrssProperties,
  entryProps: ControlEntryProps,
) => ControlEntryPropsAndActions;

/**
 *
 * @param entries
 * @returns
 */
export const collectControlEntries = (
  entries: ControlEntryPropsAndActions[],
): ControlEntry => {
  // empty map
  const result: Map<string, ControlEntryData> = new Map();

  // add all control entries
  entries.forEach((entry) => {
    const data: ControlEntryData = {
      className: entry.className,
      action: entry.action,
      group: entry.group,
      imageUrl: entry.imageUrl,
      title: entry.title,
    };
    result.set(entry.key, data);
  });

  // create an object from the map
  return Object.fromEntries(result);
};
