import { Account } from "../../../domain/entities/Account";
import { Subscription } from "../../../domain/entities/Suscription";
import { AccountRepository } from "../../../interfaces/AccountRepository";
import { SuscriptionRepository } from "../../../interfaces/SuscriptionRepository";


export interface CreateSuscriptionUseCase {
    execute( id:string,state:'active' | 'inactive' ): Promise<Subscription>
  } 


export class CreateSuscription implements CreateSuscriptionUseCase{
    constructor(private suscriptionRepository: SuscriptionRepository) {}

  async execute(id: string, state: "active" | "inactive"): Promise<Subscription> {
             const suscription = new Subscription(id, state);
            return await this.suscriptionRepository.create(suscription);
  }

}