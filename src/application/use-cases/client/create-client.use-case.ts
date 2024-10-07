import { Addon } from "../../../domain/entities/Addon";
import { Client } from "../../../domain/entities/Client";
import { Subscription } from "../../../domain/entities/Suscription";
import { ClientRepository } from "../../../adapters/repositories/ClientRepository";

export interface CreateClientUseCase {
  execute(name: string, email: string, suscription: Subscription, addons:Addon[]): Promise<Client>
}

export class CreateClient implements CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) { }
  async execute(name: string, email: string, suscription: Subscription,addons:Addon[]): Promise<Client> {
    const client = new Client(name, email, suscription,addons);
    return await this.clientRepository.create(client);
  }

}

