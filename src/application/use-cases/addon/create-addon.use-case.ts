import { Addon } from "../../../domain/entities/Addon";
import { AddonRepository } from "../../../interfaces/AddonRepository";



export interface CreateAddonUseCase {
    execute( type: 'email' | 'sms' | 'pushNotification',assignedQuantity: number): Promise<Addon>
  } 


export class CreateAddon implements CreateAddonUseCase{
    constructor(private addonRepository: AddonRepository) {}
    async execute(type: 'email' | 'sms' | 'pushNotification',assignedQuantity: number): Promise<Addon> {
            const addon = new Addon( type, assignedQuantity);
            return await this.addonRepository.create(addon);
    }
}