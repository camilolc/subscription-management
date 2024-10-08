import { Addon } from "../../../domain/entities/Addon";
import { Client } from "../../../domain/entities/Client";
import { Subscription } from "../../../domain/entities/Suscription";
import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { CreateAddon } from "../addon/create-addon.use-case";

export interface CreateClientUseCase {
  execute(name: string, email: string, suscription: Subscription, addons:Addon[]): Promise<Client>
}

export class CreateClient implements CreateClientUseCase {
  constructor(private clientRepository: ClientRepository, private createAddonUseCase:CreateAddon) { }
  async execute(name: string, email: string, suscription: Subscription,addons:Addon[]): Promise<Client> {

    let addonsToCreate:Addon[] = [];
    // const adds = addons.map(addon => new Addon(addon.type, addon.assignedQuantity))
    addons.map(addon=> this.createAddonUseCase.execute(addon.type, addon.assignedQuantity).then(value=> addonsToCreate.push(value)))
    const client = new Client(name, email, suscription,addonsToCreate);
    return await this.clientRepository.create(client);
  }

}

