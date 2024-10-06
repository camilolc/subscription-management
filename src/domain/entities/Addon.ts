export class Addon {
    constructor(
      public id: string,
      public type: 'email' | 'sms' | 'pushNotification',  // New addon type
      public assignedQuantity: number,
      public usedQuantity: number
    ) {}
  
    useAddon(quantity: number) {
      if (this.assignedQuantity >= this.usedQuantity + quantity) {
        this.usedQuantity += quantity;
      } else {
        throw new Error("Not enough addon quantity.");
      }
    }
  
    getRemainingQuantity(): number {
      return this.assignedQuantity - this.usedQuantity;
    }
  
    isActive(): boolean {
      return this.assignedQuantity > this.usedQuantity;
    }
  }