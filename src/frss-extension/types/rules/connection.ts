import type { AnyRuleCheck, Rule } from './common';

export type ConnectionRule = Rule<boolean
| { type: string } | void>;

export type HasConnectionRule = {
  connectionRule: ConnectionRule,
  shouldCheckConnection: AnyRuleCheck,
};

export const hasConnectionRule = (rules: any):
rules is HasConnectionRule => {
  const checkRule = rules as HasConnectionRule;

  return checkRule.connectionRule !== undefined
    && checkRule.shouldCheckConnection !== undefined;
};
