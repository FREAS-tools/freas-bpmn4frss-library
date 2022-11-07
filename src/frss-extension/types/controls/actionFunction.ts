import
{ RenderableElementProps, RenderableElementWithIconProps } from '../props';
import ControlsContext from './context';

export type ActionFunction = (
  element: any,
  event?: any,
  autoActivate?: any,
) => void;

export type NewActionFunction = (
  context: ControlsContext,
  elementProperties: RenderableElementProps | RenderableElementWithIconProps,
) => ActionFunction;
