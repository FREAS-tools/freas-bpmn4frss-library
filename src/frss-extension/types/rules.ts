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

export interface PreCreateRule {
  preCreateRule: (event: any) => void,
  shouldTriggerPreCreate: (event: any) => boolean,
}

export interface PreDeleteRule {
  preDeleteRule: (event: any) => void,
  shouldTriggerPreDelete: (event: any) => boolean,
}

export type ElementAllRules = (
  AttachmentRule
  & ConnectionRule
  & CreationRule
  & PreCreateRule
  & PreDeleteRule
);

export type ElementRules = Partial<ElementAllRules>;

export type HasAttachmentRule = ElementRules & AttachmentRule;

export type HasConnectionRule = ElementRules & ConnectionRule;

export type HasCreationRule = ElementRules & CreationRule;

export type HasPreCreateRule = ElementRules & PreCreateRule;

export type HasPreDeleteRule = ElementRules & PreDeleteRule;

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

export const hasPreCreateRule = (rules: ElementRules):
rules is HasPreCreateRule => {
  const checkRule = rules as HasPreCreateRule;

  return checkRule.preCreateRule !== undefined
    && checkRule.shouldTriggerPreCreate !== undefined;
};

export const hasPreDeleteRule = (rules: ElementRules):
rules is HasPreDeleteRule => {
  const checkRule = rules as HasPreDeleteRule;

  return checkRule.preDeleteRule !== undefined
    && checkRule.shouldTriggerPreDelete !== undefined;
};
