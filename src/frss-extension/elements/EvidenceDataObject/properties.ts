// import the prefix
import { bpmn4frssPrefix } from '../../common';
import { FrssElementProperties } from '../../types';

const name = 'EvidenceDataObject';

const properties: FrssElementProperties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'evidence-data-object',
};

export default properties;