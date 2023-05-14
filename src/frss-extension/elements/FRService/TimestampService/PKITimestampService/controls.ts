import { createElement } from '../../../../types/controls/implementation';
import pkiTimestampServiceProperties from './properties';
import type { FrssControls } from '../../../../types/controls';

const pkiTimestampServiceControls: FrssControls = {
  paletteCreateEntry: {
    makeActionHandler: createElement,
    props: {
      group: 'frss',
      key: `create-${pkiTimestampServiceProperties.nameLowercase}`,
      title: `Create a ${pkiTimestampServiceProperties.name}`,
      className: 'bpmn-icon-participant frss-service',
    },
  },
};

export default pkiTimestampServiceControls;
