import { Controls, EntryData, PadEntryData } from './controls/controls';
import Definition from './definitions/definition';
import Properties from './properties/properties';
import ElementRender from './renderer/rendererEntry';
import { ElementRules } from './rules';

interface Submodules {
  controls: Controls,
  rendererEntry: ElementRender,
  rules: ElementRules,
}

/**
 * FRSS element can have many submodules.
 * Only required module is the element properties
 */
type FrssElement = {
  definition: Definition,
  properties: Properties,
} & Partial<Submodules>;

export type FrssPaletteElement = {
  controls: {
    createEntry: EntryData,
    padEntries: PadEntryData[],
  },
} & FrssElement;

export type FrssPadElement = {
  controls: {
    padEntries: PadEntryData[],
  },
} & FrssElement;

export type FrssRenderable = {
  rendererEntry: ElementRender,
} & FrssElement;

export type FrssElementWithRules = {
  rules: ElementRules,
} & FrssElement;

export const inPalette = (
  element: FrssElement,
): element is FrssPaletteElement => {
  const checkElement = element as FrssPaletteElement;

  return checkElement.controls !== undefined
    && checkElement.controls.createEntry !== undefined
    && checkElement.controls.createEntry.action !== undefined
    && checkElement.controls.createEntry.entryProps !== undefined;
};

export const inPad = (
  element: FrssElement,
): element is FrssPadElement => {
  const checkElement = element as FrssPadElement;

  return checkElement.controls !== undefined
    && checkElement.controls.padEntries !== undefined
    && checkElement.controls.padEntries.length > 0;
};

export const isRenderable = (
  element: FrssElement,
): element is FrssRenderable => {
  const checkElement = element as FrssRenderable;

  return checkElement.rendererEntry !== undefined
    && checkElement.rendererEntry.renderFunction !== undefined
    && checkElement.rendererEntry.renderOnElements !== undefined
    && checkElement.rendererEntry.renderOnElements.length > 0
    && checkElement.rendererEntry.shouldRender !== undefined
    && checkElement.rendererEntry.type !== undefined;
};

export const hasRules = (
  element: FrssElement,
): element is FrssElementWithRules => {
  const checkElement = element as FrssElementWithRules;

  return checkElement.rules !== undefined;
};

export default FrssElement;
