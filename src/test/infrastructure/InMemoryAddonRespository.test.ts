import { Addon } from '../../domain/entities/Addon';
import { InMemoryAddonRepository } from '../../infrastructure/db/InMemmoryAddon.repository';

describe('InMemoryAddonRepository', () => {
    let addonRepository: InMemoryAddonRepository;

    beforeEach(() => {
        addonRepository = new InMemoryAddonRepository();
    });

    it('should create an addon', async () => {
        const addon = new Addon('email', 10);
        const createdAddon = await addonRepository.create(addon);

        expect(createdAddon).toEqual(addon);
        expect(await addonRepository.findById(addon.id)).toEqual(addon);
    });

    it('should update an existing addon', async () => {
        const addon = new Addon('sms', 5);
        await addonRepository.create(addon);

        const updatedAddon = new Addon('sms', 15);
        updatedAddon.id = addon.id; // Mantiene el mismo ID para actualizar

        await addonRepository.update(updatedAddon);

        const foundAddon = await addonRepository.findById(addon.id);
        expect(foundAddon).toEqual(updatedAddon);
    });

    it('should find all addons', async () => {
        const addon1 = new Addon('email', 10);
        await addonRepository.create(addon1);

        const addon2 = new Addon('pushNotification', 20);
        await addonRepository.create(addon2);

        const allAddons = await addonRepository.findAll();
        expect(allAddons).toEqual([addon1, addon2]);
    });

    it('should handle quantity of an existing addon', async () => {
        const addon = new Addon('sms', 5);
        await addonRepository.create(addon);

        await addonRepository.handleQuantity(addon.id, 3);
        const foundAddon = await addonRepository.findById(addon.id);

        expect(foundAddon?.assignedQuantity).toBe(8);
    });

});