import type { AnyRuleCheck, Rule } from './common';

export type CreationRule = Rule<boolean>;

export type HasCreationRule = {
  creationRule: CreationRule,
  shouldCheckCreation: AnyRuleCheck,
};

export const hasCreationRule = (rules: any):
rules is HasCreationRule => {
  const checkRule = rules as HasCreationRule;

  return checkRule.creationRule !== undefined
    && checkRule.shouldCheckCreation !== undefined;
};
