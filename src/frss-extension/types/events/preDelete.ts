// export type HasPreDeleteEvents = {
//   preDeleteEvents: PreDeleteEvent[],
// };

// export interface PreDeleteEvent {
//   preDeleteEvent: (event: any, modeling: any) => void,
//   shouldTriggerPreDelete: (event: any) => boolean,
// }

// export const hasPreDeleteEvent = (rules: any):
// rules is HasPreDeleteEvents => {
//   const checkRule = rules as HasPreDeleteEvents;

//   return checkRule.preDeleteEvents !== undefined
//     && checkRule.preDeleteEvents.length > 0;
// };
