import { Request, Response } from 'express';
import { CreateAddon } from '../../application/use-cases/addon/create-addon.use-case';
import { GetAddonsQuantityStatus } from '../../application/use-cases/addon/get-addons-quantity-status.use-case';
import { Addon } from '../../domain/entities/Addon';
import { HandleQuantity } from '../../application/use-cases/addon/handle-quantity.use-case';
import { SoftDeleteAddon } from '../../application/use-cases/addon/soft-dalete-addon.use-case';

export class AddonController {
    constructor(private createAddonUseCase: CreateAddon, private getAddonsQuantityStatusUseCase: GetAddonsQuantityStatus, private handleQuantityUseCase: HandleQuantity, private softDeleteAddonUseCase: SoftDeleteAddon) { }

    async create(req: Request, res: Response) {
        try {
            const { type, assignedQuantity } = req.body;
            if (!type || !assignedQuantity) throw new Error('All fields are required');
            const account = await this.createAddonUseCase.execute(type, assignedQuantity);
            res.status(201).json(account);
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            let addons: Addon[] = [];
            addons = await this.getAddonsQuantityStatusUseCase.execute() ?? [];
            res.status(201).json(addons);
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    async handleQuantity(req: Request, res: Response) {
        try {
            const { id, quantity } = req.body;
            if (!id || !quantity) throw new Error('All fields are required');
            await this.handleQuantityUseCase.execute(id, quantity);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async softDelete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.softDeleteAddonUseCase.execute(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}