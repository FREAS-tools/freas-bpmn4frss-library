import { Controls } from './controls/controls';
import Definition from './definition';
import Properties from './props';
import RendererEntry from './rendererEntry';

interface Submodules {
  controls: Controls,
  definition: Definition,
  rendererEntry: RendererEntry,
}

/**
 * FRSS element can have many submodules.
 * Only required module is the element properties
 */
type FrssElement = {
  properties: Properties,
} & Partial<Submodules>;

export default FrssElement;
