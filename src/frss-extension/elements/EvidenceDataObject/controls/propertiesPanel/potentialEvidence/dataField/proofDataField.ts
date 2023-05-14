import DataFieldComponent from './dataField';

const ProofDataField = (
  props: {
    element: any,
    id: string,
  },
) => DataFieldComponent(
  { ...props, potentialEvidenceType: 'Proof' },
);

export default ProofDataField;
