import { createElement } from '../../types/controls/implementation';
import properties from './properties';

// types
import type { Controls } from '../../types/controls';

const controls: Controls = {
  paletteCreateEntry: {
    makeActionHandler: createElement,
    props: {
      group: 'activity',
      key: `create-${properties.nameLowercase}`,
      title: 'Add Evidence Source',
      imageUrl: properties.icon,
    },
  },
  padEntries: [],
};

export default controls;
