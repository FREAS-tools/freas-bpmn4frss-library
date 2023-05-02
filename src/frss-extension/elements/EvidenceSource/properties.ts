import { createIdentifier } from '../common';

import icon from './assets/evidence-source.png';

// types
import type {
  CustomRenderableElementWithIconProperties,
} from '../../types/properties';

const name = 'EvidenceSource';

const evidenceSourceProperties: CustomRenderableElementWithIconProperties = {
  icon,
  identifier: createIdentifier(name),
  name,
  nameLowercase: 'evidence-source',
  offset: {
    x: 0,
    y: 0,
  },
  size: {
    height: 28,
    width: 28,
  },
};

export default evidenceSourceProperties;
