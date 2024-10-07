import { Addon } from "../domain/entities/Addon";

export interface AddonRepository {
    create(addon: Addon): Promise<Addon>;
    findById(id: string): Promise<Addon | null>;
    findAll(): Promise<Addon[] | null>;
    update(addon:Addon):Promise<Addon>;
    handleQuantity(id:string, quantity:number) : Promise<void>;
}