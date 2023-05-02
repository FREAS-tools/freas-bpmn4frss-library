import type { FrssControls } from './controls';
import type { FrssEnumeration, FrssModdleDefinition } from './definitions';
import type { FrssProperties } from './properties';
import type { RendererEntry } from './renderer';
import type { FrssElementRules } from './rules';
import type { PartiallyRequired } from './utility';

type Submodules = {
  controls: FrssControls,
  rendererEntry: RendererEntry,
  rules: FrssElementRules,
};

export type FrssEnumerationElement = {
  definition?: never,
  enumerationDefinition: FrssEnumeration,
  properties: FrssProperties,
};

export type FrssSemanticElement = {
  definition: FrssModdleDefinition,
  enumerationDefinition?: never,
  properties: FrssProperties,
};

export type FrssElementWithPotentialSubmodules = FrssSemanticElement & Partial<
Submodules>;

/**
 * FRSS element can have many submodules.
 * Only required module is the element properties
 */
export type FrssElement = FrssEnumerationElement
| FrssElementWithPotentialSubmodules;

export type FrssPaletteElement = {
  controls: PartiallyRequired<FrssControls, 'paletteCreateEntry'>,
} & FrssSemanticElement;

export type FrssPadElement = PartiallyRequired<
FrssElementWithPotentialSubmodules, 'controls'>;

export type FrssRenderable = PartiallyRequired<
FrssElementWithPotentialSubmodules, 'rendererEntry'>;

export type FrssElementWithRules = PartiallyRequired<
FrssElementWithPotentialSubmodules, 'rules'>;

export const isFrssSemanticElement = (
  element: FrssElement,
): element is FrssSemanticElement => {
  const checkElement = element as FrssSemanticElement;

  return checkElement.definition !== undefined
    && checkElement.properties !== undefined
    && checkElement.enumerationDefinition === undefined;
};

export const isFrssEnumerationElement = (
  element: FrssElement,
): element is FrssEnumerationElement => {
  const checkElement = element as FrssEnumerationElement;

  return checkElement.enumerationDefinition !== undefined
    && checkElement.properties !== undefined
    && checkElement.definition === undefined;
};

export const inPalette = (
  element: FrssElement,
): element is FrssPaletteElement => {
  const checkElement = element as FrssPaletteElement;

  return isFrssSemanticElement(element)
    && checkElement.controls !== undefined
    && checkElement.controls.paletteCreateEntry !== undefined
    && checkElement.controls.paletteCreateEntry.makeActionHandler !== undefined
    && checkElement.controls.paletteCreateEntry.props !== undefined;
};

export const inPad = (
  element: FrssElement,
): element is FrssPadElement => {
  const checkElement = element as FrssPadElement;

  return isFrssSemanticElement(element)
    && checkElement.controls !== undefined
    && checkElement.controls.padEntries !== undefined
    && checkElement.controls.padEntries.length > 0;
};

export const isRenderable = (
  element: FrssElement,
): element is FrssRenderable => {
  const checkElement = element as FrssRenderable;

  return isFrssSemanticElement(element)
    && checkElement.rendererEntry !== undefined
    && checkElement.rendererEntry.renderFunction !== undefined
    && checkElement.rendererEntry.shouldRender !== undefined
    && checkElement.rendererEntry.type !== undefined;
};

export const hasRules = (
  element: FrssElement,
): element is FrssElementWithRules => {
  const checkElement = element as FrssElementWithRules;

  return isFrssSemanticElement(element)
    && checkElement.rules !== undefined;
};
