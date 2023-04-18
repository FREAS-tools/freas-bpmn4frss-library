import { bpmn4frssPrefix } from '../../common';

// types
import type { ElementBaseProperties } from '../../types/properties';

const name = 'EvidenceDataObject';

const properties: ElementBaseProperties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'evidence-data-object',
};

export default properties;
