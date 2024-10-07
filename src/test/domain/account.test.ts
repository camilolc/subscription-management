import { Account } from "../../domain/entities/Account";
import { Client } from "../../domain/entities/Client";
import { Subscription } from "../../domain/entities/Suscription";


describe('Account', () => {

  it('should create a new account with incremented id', () => {
    const subscription = new Subscription('active');
    const account1 = new Account('Account 1', 'wellness', subscription);
    const account2 = new Account('Account 2', 'health', subscription);

    expect(account1.id).toBe(1);
    expect(account2.id).toBe(2);
  });

  it('should initialize with the correct name, type, and isActive value', () => {
    const subscription = new Subscription('active');
    const account = new Account('Test Account', 'wellness', subscription);

    expect(account.name).toBe('Test Account');
    expect(account.type).toBe('wellness');
    expect(account.isActive).toBe(true);
  });

  it('should allow adding clients to the account', () => {
    const subscription = new Subscription('active');
    const account = new Account('Test Account', 'wellness', subscription);
    const client1 = new Client('Client 1', 'client1@example.com', subscription);
    const client2 = new Client('Client 2', 'client2@example.com', subscription);
    
    account.clients.push(client1);
    account.clients.push(client2);

    expect(account.clients.length).toBe(2);
    expect(account.clients[0].name).toBe('Client 1');
    expect(account.clients[1].name).toBe('Client 2');
  });

  it('should initialize with an empty clients array if not provided', () => {
    const subscription = new Subscription('active');
    const account = new Account('Test Account', 'wellness', subscription);

    expect(account.clients).toEqual([]);
  });
});