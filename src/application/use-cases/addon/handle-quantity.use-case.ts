import { AddonRepository } from "../../../domain/repositories/AddonRepository";



export interface HandleQuantityUseCase {
    execute(id:number, quantity:number): Promise<void>
  }
  

export class HandleQuantity implements HandleQuantityUseCase {
    constructor(private addonRepository: AddonRepository) {}

    async execute(id:number, quantity:number): Promise<void> {
        return await this.addonRepository.handleQuantity(id,quantity);
    }
}