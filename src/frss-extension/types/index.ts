import { Controls, EntryData, PadEntryData } from './controls/controls';
import Definition from './definition';
import Properties from './props';
import ElementRender from './rendererEntry';

interface Submodules {
  controls: Controls,
  definition: Definition,
  rendererEntry: ElementRender,
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
  rendererEntry: ElementRender,
}>;

export type FrssElementInPad = {
  controls: {
    padEntries: PadEntryData[],
  },
  properties: Properties,
} & Partial<{
  definition: Definition,
  rendererEntry: ElementRender,
}>;

export type FrssElementRenderable = {
  properties: Properties,
  rendererEntry: ElementRender,
} & Partial<{
  controls: Controls,
  definition: Definition,
}>;

export const elementIsInPalette = (
  element: FrssElement,
): element is FrssElementInPalette => {
  const isInPalette = element as FrssElementInPalette;

  return isInPalette.controls !== undefined
    && isInPalette.controls.createEntry !== undefined
    && isInPalette.controls.createEntry.action !== undefined
    && isInPalette.controls.createEntry.entryProps !== undefined;
};

export const elementIsInPad = (
  element: FrssElement,
): element is FrssElementInPad => {
  const isInPad = element as FrssElementInPad;

  return isInPad.controls !== undefined
    && isInPad.controls.padEntries !== undefined
    && isInPad.controls.padEntries.length > 0;
};

export const elementIsRenderable = (
  element: FrssElement,
): element is FrssElementRenderable => {
  const isRenderable = element as FrssElementRenderable;

  return isRenderable.rendererEntry !== undefined
    && isRenderable.rendererEntry.renderFunction !== undefined
    && isRenderable.rendererEntry.renderOnElements !== undefined;
};

export default FrssElement;
