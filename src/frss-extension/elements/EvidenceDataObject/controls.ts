import {
  createFrssElementControlEntry,
  FrssElementControls,
  FrssElementControlEntry,
  CreateActionFunction,
  CreateActionFunctionOptionalArguments,
  CreateFrssElementControlEntry,
} from '../../typesOld';

import properties from './properties';

const createMarkDataObjectAsEvidenceAction: CreateActionFunction = (
  bpmnFactory: any,
  _create: any,
  _elementFactory: any,
  _type: string,
  { modeling }: CreateActionFunctionOptionalArguments,
) => {
  const action = (element: any) => {
    const dataObject = element.businessObject.dataObjectRef;

    // if the object has been marked as an evidence type already
    if (dataObject.isPotentialEvidence) return;

    const potentialEvidence = bpmnFactory.create(properties.identifier);
    const updateDataObject = {
      ...dataObject,
      isPotentialEvidence: potentialEvidence,
    };

    modeling.updateProperties(element, {
      dataObjectRef: updateDataObject,
    });
  };

  return action;
};

export const markDataObjectAsEvidence: CreateFrssElementControlEntry = (
  bpmnFactory: any,
  create: any,
  elementFactory: any,
  translate: Function,
  _optionalArgs,
): FrssElementControlEntry => createFrssElementControlEntry(
  createMarkDataObjectAsEvidenceAction,
  bpmnFactory,
  properties.nameLowercase,
  create,
  elementFactory,
  'Mark DataObjectRef as Potential Evidence',
  'mark-data-object-ref-as-evidence',
  'edit',
  properties.identifier,
  translate,
  { ..._optionalArgs, imageUrl: undefined },
);

const controls: FrssElementControls = {
  padEntries: [
    {
      constructPadEntry: markDataObjectAsEvidence,
      elementIdentifiers: ['bpmn:DataObjectRef'],
    },
  ],
};

export default controls;
