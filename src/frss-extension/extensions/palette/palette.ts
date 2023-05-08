/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
import Palette from 'diagram-js/lib/features/palette/Palette';
import { FrssMode } from '../mode/mode';
import type FrssModeProvider from '../mode/mode';

export default class FrssPalette extends Palette {
  static $inject: string[] = [
    'frssModeProvider',
    'injector',
    'eventBus',
    'canvas',
  ];

  frssModeProvider: FrssModeProvider;

  constructor(
    frssModeProvider: FrssModeProvider,
    injector: any,
    eventBus: any,
    canvas: any,
  ) {
    super(eventBus, canvas);
    injector.invoke(Palette, this);
    this.frssModeProvider = frssModeProvider;
  }

  getEntries() {
    switch (this.frssModeProvider.mode) {
      case FrssMode.Normal: {
        return super.getEntries();
      }
      case FrssMode.EvidenceView: {
        return {};
      }
      default: {
        return {};
      }
    }
  }

  update() {
    // eslint-disable-next-line no-underscore-dangle
    super._update();
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
