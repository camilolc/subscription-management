import { Client } from "./Client";
import { Subscription } from "./Suscription";

let accountIdCounter = 0;

export class Account {
    public id: number;
    constructor(
      public name: string,
      public type: 'wellness' | 'health',
      public subscription: Subscription,
      public isActive:boolean = true,
      public clients: Client[] = [],
    ) {
        this.id = ++accountIdCounter;
    }
  
  }