import controls from './controls';
import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';
import rules from './rules';

// types
import type { FrssElement } from '../../types';

/**
 * Allows marking objects as an Evidence Source
 */
const EvidenceSource: FrssElement = {
  controls,
  definition,
  properties,
  rendererEntry,
  rules,
};

/**
 * The default export exports all properties of a custom element.
 */
export default EvidenceSource;
