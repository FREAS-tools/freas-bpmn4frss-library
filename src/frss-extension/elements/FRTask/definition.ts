import authenticityComputationProperties
  from './Computation/AuthenticityComputation/properties';
import integrityComputationProperties
  from './Computation/IntegrityComputation/properties';
import dataTransformationProperties from './DataTransformation/properties';
import frTaskProperties from './properties';
import type { FrssModdleDefinition } from '../../types/definitions';

const { name } = frTaskProperties;

const frTaskDefinition: FrssModdleDefinition = {
  name,
  extends: ['bpmn:Task'],
  properties: [
    {
      name: 'isAuthenticityComputation',
      type: authenticityComputationProperties.identifier,
      isMany: false,
    },
    {
      name: 'isIntegrityComputation',
      type: integrityComputationProperties.identifier,
      isMany: false,
    },
    {
      name: 'isDataTransformation',
      type: dataTransformationProperties.identifier,
      isMany: false,
    },
  ],
};

export default frTaskDefinition;
