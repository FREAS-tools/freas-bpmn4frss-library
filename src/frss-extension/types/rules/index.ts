import type { HasAttachmentRule } from './attachment';
import type { HasConnectionRule } from './connection';
import type { HasCreationRule } from './creation';

export type ElementRules = Partial<(
  HasAttachmentRule
  & HasConnectionRule
  & HasCreationRule
)>;
