import { Client } from "./Client";
import { Subscription } from "./Suscription";

let addonIdCounter = 0;

export class Account {
    public id: number;
    constructor(
      public name: string,
      public type: 'wellness' | 'health',
      public subscription: Subscription,
      public isActive:boolean = true,
      public clients: Client[] = [],
    ) {
        this.id = ++addonIdCounter;
    }
  
  }