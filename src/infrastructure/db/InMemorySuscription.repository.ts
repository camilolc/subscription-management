import { Subscription } from "../../domain/entities/Suscription";
import { SuscriptionRepository } from "../../adapters/repositories/SuscriptionRepository";



export class InMemorySuscriptionRepository implements SuscriptionRepository {
    private subscriptions: Subscription[] = [];    
    
    async create(subscription: Subscription): Promise<Subscription> {
        this.subscriptions.push(subscription);
        return subscription;
    }
    
    async update(subscription: Subscription): Promise<void> {
        const index = this.subscriptions.findIndex(a => a.id === subscription.id);
        if (index !== -1) this.subscriptions[index] = subscription;
    }
    
    async findById(id: number): Promise<Subscription | null> {
        return this.subscriptions.find(subscription => subscription.id === id) || null;
    }
    async findAll(): Promise<Subscription[] | null> {
        return this.subscriptions || null;
    }
  
}