import type { AnyRuleCheck, Rule } from './common';

export type AttachmentRule = Rule<boolean
| 'attach' | void>;

export type HasAttachmentRule = {
  attachmentRule: AttachmentRule,
  shouldCheckAttachment: AnyRuleCheck,
};

export const hasAttachmentRule = (rules: any):
rules is HasAttachmentRule => {
  const checkRule = rules as HasAttachmentRule;

  return checkRule.attachmentRule !== undefined
    && checkRule.shouldCheckAttachment !== undefined;
};
