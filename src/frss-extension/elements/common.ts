/* eslint-disable import/prefer-default-export */
import { bpmn4frssPrefix } from '../common';

export const createIdentifier = (
  name: string,
): string => `${bpmn4frssPrefix}${name}`;
