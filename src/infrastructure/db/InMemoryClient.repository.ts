import { Client } from "../../domain/entities/Client";
import { ClientRepository } from "../../interfaces/ClientRepository";
import { SuscriptionRepository } from "../../interfaces/SuscriptionRepository";
import { InMemorySuscriptionRepository } from "./InMemorySuscription.repository";



export class InMemoryClientRepository implements ClientRepository {

    constructor(private readonly suscriptionRepository:InMemorySuscriptionRepository){}
    private clients: Client[] = [];    
    
    async create(client: Client): Promise<Client> {
        if(client.subscription) this.suscriptionRepository.create(client.subscription);
        this.clients.push(client);
        return client;
    }
    
    async update(client: Client): Promise<Client> {
        const index = this.clients.findIndex(a => a.id === client.id);
        if (index !== -1) this.clients[index] = client;
        return client;
    }
    
    async findById(id: string): Promise<Client | null> {
        return this.clients.find(client => client.id === id) || null;
    }
    async findAll(): Promise<Client[] | null> {
        return this.clients || null;
    }
  
}