import authenticityComputationProperties
  from './derivedElements/Computation/AuthenticityComputation/properties';
import integrityComputationProperties
  from './derivedElements/Computation/IntegrityComputation/properties';
import dataTransformationProperties
  from './derivedElements/DataTransformation/properties';
import frTaskProperties from './properties';
import type { FrssModdleSemanticDefinition } from '../../types/definitions';

const { name } = frTaskProperties;

const frTaskDefinition: FrssModdleSemanticDefinition = {
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
