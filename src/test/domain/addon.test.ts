import { Addon } from "../../domain/entities/Addon";

describe('Addon Entity', () => {  

  it("should create a new addon with a unique id", () => {
    const addon = new Addon('email', 10);
    expect(addon.id).toBe(1);
    expect(addon.type).toBe('email');
    expect(addon.assignedQuantity).toBe(10);
    expect(addon.usedQuantity).toBe(0);
    expect(addon.isActive).toBe(true);
  });

  it("should increment usedQuantity when useAddon is called", () => {
    const addon = new Addon('sms', 5);
    addon.useAddon();
    expect(addon.usedQuantity).toBe(1);
  });

  it("should throw an error if not enough quantity to use", () => {
    const addon = new Addon('pushNotification', 1);
    addon.useAddon(); 
    expect(() => addon.useAddon()).toThrow("Not enough addon quantity.");
  });

  it("should return the correct remaining quantity", () => {
    const addon = new Addon('email', 10, 3); 
    expect(addon.getRemainingQuantity()).toBe(7);
  });

  it("should handle quantity updates correctly", () => {
    const addon = new Addon('email', 10);
    addon.handleQuantity(-3); 
    expect(addon.assignedQuantity).toBe(7);
  });

  it("should throw an error if trying to reduce the quantity below 0", () => {
    const addon = new Addon('sms', 5);
    expect(() => addon.handleQuantity(-10)).toThrow("Not enough addon quantity.");
  });

  it("should throw an error if trying to use addon when inactive", () => {
    const addon = new Addon('email', 5);
    addon.isActive = false; 
    expect(() => addon.useAddon()).toThrow("Not enough addon quantity.");
  });

});