import Properties from '../properties/properties';
import ControlsContext from './context';

export type ActionFunction = (
  event: any,
  element?: any,
  autoActivate?: any,
) => void;

export interface CreateShape {
  businessObject: any,
  height?: number,
  type: string,
  width?: number,
}

export type NewActionFunction = (
  context: ControlsContext,
  elementProperties: Properties,
) => ActionFunction;
