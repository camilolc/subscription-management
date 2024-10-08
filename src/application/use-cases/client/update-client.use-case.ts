import { Client } from "../../../domain/entities/Client";
import { ClientRepository } from "../../../domain/repositories/ClientRepository";


export interface UpdateClientUseCase{
    execute(id: number, name: string, email:string): Promise<Client>
}

export class UpdateClient implements UpdateClientUseCase {
    constructor(private clientRepository: ClientRepository) { }

    async execute(id: number, name: string, email:string): Promise<Client> {

        const client = await this.clientRepository.findById(id);
        if (!client) throw new Error('client not found');
        client.name = name;
        client.email = email;
        return await this.clientRepository.update(client);
    }
}