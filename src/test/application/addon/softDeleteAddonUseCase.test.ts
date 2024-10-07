import { AddonRepository } from '../../../adapters/repositories/AddonRepository';
import { SoftDeleteAddon } from '../../../application/use-cases/addon/soft-dalete-addon.use-case';
import { Addon } from '../../../domain/entities/Addon';

describe('SoftDeleteAddon', () => {
    let addonRepository: AddonRepository;
    let softDeleteAddon: SoftDeleteAddon;

    beforeEach(() => {
        addonRepository = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as AddonRepository; 
        softDeleteAddon = new SoftDeleteAddon(addonRepository);
    });

    it('should soft delete an addon', async () => {
        const id = 1; 
        const addon = new Addon('email', 10); 
        addon.id = id;
       
        (addonRepository.findById as jest.Mock).mockResolvedValue(addon);
       
        await softDeleteAddon.execute(id);
       
        expect(addon.isActive).toBe(false);
       
        expect(addonRepository.update).toHaveBeenCalledWith(addon);
    });

    it('should throw an error if the addon is not found', async () => {
        const id = 1;

        (addonRepository.findById as jest.Mock).mockResolvedValue(null);

        await expect(softDeleteAddon.execute(id)).rejects.toThrow('addon not found');

        expect(addonRepository.update).not.toHaveBeenCalled();
    });
});