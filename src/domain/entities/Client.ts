import { Addon } from "./Addon";
import { Subscription } from "./Suscription";

let clientIdCounter = 0;

export class Client {
    public id: number;
    constructor(
      public name: string,
      public email: string,
      public subscription: Subscription,
      public addons: Addon[] = [],
      public isActive = true,
    ) {
        this.id = ++clientIdCounter;
    }
  
    canUseAddons(): boolean {
      return this.subscription.state === 'active';
    }
  }