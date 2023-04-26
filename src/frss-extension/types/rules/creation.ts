import type { ShouldTriggerRuleFunction, RuleFunction } from './common';

export type CreationRule = RuleFunction<boolean>;

export type HasCreationRule = {
  creationRule: CreationRule,
  shouldCheckCreation: ShouldTriggerRuleFunction,
};

export const hasCreationRule = (rules: any):
rules is HasCreationRule => {
  const checkRule = rules as HasCreationRule;

  return checkRule.creationRule !== undefined
    && checkRule.shouldCheckCreation !== undefined;
};
