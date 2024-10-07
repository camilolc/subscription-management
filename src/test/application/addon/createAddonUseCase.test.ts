import { AddonRepository } from '../../../domain/repositories/AddonRepository';
import { CreateAddon } from '../../../application/use-cases/addon/create-addon.use-case';
import { Addon } from '../../../domain/entities/Addon';

describe('CreateAddon', () => {
    let addonRepository: AddonRepository;
    let createAddon: CreateAddon;

    beforeEach(() => {
        addonRepository = {
            create: jest.fn(),
        } as unknown as AddonRepository;
        createAddon = new CreateAddon(addonRepository);
    });

    it('should create a new addon', async () => {
        const type: 'email' | 'sms' | 'pushNotification' = 'email';
        const assignedQuantity = 10;

       
        const expectedAddon = new Addon(type, assignedQuantity);
        
        (addonRepository.create as jest.Mock).mockImplementation((addon: Addon) => {
            return new Addon(addon.type, addon.assignedQuantity);
        });

        const result = await createAddon.execute(type, assignedQuantity);
       
        expect(result.type).toBe(expectedAddon.type);
        expect(result.assignedQuantity).toBe(expectedAddon.assignedQuantity);
        expect(result.isActive).toBe(expectedAddon.isActive);
        expect(result.usedQuantity).toBe(expectedAddon.usedQuantity);

    
        expect(addonRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            type: expectedAddon.type,
            assignedQuantity: expectedAddon.assignedQuantity,
            isActive: expectedAddon.isActive,
            usedQuantity: expectedAddon.usedQuantity,
        }));
    });
});