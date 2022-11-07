import { Controls, EntryData, PadEntryData } from './controls/controls';
import Definition from './definition';
import Properties from './props';
import RendererEntry from './rendererEntry';

interface Submodules {
  controls: Controls,
  definition: Definition,
  render: RendererEntry,
}

/**
 * FRSS element can have many submodules.
 * Only required module is the element properties
 */
type FrssElement = {
  properties: Properties,
} & Partial<Submodules>;

export type FrssElementInPalette = {
  controls: {
    createEntry: EntryData,
    padEntries: PadEntryData[],
  },
  properties: Properties,
} & Partial<{
  definition: Definition,
  rendererEntry: RendererEntry,
}>;

export const elementIsInPalette = (
  element: FrssElement,
): element is FrssElementInPalette => {
  const isInPaletteElement = element as FrssElementInPalette;

  return isInPaletteElement.controls !== undefined
    && isInPaletteElement.controls.createEntry !== undefined
    && isInPaletteElement.controls.createEntry.action !== undefined
    && isInPaletteElement.controls.createEntry.entryProps !== undefined;
};

export default FrssElement;
