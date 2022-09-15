import potentialEvidenceSource from './definition';
import {
  potentialEvidenceSourceIdentifier,
  potentialEvidenceSourceRender,
} from './rendererEntry';
// import PotentialEvidenceSourceControls from './controls';

/**
 * The default export exports all properties of a custom element.
 */
export default {
  definition: potentialEvidenceSource,
  identifier: potentialEvidenceSourceIdentifier,
  render: potentialEvidenceSourceRender,
  // controls: PotentialEvidenceSourceControls,
};
