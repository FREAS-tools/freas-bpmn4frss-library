import authenticityComputationProperties
  from './Computation/AuthenticityComputation/properties';
import type { FrssControls } from '../../types/controls';

const frTaskControls: FrssControls = {
  padEntries: [
    {
      makeActionHandler: (_context, _properties) => () => {},
      props: {
        className: '',
        group: 'edit',
        key: authenticityComputationProperties.identifier,
        title: 'Mark as authenticity computation',
      },
      show: (element) => {
        console.log(element);
        return true;
      },
    },
  ],
};

export default frTaskControls;
