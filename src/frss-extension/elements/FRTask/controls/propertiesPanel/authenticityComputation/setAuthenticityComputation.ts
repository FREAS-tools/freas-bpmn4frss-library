import authenticityComputationProperties
  from '../../../Computation/AuthenticityComputation/properties';
import FrssTaskComponent from '../common';

const AuthenticityComputationPanelToggleSwitch = (
  props: { element: any },
) => FrssTaskComponent({
  id: 'authenticity-computation',
  identifier: authenticityComputationProperties.identifier,
  element: props.element,
  moddlePropertyName: 'isAuthenticityComputation',
  switcherLabelName: 'Authenticity Computation',
});

export default AuthenticityComputationPanelToggleSwitch;
