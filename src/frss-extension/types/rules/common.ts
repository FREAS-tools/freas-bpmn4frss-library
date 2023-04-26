import type { FrssMode } from '../../../editor/types/mode';

export type ShouldTriggerRuleFunction = (
  source: any,
  target: any,
  mode: FrssMode,
) => boolean;

export type RuleFunction<T> = (
  source: any,
  target: any,
  elementRegistry: any,
  identityId?: string
) => T;

export type RuleFunctionWrapper<T> = (
  source: any,
  target: any,
  elementRegistry: any,
  mode: FrssMode,
) => T;
