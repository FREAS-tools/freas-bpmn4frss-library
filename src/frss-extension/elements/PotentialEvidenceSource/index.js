import potentialEvidenceSource from './definition';
import {
  potentialEvidenceSourceIdentifier,
  potentialEvidenceSourceRender,
} from './rendererEntry';
import potentialEvidenceSourceIcon
  from './assets/potential-evidence-source.png';
import potentialEvidenceSourceControls from './controls';

/**
 * The default export exports all properties of a custom element.
 */
export default {
  definition: potentialEvidenceSource,
  identifier: potentialEvidenceSourceIdentifier,
  icon: potentialEvidenceSourceIcon,
  render: potentialEvidenceSourceRender,
  controls: potentialEvidenceSourceControls,
};
