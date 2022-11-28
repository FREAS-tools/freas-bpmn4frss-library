export type HasPreCreateEvents = {
  preCreateEvents: PreCreateEvent[],
};

export interface PreCreateEvent {
  preCreateEvent: (event: any) => void,
  shouldTriggerPreCreate: (event: any, command: string) => boolean,
}

export const hasPreCreateEvent = (rules: any):
rules is HasPreCreateEvents => {
  const checkRule = rules as HasPreCreateEvents;

  return checkRule.preCreateEvents !== undefined
    && checkRule.preCreateEvents.length > 0;
};
