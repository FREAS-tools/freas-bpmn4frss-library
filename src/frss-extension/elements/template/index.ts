import { CustomElement } from '../types';
import xControls from './controls';
import x from './definition';
import {
  xIdentifier,
  xRender,
} from './rendererEntry';

const element: CustomElement = {
  definition: x,
  identifier: xIdentifier,
  render: xRender,
  a: '',
  controls: xControls,
};

/**
 * The default export exports all properties of a custom element.
 */
export default element;
