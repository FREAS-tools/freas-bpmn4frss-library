// // @ts-ignore
// // eslint-disable-next-line import/no-extraneous-dependencies
// import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
// import { FRSS_PRIORITY } from '../../common';
// import { preCreateEvents, preDeleteEvents } from '../../elements';
// import { PreCreateEvent } from '../../types/rules/events/preCreate';
// import { PreDeleteEvent } from '../../types/rules/events/preDelete';

// /**
// * This adds further processing logic when a custom connection is created.
// * It properly hooks all the properties.
// */
// export default class FrssCustomEvents extends CommandInterceptor {
//   static $inject: string[];

//   modeling: any;

//   constructor(eventBus: any, injector: any, modeling: any) {
//     super(eventBus);
//     injector.invoke(CommandInterceptor, this);
//     this.modeling = modeling;

//     /* The TS ignore is needed to compensate for the way
//      * the camunda team wrote this part of diagram-js.
//      * Whenever I tried to induce TypeScript
//      * into the question, the whole lib just fell apart. Therefore,
//      * this injection of the preExecute hook is unchecked and I doubt
//      * I will find a way to make this work in TypeScript
//      */
//     // @ts-ignore
//     this.preExecute('connection.create', FRSS_PRIORITY, (event: any) => {
//       // check if this event (with element) has a suitable pre-create rule
//       const ruleForElementExists
//       : PreCreateEvent | undefined = preCreateEvents
//         .find(
//           (rule) => rule.shouldTriggerPreCreate(event, 'connection.create'),
//         );

//       // event (concerning this element) has no rule
//       if (!ruleForElementExists) return;

//       // trigger the rule if it exists
//       ruleForElementExists.preCreateEvent(event);
//     });

//     // @ts-ignore
//     this.preExecute('shape.delete', FRSS_PRIORITY, (event: any) => {
//       const ruleForElementExists: PreDeleteEvent | undefined = preDeleteEvents
//         .find((rule) => rule.shouldTriggerPreDelete(event));

//       if (!ruleForElementExists) return;

//       ruleForElementExists.preDeleteEvent(event, modeling);
//     });
//   }
// }

// FrssCustomEvents.$inject = ['eventBus', 'injector', 'modeling'];
