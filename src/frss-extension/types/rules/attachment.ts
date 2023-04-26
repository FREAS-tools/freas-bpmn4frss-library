import type { ShouldTriggerRuleFunction, RuleFunction } from './common';

export type AttachmentRule = RuleFunction<boolean
| 'attach' | void>;

export type HasAttachmentRule = {
  attachmentRule: AttachmentRule,
  shouldCheckAttachment: ShouldTriggerRuleFunction,
};

export const hasAttachmentRule = (rules: any):
rules is HasAttachmentRule => {
  const checkRule = rules as HasAttachmentRule;

  return checkRule.attachmentRule !== undefined
    && checkRule.shouldCheckAttachment !== undefined;
};
