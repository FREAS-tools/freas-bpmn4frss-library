import type { FrssControls } from './controls';
import type {
  FrssModdleEnumerationDefinition,
  FrssModdleSemanticDefinition,
} from './definitions';
import type { FrssEvents } from './events';
import type { FrssProperties } from './properties';
import type { FrssRendererEntry } from './renderer';
import type { FrssElementRules } from './rules';
import type { PartiallyRequired } from './utility';

type Submodules = {
  controls: FrssControls,
  events: FrssEvents,
  rendererEntry: FrssRendererEntry,
  rules: FrssElementRules,
};

export type FrssEnumerationElement = {
  definition?: never,
  enumerationDefinition: FrssModdleEnumerationDefinition,
  properties: FrssProperties,
};

export type FrssSemanticElement = {
  definition: FrssModdleSemanticDefinition,
  enumerationDefinition?: never,
  properties: FrssProperties,
} & Partial<Submodules>;

/**
 * FRSS element can have many submodules.
 * Only required module is the element properties
 */
export type FrssElement = FrssEnumerationElement | FrssSemanticElement;

export type FrssPaletteElement = {
  controls: PartiallyRequired<FrssControls, 'paletteCreateEntry'>,
} & FrssSemanticElement;

export type FrssPadElement = {
  controls: PartiallyRequired<FrssControls, 'padEntries'>
} & FrssSemanticElement;

export type FrssPropertiesPanelElement = {
  controls: PartiallyRequired<FrssControls, 'propertiesPanelControls'>
} & FrssSemanticElement;

export type FrssRenderableElement = PartiallyRequired<
FrssSemanticElement, 'rendererEntry'>;

export type FrssElementWithRules = PartiallyRequired<
FrssSemanticElement, 'rules'>;

export type FrssElementWithEvents = PartiallyRequired<
FrssSemanticElement, 'events'>;

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

export const inPropertiesPanel = (
  element: FrssElement,
): element is FrssPropertiesPanelElement => {
  const checkElement = element as FrssPropertiesPanelElement;

  return isFrssSemanticElement(element)
    && checkElement.controls !== undefined
    && checkElement.controls.propertiesPanelControls !== undefined
    && checkElement.controls.propertiesPanelControls.length > 0;
};

export const isRenderable = (
  element: FrssElement,
): element is FrssRenderableElement => {
  const checkElement = element as FrssRenderableElement;

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

export const hasEvents = (
  element: FrssElement,
): element is FrssElementWithEvents => {
  const checkElement = element as FrssElementWithEvents;

  return isFrssSemanticElement(element)
  && checkElement.events !== undefined;
};
