import { Account } from "../../domain/entities/Account";
import { Addon } from "../../domain/entities/Addon";
import { AccountRepository } from "../../interfaces/AccountRepository";
import { AddonRepository } from "../../interfaces/AddonRepository";
import { InMemorySuscriptionRepository } from "./InMemorySuscription.repository";



export class InMemoryAddonRepository implements AddonRepository {


    private addons: Addon[] = [];


    async create(addon: Addon): Promise<Addon> {
        this.addons.push(addon);
        return addon;
    }

    async findById(id: string): Promise<Addon | null> {
        return this.addons.find(addon => addon.id === id) || null;
    }
    async findAll(): Promise<Addon[] | null> {
        return this.addons;
    }
    async update(addon: Addon): Promise<Addon> {
        const index = this.addons.findIndex(a => a.id === addon.id);
        if (index !== -1) this.addons[index] = addon;

        return addon;
    }
    async handleQuantity(id: string, quantity: number): Promise<void> {

        const addon = this.addons.find(addon => addon.id === id) || null;
        addon?.handleQuantity(quantity);        
    }

}