import { Subscription } from "../../domain/entities/Suscription";


describe('Subscription', () => {
  // Reseteamos el contador antes de cada test


  it('should create a new subscription with incremented id', () => {
    const subscription1 = new Subscription('active');
    const subscription2 = new Subscription('inactive');

    expect(subscription1.id).toBe(1);
    expect(subscription2.id).toBe(2);
  });

  it('should initialize with the correct state and isActive value', () => {
    const subscription = new Subscription('active');

    expect(subscription.state).toBe('active');
    expect(subscription.isActive).toBe(true);
  });

  it('should allow setting the subscription as inactive', () => {
    const subscription = new Subscription('inactive', false);

    expect(subscription.state).toBe('inactive');
    expect(subscription.isActive).toBe(false);
  });

  it('should default isActive to true if not provided', () => {
    const subscription = new Subscription('active');

    expect(subscription.isActive).toBe(true);
  });
});