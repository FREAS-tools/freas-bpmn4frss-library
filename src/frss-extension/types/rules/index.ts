import { HasAttachmentRule } from './attachment';
import { HasConnectionRule } from './connection';
import { HasCreationRule } from './creation';
import { HasPreCreateEvents } from './events/preCreate';
import { HasPreDeleteEvents } from './events/preDelete';

export type ElementAllRules = (
  HasAttachmentRule
  & HasConnectionRule
  & HasCreationRule
  & HasPreCreateEvents
  & HasPreDeleteEvents
);

export type ElementRules = Partial<ElementAllRules>;
