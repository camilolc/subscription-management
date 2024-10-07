export class Addon {
  constructor(
    public id: string,
    public type: 'email' | 'sms' | 'pushNotification',
    public assignedQuantity: number,
    public usedQuantity: number = 0,
    public isActive = true
  ) { }

  useAddon() {
    if (this.assignedQuantity >= this.usedQuantity + 1) {
      this.usedQuantity += 1;
    } else {
      throw new Error("Not enough addon quantity.");
    }
  }

  getRemainingQuantity(): number {
    return this.assignedQuantity - this.usedQuantity;
  }

  handleQuantity(quantity: number) {

    if (this.assignedQuantity + quantity > 0) {
      this.assignedQuantity += quantity
    } else {
      throw new Error("Not enough addon quantity.");
    }


  }

  // isActive(): boolean {
  //   return this.assignedQuantity > this.usedQuantity;
  // }
}