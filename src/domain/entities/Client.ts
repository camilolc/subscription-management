import { Addon } from "./Addon";
import { Subscription } from "./Suscription";

export class Client {
    constructor(
      public id: string,
      public name: string,
      public email: string,
      public subscription: Subscription,
      public addons: Addon[] = []
    ) {}
  
    canUseAddons(): boolean {
      return this.subscription.state === 'active';
    }
  }