import { AccountRepository } from "../../../interfaces/AccountRepository";
import { SuscriptionRepository } from "../../../interfaces/SuscriptionRepository";


export interface SoftDeleteSuscriptionUseCase{
    execute(id: string): Promise<void> 
}

export class SoftDeleteSuscription implements SoftDeleteSuscriptionUseCase {
    constructor(private suscriptionRepository: SuscriptionRepository) {}

    async execute(id: string): Promise<void> {
        const suscription = await this.suscriptionRepository.findById(id);
        if (!suscription) throw new Error('Account not found');
        suscription.isActive = false; 
        await this.suscriptionRepository.update(suscription);
    }
}