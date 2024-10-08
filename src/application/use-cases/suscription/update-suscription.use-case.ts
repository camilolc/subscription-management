import { SuscriptionRepository } from "../../../domain/repositories/SuscriptionRepository";


export interface UpdateSuscriptionUseCase{
    execute(id:number,state:'active' | 'inactive'): Promise<void>
}

export class UpdateSuscription implements UpdateSuscriptionUseCase {
    constructor(private suscriptionRepository: SuscriptionRepository) {}

   async execute(id: number, state: "active" | "inactive"): Promise<void> {
        const suscription = await this.suscriptionRepository.findById(id);
        if (!suscription) throw new Error('suscription not found');
        suscription.state = state;
        await this.suscriptionRepository.update(suscription);
    } 
}