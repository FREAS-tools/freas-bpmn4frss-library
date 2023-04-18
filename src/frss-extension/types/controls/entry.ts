import type { ActionHandler } from './actionHandler';

/**
 * Every resulting `ControlEntry` has an action that is triggered `onClick`
 */
type ControlEntryActions = {
  click: ActionHandler,
  dragstart?: ActionHandler,
};

/**
 * Properties of the control entry, specifiend by the FRSS element module
 */
export type ControlEntryProps = {
  className?: string,
  group: string,
  imageUrl?: any,
  key: string,
  title: string,
};

/**
 * Every control entry has props and actions, which are then mapped into a
 * resulting object for `diagram-js` library to parse
 */
export type ControlEntryPropsAndActions = ControlEntryProps & {
  action: ControlEntryActions,
};

/**
 * Data that are stored in the map, which are then transformed into
 * a resulting `ControlEntry` object
 */
export type ControlEntryData = Omit<ControlEntryPropsAndActions, 'key'>;

/**
 * This is the resulting entry that is used as either a palette
 * or a pad entry; This is passed to the `diagram-js` and either
 * creates or modifies the diagram in some way
 */
export type ControlEntry = {
  [x: string]: ControlEntryData,
};
