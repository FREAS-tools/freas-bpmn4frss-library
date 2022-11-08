import { NewActionFunction } from '../../types/controls/actionFunction';
import { Controls } from '../../types/controls/controls';

const markDataObjectAsEvidence: NewActionFunction = (
  {
    bpmnFactory,
    modeling,
  },
  elementProperties,
) => {
  const action = (event: any, element: any) => {
    console.log(element);
    const dataObject = element?.businessObject?.dataObjectRef;

    // if the object has been marked as an evidence type already
    if (dataObject?.isPotentialEvidence !== undefined) return;

    const potentialEvidence = bpmnFactory.create(elementProperties.identifier);
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

const controls: Controls = {
  padEntries: [
    {
      action: markDataObjectAsEvidence,
      entryProps: {
        entryGroup: 'edit',
        key: 'mark-as-potential-evidence',
        title: 'Mark DataObjectRef as Potential Evidence',
      },
      showOnElements: ['bpmn:DataObjectReference'],
    },
  ],
};

export default controls;
