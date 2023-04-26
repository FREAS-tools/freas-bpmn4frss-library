import type { ShouldTriggerRuleFunction, RuleFunction } from './common';

export type ConnectionRule = RuleFunction<boolean
| { type: string } | void>;

export type HasConnectionRule = {
  connectionRule: ConnectionRule,
  shouldCheckConnection: ShouldTriggerRuleFunction,
};

export const hasConnectionRule = (rules: any):
rules is HasConnectionRule => {
  const checkRule = rules as HasConnectionRule;

  return checkRule.connectionRule !== undefined
    && checkRule.shouldCheckConnection !== undefined;
};
