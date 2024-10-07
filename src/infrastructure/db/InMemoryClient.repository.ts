import { CreateAddon } from "../../application/use-cases/addon/create-addon.use-case";
import { Client } from "../../domain/entities/Client";
import { ClientRepository } from "../../adapters/repositories/ClientRepository";
import { CreateSuscription } from "../../application/use-cases/suscription/create-suscription.use-case";



export class InMemoryClientRepository implements ClientRepository {

    constructor(private readonly suscriptionRepository:CreateSuscription, private addonRepository:CreateAddon){}
    private clients: Client[] = [];    
    
    async create(client: Client): Promise<Client> {
        if(client.subscription) this.suscriptionRepository.execute(client.subscription.state);
        if(client.addons) client.addons.map(addon=> this.addonRepository.execute(addon.type,addon.assignedQuantity));
        this.clients.push(client);
        return client;
    }
    
    async update(client: Client): Promise<Client> {
        const index = this.clients.findIndex(a => a.id === client.id);
        if (index !== -1) this.clients[index] = client;
        return client;
    }
    
    async findById(id: number): Promise<Client | null> {
        return this.clients.find(client => client.id === id) || null;
    }
    async findAll(): Promise<Client[] | null> {
        return this.clients || null;
    }
  
}