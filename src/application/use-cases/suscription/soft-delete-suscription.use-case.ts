import { SuscriptionRepository } from "../../../adapters/repositories/SuscriptionRepository";


export interface SoftDeleteSuscriptionUseCase{
    execute(id: number): Promise<void> 
}

export class SoftDeleteSuscription implements SoftDeleteSuscriptionUseCase {
    constructor(private suscriptionRepository: SuscriptionRepository) {}

    async execute(id: number): Promise<void> {
        const suscription = await this.suscriptionRepository.findById(id);
        if (!suscription) throw new Error('Account not found');
        suscription.isActive = false; 
        await this.suscriptionRepository.update(suscription);
    }
}