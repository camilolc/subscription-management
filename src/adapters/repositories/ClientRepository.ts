import { Client } from "../../domain/entities/Client";

export interface ClientRepository {
    create(Client: Client): Promise<Client>;
    update(Client: Client): Promise<Client>;
    findById(id: number): Promise<Client | null>;
    findAll(): Promise<Client[] | null>;
}