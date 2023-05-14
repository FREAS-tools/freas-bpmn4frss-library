/* eslint-disable import/no-extraneous-dependencies */
import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

export default class FrssEvents extends CommandInterceptor {
  static $inject: string[] = [
    'eventBus',
    'injector',
    'modeling',
  ];

  modeling: any;

  constructor(
    eventBus: any,
    injector: any,
    modeling: any,
  ) {
    // replace the original command interceptor with our extended one
    super(eventBus);
    injector.invoke(CommandInterceptor, this);
    this.modeling = modeling;

    // implementation will handle synchronization events and also
    // label creation. However, it is not stable, so it was not included
  }
}
