import { Client } from "./Client";
import { Subscription } from "./Suscription";

export class Account {
    constructor(
      public id: string,
      public name: string,
      public type: 'wellness' | 'health',
      public subscription: Subscription,
      public isActive:boolean = true,
      public clients: Client[] = [],
    ) {}
  
    // isActive(): boolean {
    //   return this.subscription.state === 'active';
    // }
  }