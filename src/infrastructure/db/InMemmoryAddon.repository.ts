import { Addon } from "../../domain/entities/Addon";
import { AddonRepository } from "../../domain/repositories/AddonRepository";

export class InMemoryAddonRepository implements AddonRepository {

    private addons: Addon[] = [];

    async create(addon: Addon): Promise<Addon> {
        this.addons.push(addon);
        return addon;
    }

    async findById(id: number): Promise<Addon | null> {
        return this.addons.find(addon => addon.id === id) || null;
    }
    async findAll(): Promise<Addon[] | null> {
        return this.addons.filter(addon=> addon.isActive);
    }
    async update(addon: Addon): Promise<Addon> {
        const index = this.addons.findIndex(a => a.id === addon.id);
        if (index !== -1) this.addons[index] = addon;

        return addon;
    }
    async handleQuantity(id: number, quantity: number): Promise<void> {

        const addon = this.addons.find(addon => addon.id === id);
        if (addon) {
            addon.handleQuantity(quantity);
        }
    }
}