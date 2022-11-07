import { NewControlEntry } from './entry';

export interface PadEntry {
  /** The pad entry constructor */
  entryConstructor: NewControlEntry,
  /** Element identifiers on which the pad entry should be shown */
  showOnElements: string[],
}
