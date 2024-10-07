import { Subscription } from "../../../domain/entities/Suscription";
import { SuscriptionRepository } from "../../../domain/repositories/SuscriptionRepository";


export interface GetAllSuscriptionsUseCase {
    execute(): Promise<Subscription[] | null>
  }
  

export class GetAllSuscriptions implements GetAllSuscriptionsUseCase {
    constructor(private suscriptionRepository: SuscriptionRepository) {}
    async execute(): Promise<Subscription[] | null> {
        return await this.suscriptionRepository.findAll();
    }
}