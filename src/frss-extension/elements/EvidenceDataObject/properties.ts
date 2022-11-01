// import the prefix
import { bpmn4frssPrefix } from '../../common';
import { CustomElementProperties } from '../types';

const name = 'EvidenceDataObject';

const properties: CustomElementProperties = {
  identifier: `${bpmn4frssPrefix}${name}`,
  name,
  nameLowercase: 'evidence-data-object',
};

export default properties;
