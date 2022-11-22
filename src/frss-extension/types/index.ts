import { Controls, EntryData, PadEntryData } from './controls/controls';
import PreCreateElementRule from './creation';
import Definition from './definition';
import Properties from './props';
import ElementRender from './rendererEntry';

interface Submodules {
  controls: Controls,
  definition: Definition,
  preCreateRule: PreCreateElementRule,
  rendererEntry: ElementRender,
}

/**
 * FRSS element can have many submodules.
 * Only required module is the element properties
 */
type FrssElement = {
  properties: Properties,
} & Partial<Submodules>;

export type PaletteFrssElement = {
  controls: {
    createEntry: EntryData,
    padEntries: PadEntryData[],
  },
} & FrssElement;

export type PadFrssElement = {
  controls: {
    padEntries: PadEntryData[],
  },
} & FrssElement;

export type RenderableFrssElement = {
  rendererEntry: ElementRender,
} & FrssElement;

export type PreCreateFrssElement = {
  preCreateRule: PreCreateElementRule
} & FrssElement;

export const inPalette = (
  element: FrssElement,
): element is PaletteFrssElement => {
  const isInPalette = element as PaletteFrssElement;

  return isInPalette.controls !== undefined
    && isInPalette.controls.createEntry !== undefined
    && isInPalette.controls.createEntry.action !== undefined
    && isInPalette.controls.createEntry.entryProps !== undefined;
};

export const inPad = (
  element: FrssElement,
): element is PadFrssElement => {
  const isInPad = element as PadFrssElement;

  return isInPad.controls !== undefined
    && isInPad.controls.padEntries !== undefined
    && isInPad.controls.padEntries.length > 0;
};

export const isRenderable = (
  element: FrssElement,
): element is RenderableFrssElement => {
  const elementIsRenderable = element as RenderableFrssElement;

  return elementIsRenderable.rendererEntry !== undefined
    && elementIsRenderable.rendererEntry.renderFunction !== undefined
    && elementIsRenderable.rendererEntry.renderOnElements !== undefined
    && elementIsRenderable.rendererEntry.renderOnElements.length > 0
    && elementIsRenderable.rendererEntry.shouldRender !== undefined;
};

export const hasPreCreateRule = (
  element: FrssElement,
): element is PreCreateFrssElement => {
  const elementHasPreCreateRule = element as PreCreateFrssElement;

  return elementHasPreCreateRule.preCreateRule !== undefined
    && elementHasPreCreateRule.preCreateRule.shouldTrigger !== undefined
    && elementHasPreCreateRule.preCreateRule.trigger !== undefined;
};

export default FrssElement;
