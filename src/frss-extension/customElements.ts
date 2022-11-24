// import custom element modules
// - each module is a custom FRSS construct
import EvidenceDataObject from './elements/EvidenceDataObject';
import EvidenceSource from './elements/EvidenceSource';
import PotentialEvidence from './elements/PotentialEvidence';
// import Produces from './elements/Produces';

// import types & rule types
import FrssElement, {
  FrssElementWithRules,
  hasRules,
  inPad,
  inPalette,
  isRenderable,
  PadFrssElement,
  PaletteFrssElement,
  RenderableFrssElement,
} from './types';
import {
  ElementRules,
  HasAttachmentRule,
  HasConnectionRule,
  hasConnectionRule,
  HasCreationRule,
  hasCreationRule,
  HasPreCreateRule,
  hasPreCreateRule,
  hasPreDeleteRule,
  HasPreDeleteRule,
} from './types/rules';

// export the list of used custom elements
const customElements: FrssElement[] = [
  EvidenceDataObject,
  EvidenceSource,
  PotentialEvidence,
  // Produces,
];

// Below are lists of elements, that are used in different contexts.
// These lists of elements (and rules) are created to allow type safety
// and ease of implementing the providers
// (without the need to write a lot of bloated code)

// Elements that are in the palette
export const customElementsInPalette: PaletteFrssElement[] = customElements
  .filter((element): element is PaletteFrssElement => inPalette(element));

// Elements that are in the context pad
export const customElementsInPad: PadFrssElement[] = customElements
  .filter((element): element is PadFrssElement => inPad(element));

// Elements that are renderable
export const renderableCustomElements: RenderableFrssElement[] = customElements
  .filter((element): element is RenderableFrssElement => isRenderable(element));

export const elementsWithRules: FrssElementWithRules[] = customElements
  .filter((element): element is FrssElementWithRules => hasRules(element));

// List of element rules
export const elementRules: ElementRules[] = elementsWithRules
  .map((elementWithRules) => elementWithRules.rules);

// List of pre-create rules
export const preCreateRules = elementRules
  .filter((rule): rule is HasPreCreateRule => (
    hasPreCreateRule(rule)
  ));

// List of pre-delete rules
export const preDeleteRules = elementRules
  .filter((rule): rule is HasPreDeleteRule => (
    hasPreDeleteRule(rule)
  ));

// List of attachment rules
export const attachmentRules = elementRules
  .filter((rule): rule is HasAttachmentRule => (
    hasPreCreateRule(rule)
  ));

export const connectionRules = elementRules
  .filter((rule): rule is HasConnectionRule => (
    hasConnectionRule(rule)
  ));

export const creationRules = elementRules
  .filter((rule): rule is HasCreationRule => (
    hasCreationRule(rule)
  ));

export default customElements;
