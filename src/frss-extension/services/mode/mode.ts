export enum FrssMode {
  EvidenceView = 'evidence-view',
  Normal = 'normal',
}

/**
 * Simple mode provider for the class - serves to switch different diagram
 * views (the switching is unstable, but this service is already incorporated
 * in the codebase)
 */
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
