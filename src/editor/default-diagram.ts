import { nanoid } from 'nanoid';

/* Generate "unique" ids for a new (default) diagram each time */
const definitionsId = nanoid(6);
const processId = nanoid(6);
const startEventId = nanoid(6);

const diDiagramId = nanoid(6);
const diPlaneId = nanoid(6);
const diStartEvent = nanoid(6);

/* eslint-disable max-len */
/* Create a default diagram. */
const defaultDiagram = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_${definitionsId}" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_${processId}" isExecutable="false">
    <bpmn:startEvent id="StartEvent_${startEventId}" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_${diDiagramId}">
    <bpmndi:BPMNPlane id="BPMNPlane_${diPlaneId}" bpmnElement="Process_${processId}">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_${diStartEvent}" bpmnElement="StartEvent_${startEventId}">
        <dc:Bounds x="232" y="382" width="36" height="36"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export default defaultDiagram;
