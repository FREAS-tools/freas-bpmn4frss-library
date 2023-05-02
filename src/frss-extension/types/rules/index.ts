import type { HasAttachmentRule } from './attachment';
import type { HasConnectionRule } from './connection';
import type { HasCreationRule } from './creation';

export type FrssElementRules = Partial<(
  HasAttachmentRule
  & HasConnectionRule
  & HasCreationRule
)>;
