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
  FrssPadElement,
  FrssPaletteElement,
  FrssRenderableElement,
} from './types';
import {
  ElementRules,
  hasAttachmentRule,
  HasAttachmentRule,
  HasConnectionRule,
  hasConnectionRule,
  HasCreationRule,
  hasCreationRule,
  HasPreCreateEvents,
  hasPreCreateEvent,
  hasPreDeleteEvent,
  HasPreDeleteEvents,
} from './types/rules';

// export the list of used custom elements
const frssElements: FrssElement[] = [
  EvidenceDataObject,
  EvidenceSource,
  PotentialEvidence,
  // Produces,
];

// Below are lists of elements, that are used in different contexts.
// These lists of elements (and rules) are created to allow type safety
// and ease of implementing the providers / extensions
// (without the need to write a lot of bloated code)

/* All elements in the palette */
export const frssPaletteElements: FrssPaletteElement[] = frssElements
  .filter((element): element is FrssPaletteElement => inPalette(element));

/* All elements in the context pad */
export const frssPadElements: FrssPadElement[] = frssElements
  .filter((element): element is FrssPadElement => inPad(element));

/* All renderable elements */
export const frssRenderableElements: FrssRenderableElement[] = frssElements
  .filter((element): element is FrssRenderableElement => isRenderable(element));

/* All elements with rules */
export const frssElementsWithRules: FrssElementWithRules[] = frssElements
  .filter((element): element is FrssElementWithRules => hasRules(element));

/* List of all element rules */
export const frssElementRules: ElementRules[] = frssElementsWithRules
  .map((ruleElement) => ruleElement.rules);

/* List of pre-create events */
export const preCreateEvents = frssElementRules
  .filter((rule): rule is HasPreCreateEvents => (
    hasPreCreateEvent(rule)
  )).flatMap((event) => event.preCreateEvents);

/* List of pre-delete events */
export const preDeleteEvents = frssElementRules
  .filter((rule): rule is HasPreDeleteEvents => (
    hasPreDeleteEvent(rule)
  )).flatMap((event) => event.preDeleteEvents);

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
