import { createElement } from '../../../../types/controls/implementation';
import bcTimestampServiceProperties from './properties';
import type { FrssControls } from '../../../../types/controls';

const bcTimestampServiceControls: FrssControls = {
  paletteCreateEntry: {
    makeActionHandler: createElement,
    props: {
      group: 'frss',
      key: `create-${bcTimestampServiceProperties.nameLowercase}`,
      title: `Create a ${bcTimestampServiceProperties.name}`,
      className: 'bpmn-icon-participant frss-service',
    },
  },
};

export default bcTimestampServiceControls;
