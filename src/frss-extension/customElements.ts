import EvidenceDataObject from './elements/EvidenceDataObject';
import PotentialEvidenceSource from './elements/PotentialEvidenceSource';
import PotentialEvidenceType from './elements/PotentialEvidenceType';
import Produces from './elements/Produces';
import { CustomElement } from './elements/types';

// export the list of used custom elements
const customElements: CustomElement[] = [
  EvidenceDataObject,
  PotentialEvidenceSource,
  PotentialEvidenceType,
  Produces,
];

export default customElements;
