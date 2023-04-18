import type { ControlsContext } from './context';
import type { Properties } from '../properties';

/**
 * Function which is called by the user (usually by clicking/dragging something)
 * Modifies the diagram in some way - creates/changes/deletes an element
 *
 * Most often used to create or delete elements
 */
export type ActionHandler = (
  event: any,
  element?: any,
  autoActivate?: any,
) => void;

/**
 * The object that is fed to `ElementFactory`, has height and width if
 * it is a custom renderable element, otherwise only business object and
 * type is passed to the `ElementFactory`.
 */
export type CreateShape = {
  businessObject: any,
  height?: number,
  type: string,
  width?: number,
};

/**
 * Function whoch takes a context (dependencies necessary for object creation)
 * and the desired properties of a FRSS element.
 */
export type CreateActionHandler = (
  context: ControlsContext,
  elementProperties: Properties,
) => ActionHandler;
