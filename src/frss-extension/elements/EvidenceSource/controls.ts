import { createElement } from '../../types/controls/implementation';
import evidenceSourceProperties from './properties';

// types
import type { FrssControls } from '../../types/controls';

const evidenceSourceControls: FrssControls = {
  paletteCreateEntry: {
    makeActionHandler: createElement,
    props: {
      group: 'activity',
      key: `create-${evidenceSourceProperties.nameLowercase}`,
      title: 'Add Evidence Source',
      imageUrl: evidenceSourceProperties.icon,
    },
  },
  padEntries: [],
};

export default evidenceSourceControls;
