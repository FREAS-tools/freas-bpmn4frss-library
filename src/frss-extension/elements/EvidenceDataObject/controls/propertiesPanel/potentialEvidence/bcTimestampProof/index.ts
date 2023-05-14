import markAsBCFullTimestampProofEntry from './markAsBCFullTimestampProof';
import markAsBCPartialTimestampProofEntry
  from './markAsBCPartialTimestampProof';
import type {
  PropertiesPanelEntry,
} from '../../../../../../types/controls/propertiesPanel';

const bcTimestampProofEntries: PropertiesPanelEntry[] = [
  markAsBCPartialTimestampProofEntry,
  markAsBCFullTimestampProofEntry,
];

export default bcTimestampProofEntries;
