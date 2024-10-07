import { AddonRepository } from "../../../domain/repositories/AddonRepository";



export interface SoftDeleteAddonUseCase{
    execute(id: number): Promise<void> 
}

export class SoftDeleteAddon implements SoftDeleteAddonUseCase {
    constructor(private addonRepository: AddonRepository) {}

    async execute(id: number): Promise<void> {
        const addon = await this.addonRepository.findById(id);
        if (!addon) throw new Error('addon not found');
        addon.isActive = false; 
        await this.addonRepository.update(addon);
    }
}