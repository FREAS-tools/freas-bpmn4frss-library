type EventFunctionContext = {
  elementRegistry: any,
  event: any
};

export type ShouldTriggerEventFunction = (
  context: EventFunctionContext
) => boolean;

export type EventFunction = (context: EventFunctionContext) => void;
