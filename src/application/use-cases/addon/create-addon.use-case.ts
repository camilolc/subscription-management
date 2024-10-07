import { Addon } from "../../../domain/entities/Addon";
import { AddonRepository } from "../../../interfaces/AddonRepository";



export interface CreateAddonUseCase {
    execute( id:string,type: 'email' | 'sms' | 'pushNotification',assignedQuantity: number): Promise<Addon>
  } 


export class CreateAddon implements CreateAddonUseCase{
    constructor(private addonRepository: AddonRepository) {}
    async execute(id:string,type: 'email' | 'sms' | 'pushNotification',assignedQuantity: number): Promise<Addon> {
            const addon = new Addon(id, type, assignedQuantity);
            return await this.addonRepository.create(addon);
    }
}