let addonIdCounter = 0;

export class Addon {

  public id: number;
  constructor(
    public type: 'email' | 'sms' | 'pushNotification',
    public assignedQuantity: number,
    public usedQuantity: number = 0,
    public isActive = true
  ) {
    this.id = ++addonIdCounter;
   }

  useAddon() {
    if (this.assignedQuantity >= this.usedQuantity + 1 && this.isActive) {
      this.usedQuantity += 1;
    } else {
      throw new Error("Not enough addon quantity.");
    }
  }

  getRemainingQuantity(): number {
    return this.assignedQuantity - this.usedQuantity;
  }

  handleQuantity(quantity: number) {

    if (this.assignedQuantity + quantity > 0 && this.isActive) {
      this.assignedQuantity += quantity
    } else {
      throw new Error("Not enough addon quantity.");
    }

  }

}