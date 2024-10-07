import { Account } from "../../../domain/entities/Account";
import { Client } from "../../../domain/entities/Client";
import { Subscription } from "../../../domain/entities/Suscription";
import { AccountRepository } from "../../../interfaces/AccountRepository";
import { ClientRepository } from "../../../interfaces/ClientRepository";



export interface CreateClientUseCase {
  execute(id: string, name: string, email: string, suscription: Subscription): Promise<Client>
}

export class CreateClient implements CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) { }
  async execute(id: string, name: string, email: string, suscription: Subscription): Promise<Client> {
    const client = new Client(id, name, email, suscription);
    return await this.clientRepository.create(client);
  }

}

