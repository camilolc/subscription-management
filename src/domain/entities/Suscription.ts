let suscriptionIdCounter = 0;


export class Subscription {
  public id: number;
    constructor(
      public state: 'active' | 'inactive',
      public isActive : boolean = true
    ) {
    this.id = ++ suscriptionIdCounter;
    }
  }