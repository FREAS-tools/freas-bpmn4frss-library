// import the prefix
import { bpmn4frssPrefix } from '../../common';
import {
  RenderableElementWithIconProps,
} from '../../types/properties/properties';
import icon
  from './assets/evidence-source.png';

const name = 'EvidenceSource';

const properties: RenderableElementWithIconProps = {
  icon,
  identifier: `${bpmn4frssPrefix}${name}`,
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

export default properties;
