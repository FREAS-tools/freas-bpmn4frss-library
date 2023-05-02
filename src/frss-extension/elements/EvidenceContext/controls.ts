// @ts-expect-error
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import {
  FrssCooperativeness,
  type FrssCooperativenessType,
} from '../Cooperativeness/enumeration';
import type { Controls, PadEntryData } from '../../types/controls';

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
        group: 'cooperativeness2',
        className: (
          'set-cooperativeness'
          + ` set-cooperativeness--${modifier}`
        ),
        key: `set-cooperativeness-as.${modifier}`,
        title: `Set Pool's Evidence Context to a ${cooperativenessMode} mode.`,
      },
      show: (element) => (
        is(element, 'bpmn:Participant')
          && element.type !== 'label'
          && element?.businessObject?.cooperativeness === undefined
      ),
    };
  });

const controls: Controls = {
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
        key: 'set-cooperativeness.unset',
        className: 'set-cooperativeness set-cooperativeness--remove',
        title: 'Unmark Pool as Evidence Context',
      },
    },
  ],
};

export default controls;
