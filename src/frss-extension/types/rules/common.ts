export type AnyRuleCheck = (source: any, target: any) => boolean;

export type Rule<T> = (source: any, target: any, identityId?: string) => T;
