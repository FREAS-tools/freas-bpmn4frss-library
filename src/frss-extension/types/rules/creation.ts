export type HasCreationRule = {
  creationRule: (source: any, target: any) => boolean | void,
  shouldCheckCreation: (source: any, target: any) => boolean,
};

export const hasCreationRule = (rules: any):
rules is HasCreationRule => {
  const checkRule = rules as HasCreationRule;

  return checkRule.creationRule !== undefined
    && checkRule.shouldCheckCreation !== undefined;
};
