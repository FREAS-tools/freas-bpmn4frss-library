import type { Controls } from './controls';
import type { FrssModdleDefinition } from './definitions';
import type { FrssProperties } from './properties';
import type { ElementRender } from './renderer';
import type { ElementRules } from './rules';
import type { PartiallyRequired } from './utility';

type Submodules = {
  controls: Controls,
  rendererEntry: ElementRender,
  rules: ElementRules,
};

/**
 * FRSS element can have many submodules.
 * Only required module is the element properties
 */
export type FrssElement = {
  definition: FrssModdleDefinition,
  properties: FrssProperties,
} & Partial<Submodules>;

export type FrssPaletteElement = {
  controls: PartiallyRequired<Controls, 'paletteCreateEntry'>,
} & FrssElement;

export type FrssPadElement = PartiallyRequired<FrssElement, 'controls'>;

export type FrssRenderable = PartiallyRequired<FrssElement, 'rendererEntry'>;

export type FrssElementWithRules = PartiallyRequired<FrssElement, 'rules'>;

export const inPalette = (
  element: FrssElement,
): element is FrssPaletteElement => {
  const checkElement = element as FrssPaletteElement;

  return checkElement.controls !== undefined
    && checkElement.controls.paletteCreateEntry !== undefined
    && checkElement.controls.paletteCreateEntry.makeActionHandler !== undefined
    && checkElement.controls.paletteCreateEntry.props !== undefined;
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
    && checkElement.rendererEntry.shouldRender !== undefined
    && checkElement.rendererEntry.type !== undefined;
};

export const hasRules = (
  element: FrssElement,
): element is FrssElementWithRules => {
  const checkElement = element as FrssElementWithRules;

  return checkElement.rules !== undefined;
};
