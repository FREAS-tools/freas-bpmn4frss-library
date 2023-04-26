/* eslint-disable import/no-extraneous-dependencies */
import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import FrssModeProvider, { FrssMode } from '../mode/mode';
import type FrssMultipleDiagramProvider from './switching';
import type FrssModeler from '../../../editor';

export default class FrssDiagramSynchrozizer extends CommandInterceptor {
  static $inject: string[] = [
    'eventBus',
    'injector',
    'bpmnjs',
    'frssModeProvider',
    'modeling',
    'elementFactory',
    'frssMultipleDiagramProvider',
    'subprocessCompatibility',
  ];

  elementFactory: any;

  frssModeler: FrssModeler;

  frssModeProvider: FrssModeProvider;

  frssMultipleDiagramProvider: FrssMultipleDiagramProvider;

  modeling: any;

  subprocessCompatibility: any;

  constructor(
    eventBus: any,
    injector: any,
    bpmnjs: FrssModeler,
    frssModeProvider: FrssModeProvider,
    modeling: any,
    elementFactory: any,
    frssMultipleDiagramProvider: FrssMultipleDiagramProvider,
    subprocessCompatibility: any,
  ) {
    // replace the original command interceptor with our extended one
    super(eventBus);
    injector.invoke(CommandInterceptor, this);

    this.frssModeler = bpmnjs;
    this.modeling = modeling;
    this.elementFactory = elementFactory;
    this.frssModeProvider = frssModeProvider;
    this.frssMultipleDiagramProvider = frssMultipleDiagramProvider;
    this.subprocessCompatibility = subprocessCompatibility;

    this.preExecute('shape.create', (event) => {
      switch (this.frssModeProvider.mode) {
        case FrssMode.Normal: {
          console.log(
            'Processing the normal mode synchronization event',
            event,
          );
          console.log(event);
          break;
        }
        case FrssMode.EvidenceView: {
          console.log('Processing the evidence mode synchronization event');
          break;
        }
        default: {
          throw new Error(
            'This mode is not supported by the FrssDiagramSynchronizer',
          );
        }
      }
    });

    this.preExecute('shape.delete', (event) => {
      console.log(event);
    });
  }
}
