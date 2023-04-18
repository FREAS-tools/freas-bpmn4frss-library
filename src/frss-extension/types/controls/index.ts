import type { CreateActionHandler } from './actionHandler';
import type { ControlEntryProps } from './entry';

/**
 * Entry data are the basis for creating an entry,
 * they contain a way to make a new action handler -
 */
export type EntryData = {
  /** The function which creates the action handler
   *  (takes in context in providers) */
  makeActionHandler: CreateActionHandler;
  /** Control entry props */
  props: ControlEntryProps;
};

/**
 *
 */
export type PadEntryData = EntryData & {
  /** Checks element type to determine whether the pad entry should be shown */
  show: (element: any) => boolean;
};

export type Controls = {
  /** List of data for (possibly various) pad entries */
  padEntries: PadEntryData[];
  /** Data for the palette "create" entry */
  paletteCreateEntry?: EntryData;
};
