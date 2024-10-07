import { Addon } from "../entities/Addon";

export interface AddonRepository {
    create(addon: Addon): Promise<Addon>;
    findById(id: number): Promise<Addon | null>;
    findAll(): Promise<Addon[] | null>;
    update(addon:Addon):Promise<Addon>;
    handleQuantity(id:number, quantity:number) : Promise<void>;
}