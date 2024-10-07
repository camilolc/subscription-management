import { Subscription } from "../entities/Suscription";


export interface SuscriptionRepository {
    create(subscription: Subscription): Promise<Subscription>;
    update(subscription: Subscription): Promise<void>;
    findById(id: number): Promise<Subscription | null>;
    findAll(): Promise<Subscription[] | null>;
}