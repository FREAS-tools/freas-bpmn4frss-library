import { HasAttachmentRule } from './attachment';
import { HasConnectionRule } from './connection';
import { HasCreationRule } from './creation';
import { HasPreCreateEvents } from './events/preCreate';
import { HasPreDeleteEvents } from './events/preDelete';

export type ElementRules = Partial<(
  HasAttachmentRule
  & HasConnectionRule
  & HasCreationRule
  & HasPreCreateEvents
  & HasPreDeleteEvents
)>;
