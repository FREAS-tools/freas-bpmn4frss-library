import { createElement } from '../../types/controls/implementation';
import evidenceSourceProperties from './properties';

// types
import type { FrssControls } from '../../types/controls';

const evidenceSourceControls: FrssControls = {
  paletteCreateEntry: {
    makeActionHandler: createElement,
    props: {
      group: 'frss',
      key: `create-${evidenceSourceProperties.nameLowercase}`,
      title: 'Create an Evidence Source',
      imageUrl: evidenceSourceProperties.icon,
    },
  },
  padEntries: [],
};

export default evidenceSourceControls;
