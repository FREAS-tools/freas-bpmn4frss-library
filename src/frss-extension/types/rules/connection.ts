export type HasConnectionRule = {
  connectionRule: (source: any, target: any) => (boolean
  | { type: string } | void),
  shouldCheckConnection: (source: any, target: any) => boolean,
};

export const hasConnectionRule = (rules: any):
rules is HasConnectionRule => {
  const checkRule = rules as HasConnectionRule;

  return checkRule.connectionRule !== undefined
    && checkRule.shouldCheckConnection !== undefined;
};
