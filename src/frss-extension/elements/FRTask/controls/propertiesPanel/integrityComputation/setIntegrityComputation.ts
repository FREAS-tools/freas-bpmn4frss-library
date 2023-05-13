import integrityComputationProperties
  from '../../../derivedElements/Computation/IntegrityComputation/properties';
import { FrssTaskToggleComponent } from '../common';

const IntegrityComputationPanelToggleSwitch = (
  props: { element: any },
) => FrssTaskToggleComponent({
  id: 'integrity-computation',
  identifier: integrityComputationProperties.identifier,
  element: props.element,
  moddlePropertyName: 'isIntegrityComputation',
  switcherLabelName: 'Integrity Computation',
});

export default IntegrityComputationPanelToggleSwitch;
