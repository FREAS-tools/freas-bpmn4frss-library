// import the prefix
import { bpmn4frssPrefix } from '../../common';
import { Props } from '../../types/properties/properties';

const name = 'EvidenceDataObject';

const properties: Props = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'evidence-data-object',
};

export default properties;
