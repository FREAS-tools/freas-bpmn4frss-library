import type { FrssEvents } from '.';
import type { EventFunction, ShouldTriggerEventFunction } from './common';

export type DeletionEvent = {
  deletionEvent: EventFunction,
  shouldTriggerDeletion: ShouldTriggerEventFunction,
};

export type HasDeletionEvent = {
  deletionEvents: DeletionEvent[],
};

export const hasDeletionEvent = (
  events: FrssEvents,
): events is HasDeletionEvent => {
  const checkEvent = events as HasDeletionEvent;

  return checkEvent.deletionEvents !== undefined
    && checkEvent.deletionEvents.length !== 0;
};
