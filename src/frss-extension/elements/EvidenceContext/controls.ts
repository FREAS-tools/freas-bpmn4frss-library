// @ts-expect-error
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import {
  FrssCooperativeness,
  type FrssCooperativenessType,
} from '../Cooperativeness/enumeration';
import type { FrssControls, PadEntryData } from '../../types/controls';

const createCooperativenessControl = (): PadEntryData[] => FrssCooperativeness
  .map((cooperativenessMode) => {
    const classNameModifier = (coopMode: FrssCooperativenessType) => {
      switch (coopMode) {
        case 'Cooperative': return 'cooperative';
        case 'SemiCooperative': return 'semi-cooperative';
        case 'NonCooperative': return 'non-cooperative';
        default: return 'cooperative';
      }
    };

    const modifier = classNameModifier(cooperativenessMode);

    return {
      makeActionHandler: ({ modeling }, _properties) => {
        const action = (_event: any, element: any) => {
          modeling.updateProperties(element, {
            cooperativeness: cooperativenessMode,
          });
        };
        return action;
      },
      props: {
        group: 'cooperativeness',
        className: (
          `mark-as mark-as--pool-${modifier}`
        ),
        key: `mark-pool-as.${modifier}`,
        title: `Set Pool's Evidence Context to a ${cooperativenessMode} mode.`,
      },
      show: (element) => (
        is(element, 'bpmn:Participant')
          && element.type !== 'label'
          && element?.businessObject?.cooperativeness === undefined
      ),
    };
  });

const evidenceContextControls: FrssControls = {
  padEntries: [
    ...createCooperativenessControl(),
    {
      show: (element) => (
        is(element, 'bpmn:Participant')
          && element.type !== 'label'
          && element?.businessObject?.cooperativeness !== undefined
      ),
      makeActionHandler: ({ modeling }, _properties) => {
        const action = (_event: any, element: any) => {
          modeling.updateProperties(element, {
            cooperativeness: undefined,
          });
        };

        return action;
      },
      props: {
        group: 'edit',
        key: 'unmark-pool-cooperativeness',
        className: 'unmark',
        title: 'Unset EvidenceContext cooperativeness mode'
               + ' (by default non-cooperative)',
      },
    },
  ],
};

export default evidenceContextControls;
