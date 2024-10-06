import { Account } from "../../../domain/entities/Account";
import { Subscription } from "../../../domain/entities/Suscription";
import { AccountRepository } from "../../../interfaces/AccountRepository";
import { SuscriptionRepository } from "../../../interfaces/SuscriptionRepository";


export interface GetAllSuscriptionsUseCase {
    execute(): Promise<Subscription[] | null>
  }
  

export class GetAllSuscriptions implements GetAllSuscriptionsUseCase {
    constructor(private suscriptionRepository: SuscriptionRepository) {}
    async execute(): Promise<Subscription[] | null> {
        return await this.suscriptionRepository.findAll();
    }
}