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

export interface PreCreateEvent {
  preCreateRule: (event: any) => void,
  shouldTriggerPreCreate: (event: any) => boolean,
}

export interface PreDeleteEvent {
  preDeleteRule: (event: any) => void,
  shouldTriggerPreDelete: (event: any) => boolean,
}

export type ElementAllRules = (
  AttachmentRule
  & ConnectionRule
  & CreationRule
  & PreCreateEvent
  & PreDeleteEvent
);

export type ElementRules = Partial<ElementAllRules>;

export type HasAttachmentRule = ElementRules & AttachmentRule;

export type HasConnectionRule = ElementRules & ConnectionRule;

export type HasCreationRule = ElementRules & CreationRule;

export type HasPreCreateEvent = ElementRules & PreCreateEvent;

export type HasPreDeleteEvent = ElementRules & PreDeleteEvent;

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
rules is HasPreCreateEvent => {
  const checkRule = rules as HasPreCreateEvent;

  return checkRule.preCreateRule !== undefined
    && checkRule.shouldTriggerPreCreate !== undefined;
};

export const hasPreDeleteEvent = (rules: ElementRules):
rules is HasPreDeleteEvent => {
  const checkRule = rules as HasPreDeleteEvent;

  return checkRule.preDeleteRule !== undefined
    && checkRule.shouldTriggerPreDelete !== undefined;
};
