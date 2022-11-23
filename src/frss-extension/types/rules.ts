export interface AttachmentRule {
  attachmentRule: (source: any, target: any) => boolean | string,
  shouldCheckAttachment: (source: any, target: any) => boolean,
}

export interface ConnectionRule {
  connectionRule: (source: any, target: any) => (boolean
  | { type: string } | void),
  shouldCheckConnection: (source: any, target: any) => boolean,
}

export interface CreationRule {
  creationRule: (source: any, target: any) => boolean,
  shouldCheckCreation: (source: any, target: any) => boolean,
}

export interface PreCreateRule {
  preCreateTrigger: (element: any) => void,
  shouldTriggerPreCreate: (element: any) => boolean,
}

export interface PreDeleteRule {
  preDeleteTrigger: (element: any) => void,
  shouldTriggerPreDelete: (element: any) => boolean,
}

export type ElementAllRules = (
  AttachmentRule
  & ConnectionRule
  & CreationRule
  & PreCreateRule
  & PreDeleteRule
);

export type ElementRules = Partial<ElementAllRules>;

export type ElementWithAttachmentRule = ElementRules & AttachmentRule;

export type ElementWithConnectionRule = ElementRules & ConnectionRule;

export type ElementWithCreationRule = ElementRules & CreationRule;

export type ElementWithPreCreateRule = ElementRules & PreCreateRule;

export type ElementWithPreDeleteRule = ElementRules & PreDeleteRule;

export const hasAttachmentRule = (rules: ElementRules):
rules is ElementWithAttachmentRule => {
  const checkRule = rules as ElementWithAttachmentRule;

  return checkRule.attachmentRule !== undefined
    && checkRule.shouldCheckAttachment !== undefined;
};

export const hasConnectionRule = (rules: ElementRules):
rules is ElementWithConnectionRule => {
  const checkRule = rules as ElementWithConnectionRule;

  return checkRule.connectionRule !== undefined
    && checkRule.shouldCheckConnection !== undefined;
};

export const hasCreationRule = (rules: ElementRules):
rules is ElementWithCreationRule => {
  const checkRule = rules as ElementWithCreationRule;

  return checkRule.creationRule !== undefined
    && checkRule.shouldCheckCreation !== undefined;
};

export const hasPreCreateRule = (rules: ElementRules):
rules is ElementWithPreCreateRule => {
  const checkRule = rules as ElementWithPreCreateRule;

  return checkRule.preCreateTrigger !== undefined
    && checkRule.shouldTriggerPreCreate !== undefined;
};

export const hasPreDeleteRule = (rules: ElementRules):
rules is ElementWithPreDeleteRule => {
  const checkRule = rules as ElementWithPreDeleteRule;

  return checkRule.preDeleteTrigger !== undefined
    && checkRule.shouldTriggerPreDelete !== undefined;
};
