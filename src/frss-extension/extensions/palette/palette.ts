/* eslint-disable import/no-extraneous-dependencies */
// @ts-expect-error
import Palette from 'diagram-js/lib/features/palette/Palette';

export default class FrssPalette extends Palette {
  static $inject: string[] = [
    'bpmnJs',
    'injector',
    'eventBus',
    'canvas',
  ];

  constructor(injector: any, eventBus: any, canvas: any) {
    super(eventBus, canvas);
    injector.invoke(Palette, this);
  }

  // getEntries() {
  //   switch (this.)
  // }
}
