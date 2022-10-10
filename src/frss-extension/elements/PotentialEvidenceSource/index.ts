import { CustomElement } from '../Types/elementTypes';
import potentialEvidenceSourceIcon
  from './assets/potential-evidence-source.png';
import potentialEvidenceSourceControls from './controls';
import potentialEvidenceSource from './definition';
import {
  potentialEvidenceSourceIdentifier,
  potentialEvidenceSourceRender,
} from './rendererEntry';

const element: CustomElement = {
  definition: potentialEvidenceSource,
  identifier: potentialEvidenceSourceIdentifier,
  icon: potentialEvidenceSourceIcon,
  render: potentialEvidenceSourceRender,
  controls: potentialEvidenceSourceControls,
};

/**
 * The default export exports all properties of a custom element.
 */
export default element;
