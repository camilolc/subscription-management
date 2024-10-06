import { Subscription } from "../domain/entities/Suscription";


export interface SuscriptionRepository {
    create(subscription: Subscription): Promise<Subscription>;
    update(subscription: Subscription): Promise<void>;
    findById(id: string): Promise<Subscription | null>;
    findAll(): Promise<Subscription[] | null>;
}