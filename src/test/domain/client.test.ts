import { Addon } from "../../domain/entities/Addon";
import { Client } from "../../domain/entities/Client";
import { Subscription } from "../../domain/entities/Suscription";


describe("Client class tests", () => {

  it("should create a new client with a unique id", () => {
    const subscription = new Subscription('active');
    const client = new Client('John Doe', 'john@example.com', subscription);

    expect(client.id).toBe(1);
    expect(client.name).toBe('John Doe');
    expect(client.email).toBe('john@example.com');
    expect(client.subscription.state).toBe('active');
    expect(client.addons).toEqual([]);
    expect(client.isActive).toBe(true);
  });

  it("should allow client to use addons if subscription is active", () => {
    const subscription = new Subscription('active');
    const client = new Client('Jane Doe', 'jane@example.com', subscription);
    
    expect(client.canUseAddons()).toBe(true);
  });

  it("should not allow client to use addons if subscription is inactive", () => {
    const subscription = new Subscription('inactive');
    const client = new Client('Jane Doe', 'jane@example.com', subscription);
    
    expect(client.canUseAddons()).toBe(false);
  });

  it("should create a client with addons", () => {
    const subscription = new Subscription('active');
    const emailAddon = new Addon('email', 10);
    const smsAddon = new Addon('sms', 5);

    const client = new Client('John Doe', 'john@example.com', subscription, [emailAddon, smsAddon]);
    
    expect(client.addons.length).toBe(2);
    expect(client.addons[0].type).toBe('email');
    expect(client.addons[1].type).toBe('sms');
  });

  it("should create multiple clients with unique ids", () => {
    const subscription1 = new Subscription('active');
    const subscription2 = new Subscription('inactive');

    const client1 = new Client('John Doe', 'john@example.com', subscription1);
    const client2 = new Client('Jane Doe', 'jane@example.com', subscription2);

    expect(client1.id).toBe(5);
    expect(client2.id).toBe(6);
  });
});