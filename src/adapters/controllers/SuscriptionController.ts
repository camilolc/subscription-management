import { Request, Response } from 'express';
import { GetAllSuscriptions } from '../../application/use-cases/suscription/get-all-suscriptions.use-case';
import { UpdateSuscription } from '../../application/use-cases/suscription/update-suscription.use-case';
import { SoftDeleteSuscription } from '../../application/use-cases/suscription/soft-delete-suscription.use-case';
import { CreateSuscription } from '../../application/use-cases/suscription/create-suscription.use-case';
import { Subscription } from '../../domain/entities/Suscription';

export class SuscriptionController {
    constructor(private createSuscriptionUseCase: CreateSuscription,
        private getAllSuscriptionUseCase: GetAllSuscriptions,
        private updateSuscriptionUseCase: UpdateSuscription,
        private softDeleteSuscriptionUseCase: SoftDeleteSuscription
    ) { }

    async create(req: Request, res: Response) {
        try {
            const { state } = req.body;
            if (!state) throw new Error('All fields are required');
            const suscription = await this.createSuscriptionUseCase.execute(state);
            res.status(201).json(suscription);
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    async getAll(req: Request, res: Response) {

        try {
            let suscriptions: Subscription[] = [];
            suscriptions = await this.getAllSuscriptionUseCase.execute() ?? [];
            res.status(201).json(suscriptions);
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { state } = req.body;
            if (!state) throw new Error('All fields are required');
            await this.updateSuscriptionUseCase.execute(Number(id), state);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async softDelete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.softDeleteSuscriptionUseCase.execute(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}