import definition from './definition';
import properties from './properties';
import rendererEntry from './rendererEntry';
import type { FrssElement } from '../../types';

/**
 * Element representing an Association between different Evidence types
 *
 * Originally intended for Evidence View, but that feature is not stable yet,
 * so now it is used in the Scenario View.
 */
const EvidenceAssociation: FrssElement = {
  definition,
  properties,
  rendererEntry,
};

export default EvidenceAssociation;
