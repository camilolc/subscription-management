import { Account } from "../../../domain/entities/Account";
import { Subscription } from "../../../domain/entities/Suscription";
import { AccountRepository } from "../../../adapters/repositories/AccountRepository";
import { SuscriptionRepository } from "../../../adapters/repositories/SuscriptionRepository";


export interface CreateSuscriptionUseCase {
    execute( state:'active' | 'inactive' ): Promise<Subscription>
  } 


export class CreateSuscription implements CreateSuscriptionUseCase{
    constructor(private suscriptionRepository: SuscriptionRepository) {}

  async execute(state: "active" | "inactive"): Promise<Subscription> {
             const suscription = new Subscription(state);
            return await this.suscriptionRepository.create(suscription);
  }

}