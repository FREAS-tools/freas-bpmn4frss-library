/* import type guards */
import {
  hasRules,
  inPad,
  inPalette,
  isFrssEnumerationElement,
  isFrssSemanticElement,
  isRenderable,
} from '../types';

/* import render type enumeration */
import { ElementRenderType } from '../types/renderer';

/* import rule type guards */
import {
  hasAttachmentRule,
} from '../types/rules/attachment';

import {
  hasConnectionRule,
} from '../types/rules/connection';

import {
  hasCreationRule,
} from '../types/rules/creation';

/* Import ALL FRSS elements */
import frssElements from './list';

/* Import all types below */
import type {
  FrssElementWithRules,
  FrssEnumerationElement,
  FrssPadElement,
  FrssPaletteElement,
  FrssRenderable,
  FrssSemanticElement,
} from '../types';

import type {
  ElementRules,
} from '../types/rules';
import type { HasAttachmentRule } from '../types/rules/attachment';
import type { HasConnectionRule } from '../types/rules/connection';
import type { HasCreationRule } from '../types/rules/creation';

// Below are lists of elements, that are used in different contexts.
// These lists of elements (and rules) are created to allow type safety
// and ease of implementing the providers / extensions
// (without the need to write a lot of bloated code)

/* All elements with definitions (semantic elements) */
export const frssDefinitionElements: FrssSemanticElement[] = frssElements
  .filter((element): element is FrssSemanticElement => (
    isFrssSemanticElement(element)
  ));

export const frssEnumerationElements: FrssEnumerationElement[] = frssElements
  .filter((element): element is FrssEnumerationElement => (
    isFrssEnumerationElement(element)
  ));

/* All elements in the palette */
export const frssPaletteElements: FrssPaletteElement[] = frssElements
  .filter((element): element is FrssPaletteElement => inPalette(element));

/* All elements in the context pad */
export const frssPadElements: FrssPadElement[] = frssElements
  .filter((element): element is FrssPadElement => inPad(element));

/* All renderable elements */
export const frssRenderables: FrssRenderable[] = frssElements
  .filter((element): element is FrssRenderable => isRenderable(element));

export const frssRenderableShapes = frssRenderables.filter(
  (renderableElement) => (
    renderableElement.rendererEntry.type === ElementRenderType.Shape
  ),
);

export const frssRenderableConnections = frssRenderables.filter(
  (renderableElement) => (
    renderableElement.rendererEntry.type === ElementRenderType.Connection
  ),
);

/* All elements with rules */
export const frssElementsWithRules: FrssElementWithRules[] = frssElements
  .filter((element): element is FrssElementWithRules => hasRules(element));

/* List of all element rules */
export const frssElementRules: ElementRules[] = frssElementsWithRules
  .map((ruleElement) => ruleElement.rules);

/* List of attachment rules */
export const attachmentRules = frssElementRules
  .filter((rule): rule is HasAttachmentRule => (
    hasAttachmentRule(rule)
  ));

/* List of connection rules */
export const connectionRules = frssElementRules
  .filter((rule): rule is HasConnectionRule => (
    hasConnectionRule(rule)
  ));

/* List of creation rules */
export const creationRules = frssElementRules
  .filter((rule): rule is HasCreationRule => (
    hasCreationRule(rule)
  ));

export default frssElements;
