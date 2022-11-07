import Properties from '../props';
import ControlsContext from './context';

export type ActionFunction = (
  element: any,
  event?: any,
  autoActivate?: any,
) => void;

export interface CreateShape {
  businessObject: any,
  height?: number,
  type: string,
  weight?: number,
}

export type NewActionFunction = (
  context: ControlsContext,
  elementProperties: Properties,
) => ActionFunction;
