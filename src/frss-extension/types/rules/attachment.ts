export type HasAttachmentRule = {
  attachmentRule: (source: any, target: any) => boolean | string | void,
  shouldCheckAttachment: (source: any, target: any) => boolean,
};

export const hasAttachmentRule = (rules: any):
rules is HasAttachmentRule => {
  const checkRule = rules as HasAttachmentRule;

  return checkRule.attachmentRule !== undefined
    && checkRule.shouldCheckAttachment !== undefined;
};
