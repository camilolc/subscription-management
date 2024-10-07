export class Subscription {
    constructor(
      public id: string,
      public state: 'active' | 'inactive',
      public isActive : boolean = true
    ) {}
  }