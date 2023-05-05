import type { FrssMode } from '../../extensions/mode/mode';

type RuleFunctionContextBase = {
  source: any,
  target: any,
};

type RuleFunctionContextMode = {
  mode: FrssMode,
};

type RuleFunctionRegistryContext = {
  elementRegistry: any,
};

export type ShouldTriggerRuleFunction = (
  context: RuleFunctionContextBase & RuleFunctionContextMode,
) => boolean;

export type RuleFunction<T> = (
  context: RuleFunctionWrapperContext & {
    identityId?: string,
  },
) => T;

export type RuleFunctionWrapperContext = RuleFunctionContextBase
& RuleFunctionContextMode
& RuleFunctionRegistryContext;

export type RuleFunctionWrapper<T> = (
  context: RuleFunctionWrapperContext
) => T;
