import DataFieldComponent from './dataField';

const PotentialEvidenceDataField = (
  props: {
    element: any,
    id: string,
  },
) => DataFieldComponent(
  { ...props, potentialEvidenceType: 'Potential Evidence' },
);

export default PotentialEvidenceDataField;
