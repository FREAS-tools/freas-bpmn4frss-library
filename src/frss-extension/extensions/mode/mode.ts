export enum FrssMode {
  EvidenceView = 'evidence-view',
  Normal = 'normal',
}

export default class FrssModeProvider {
  private frssMode: FrssMode;

  constructor() {
    this.frssMode = FrssMode.Normal;
  }

  get mode() {
    return this.frssMode;
  }

  set mode(mode: FrssMode) {
    this.frssMode = mode;
  }
}
