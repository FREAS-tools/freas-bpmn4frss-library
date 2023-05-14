// @ts-ignore
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import getOriginatesFrom from './getOriginatesFrom';
import type {
  PropertiesPanelEntryShowContext,
} from '../../../../../../types/controls/propertiesPanel';

const checkOriginatesFromCorrectService = (
  { element }: PropertiesPanelEntryShowContext,
  identifier: string,
): boolean => {
  // check both the potential evidence and the origin of the
  // flow (if there is a message flow coming from a desired
  // timestamp service)
  const originatesFrom = getOriginatesFrom(element);

  const isCorrectService = is(originatesFrom, identifier);

  console.log(isCorrectService);

  return originatesFrom !== undefined
  && isCorrectService;
};

export default checkOriginatesFromCorrectService;
