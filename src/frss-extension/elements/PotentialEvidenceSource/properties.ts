// import the prefix
import { bpmn4frssPrefix } from '../../common';
import { FrssElementProperties } from '../../types';

const name = 'PotentialEvidenceSource';

const properties: FrssElementProperties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'potential-evidence-source',
  elementSize: {
    x: 28,
    y: 28,
  },
  elementOffset: {
    x: 0,
    y: 0,
  },
};

export default properties;
