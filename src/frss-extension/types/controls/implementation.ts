import { hasIcon, hasSizeAndOffset } from '../props';
import {
  ActionFunction,
  CreateShape,
  NewActionFunction,
} from './actionFunction';
import { ControlEntry, NewControlEntry } from './entry';

/**
 * Default function for creating the FRSS element
 * @param param0 the context from the pad/palette provider
 * @param properties renderable element properties
 * @returns the function that can create an element
 */
export const createElement: NewActionFunction = (
  { bpmnFactory, create, elementFactory },
  properties,
) => {
  // the function is then called whenever the element is created
  const createFunction: ActionFunction = (element: any) => {
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
        weight: properties.size.width,
      };
    }

    // create the shape
    const shape = elementFactory.createShape(createObject);

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
    [entryProps.key]: {
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
      [entryProps.key]: {
        ...entry[entryProps.key],
        imageUrl: elementProps.icon,
      },
    };
  }

  return entry;
};

export default newElementEntry;
