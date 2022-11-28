import { Controls } from '../../types/controls/controls';
import { createElement } from '../../types/controls/implementation';
import properties from './properties';

const controls: Controls = {
  createEntry: {
    action: createElement,
    entryProps: {
      entryGroup: 'activity',
      key: `create-${properties.nameLowercase}`,
      title: 'Add Evidence Source',
    },
  },
  padEntries: [],
};

export default controls;
