import {
  hasIcon, RenderableElementProps, RenderableElementWithIconProps,
} from '../props';
import { ActionFunction, NewActionFunction } from './actionFunction';
import ControlsContext from './context';
import { ControlEntry, EntryProps, NewControlEntry } from './entry';

/**
 * Default function for creating the FRSS element
 * @param param0 the context from the pad/palette provider
 * @param properties renderable element properties
 * @returns the function that can create an element
 */
const createElement: NewActionFunction = (
  { bpmnFactory, create, elementFactory },
  properties,
) => {
  // the function is then called whenever the element is created
  const createFunction: ActionFunction = (element: any) => {
    // create a business object (according to the custom moddle definition)
    const businessObject = bpmnFactory.create(properties.identifier);
    const shape = elementFactory.createShape({
      businessObject,
      height: properties.size.height,
      type: properties.identifier,
      width: properties.size.width,
    });

    // create the element with that created shape
    create.start(element, shape);
  };

  return createFunction;
};

/**
 * Template function for creating an element entry.
 *
 * @param action the action that should be performed on click and on drag
 * @param context context from the pad/palette provider
 * @param elementProps props of the element
 * @param entryProps additional entry props
 * @returns control entry of specified element
 */
const newElementEntry: NewControlEntry = (
  action,
  context,
  elementProps,
  entryProps,
) => {
  const performAction = action(context, elementProps);

  let entry: ControlEntry = {
    [entryProps.title]: {
      group: entryProps.entryGroup,
      className: elementProps.nameLowercase,
      title: context.translate(entryProps.title),
      action: {
        click: performAction,
        dragstart: performAction,
      },
    },
  };

  if (hasIcon(elementProps)) {
    entry = {
      ...entry,
      imageUrl: elementProps.icon,
    };
  }

  return entry;
};

/**
 * Pad entry -> creates the FRSS element
 *
 * @param action the action that should be performed on click and on drag
 * @param context context from the pad/palette provider
 * @param elementProps props of the element
 * @param entryProps additional entry props
 * @returns control entry of specified element
 */
export const padEntry = (
  context: ControlsContext,
  elementProps: RenderableElementProps | RenderableElementWithIconProps,
  entryProps: EntryProps,
) => newElementEntry(createElement, context, elementProps, entryProps);

export default newElementEntry;
