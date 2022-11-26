export interface AttachmentRule {
  attachmentRule: (source: any, target: any) => boolean | string | void,
  shouldCheckAttachment: (source: any, target: any) => boolean,
}

export interface ConnectionRule {
  connectionRule: (source: any, target: any) => (boolean
  | { type: string } | void),
  shouldCheckConnection: (source: any, target: any) => boolean,
}

export interface CreationRule {
  creationRule: (source: any, target: any) => boolean | void,
  shouldCheckCreation: (source: any, target: any) => boolean,
}

export type WithPreCreateEvents = {
  preCreateEvents: PreCreateEvent[],
};

export type WithPreDeleteEvents = {
  preDeleteEvents: PreDeleteEvent[],
};

export interface PreCreateEvent {
  preCreateEvent: (event: any) => void,
  shouldTriggerPreCreate: (event: any, command: string) => boolean,
}

export interface PreDeleteEvent {
  preDeleteEvent: (event: any) => void,
  shouldTriggerPreDelete: (event: any) => boolean,
}

export type ElementAllRules = (
  AttachmentRule
  & ConnectionRule
  & CreationRule
  & WithPreCreateEvents
  & WithPreDeleteEvents
);

export type ElementRules = Partial<ElementAllRules>;

export type HasAttachmentRule = ElementRules & AttachmentRule;

export type HasConnectionRule = ElementRules & ConnectionRule;

export type HasCreationRule = ElementRules & CreationRule;

export type HasPreCreateEvents = ElementRules & WithPreCreateEvents;

export type HasPreDeleteEvents = ElementRules & WithPreDeleteEvents;

export const hasAttachmentRule = (rules: ElementRules):
rules is HasAttachmentRule => {
  const checkRule = rules as HasAttachmentRule;

  return checkRule.attachmentRule !== undefined
    && checkRule.shouldCheckAttachment !== undefined;
};

export const hasConnectionRule = (rules: ElementRules):
rules is HasConnectionRule => {
  const checkRule = rules as HasConnectionRule;

  return checkRule.connectionRule !== undefined
    && checkRule.shouldCheckConnection !== undefined;
};

export const hasCreationRule = (rules: ElementRules):
rules is HasCreationRule => {
  const checkRule = rules as HasCreationRule;

  return checkRule.creationRule !== undefined
    && checkRule.shouldCheckCreation !== undefined;
};

export const hasPreCreateEvent = (rules: ElementRules):
rules is HasPreCreateEvents => {
  const checkRule = rules as HasPreCreateEvents;

  return checkRule.preCreateEvents !== undefined
    && checkRule.preCreateEvents.length > 0;
};

export const hasPreDeleteEvent = (rules: ElementRules):
rules is HasPreDeleteEvents => {
  const checkRule = rules as HasPreDeleteEvents;

  return checkRule.preDeleteEvents !== undefined
    && checkRule.preDeleteEvents.length > 0;
};
