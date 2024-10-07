import { AccountRepository } from "../../../interfaces/AccountRepository";
import { ClientRepository } from "../../../interfaces/ClientRepository";


export interface SoftDeleteClientUseCase{
    execute(id: string): Promise<void> 
}

export class SoftDeleteClient implements SoftDeleteClientUseCase {
    constructor(private clientRepository: ClientRepository) { }

    async execute(id: string): Promise<void> {
        const client = await this.clientRepository.findById(id);
        if (!client) throw new Error('client not found');
        client.isActive = false; 
        await this.clientRepository.update(client);
    }
}