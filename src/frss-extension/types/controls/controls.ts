import { NewActionFunction } from './actionFunction';
import { EntryProps } from './entry';

export interface EntryData {
  /** The pad entry action */
  action: NewActionFunction,
  /** Pad entry props */
  entryProps: EntryProps,
}

export interface PadEntryData extends EntryData {
  /** Element identifiers on which the pad entry should be shown */
  showOnElements: string[],
}

export interface Controls {
  /** Data for the palette "create" entry */
  createEntry?: EntryData,
  /** List of data for (possibly various) pad entries */
  padEntries: PadEntryData[],
}
