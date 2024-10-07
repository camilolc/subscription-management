import { Request, Response } from 'express';
import { CreateAccount } from '../../application/use-cases/account/create-account.use-case';
import { GetAllAcounts } from '../../application/use-cases/account/get-all-acounts.use-case';
import { Account } from '../../domain/entities/Account';
import { UpdateAccount } from '../../application/use-cases/account/update-account.use-case';
import { SoftDeleteAccount } from '../../application/use-cases/account/soft-delete-account.use-case';
import { CreateAddon } from '../../application/use-cases/addon/create-addon.use-case';
import { GetAddonsQuantityStatus } from '../../application/use-cases/addon/get-addons-quantity-status.use-case';
import { Addon } from '../../domain/entities/Addon';
import { HandleQuantity } from '../../application/use-cases/addon/handle-quantity.use-case';
import { SoftDeleteAddon } from '../../application/use-cases/addon/soft-dalete-addon.use-case';


// public id: string,
// public type: 'email' | 'sms' | 'pushNotification',
// public assignedQuantity: number,
// public usedQuantity: number = 0,
// public isActive = true

export class AddonController {
    constructor(private createAddonUseCase: CreateAddon, private getAddonsQuantityStatusUseCase:GetAddonsQuantityStatus, private handleQuantityUseCase:HandleQuantity, private softDeleteAddonUseCase:SoftDeleteAddon) {}

    async create(req: Request, res: Response) {
        console.log(req.body);
        const { id, type,assignedQuantity } = req.body;
        const account = await this.createAddonUseCase.execute(id ,type,assignedQuantity);
        res.status(201).json(account);
    }

    async getAll(req: Request, res: Response){
        let addons:Addon[] = [];
        addons = await this.getAddonsQuantityStatusUseCase.execute() ?? [];
        res.status(201).json(addons);
    }

    async handleQuantity(req: Request, res: Response) {
        try {                    
            const { id, quantity } = req.body;
            await this.handleQuantityUseCase.execute(id,quantity);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async softDelete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.softDeleteAddonUseCase.execute(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}