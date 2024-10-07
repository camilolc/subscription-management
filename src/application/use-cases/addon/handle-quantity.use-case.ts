import { Addon } from "../../../domain/entities/Addon";
import { AddonRepository } from "../../../interfaces/AddonRepository";



export interface HandleQuantityUseCase {
    execute(id:number, quantity:number): Promise<void>
  }
  

export class HandleQuantity implements HandleQuantityUseCase {
    constructor(private addonRepository: AddonRepository) {}

    async execute(id:number, quantity:number): Promise<void> {
        return await this.addonRepository.handleQuantity(id,quantity);
    }
}