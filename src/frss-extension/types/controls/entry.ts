import
{ RenderableElementProps, RenderableElementWithIconProps } from '../props';
import { ActionFunction, NewActionFunction } from './actionFunction';
import ControlsContext from './context';

interface Actions {
  click: ActionFunction,
  dragstart: ActionFunction,
}

export interface EntryProps {
  entryGroup: string,
  imageUrl?: any,
  key: string,
  title: string,
}

/**
 * This is the resulting entry that is used as either a palette
 * or a pad entry; This is passed to the diagram-js and either
 * creates or modifies the diagram in some way
 */
export interface ControlEntry {
  [x: string]: Partial<{
    action: Actions,
    className: string,
    group: string,
    imageUrl: any,
    title: string,
  }>
}

export const collectControlEntries = (
  entries: ControlEntry[],
): ControlEntry => {
  // empty object
  let result: ControlEntry = {};

  // copy the key-value pairs into the object
  entries.forEach((entry: ControlEntry) => {
    result = {
      ...result,
      ...entry,
    };
  });

  // return finished object
  return result;
};

export type NewControlEntry = (
  action: NewActionFunction,
  context: ControlsContext,
  elementProps: RenderableElementProps | RenderableElementWithIconProps,
  entryProps: EntryProps,
) => ControlEntry;
