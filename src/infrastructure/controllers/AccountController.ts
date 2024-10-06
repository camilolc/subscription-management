import { Request, Response } from 'express';
import { CreateAccount } from '../../application/use-cases/account/create-account.use-case';
import { GetAllAcounts } from '../../application/use-cases/account/get-all-acounts.use-case';
import { Account } from '../../domain/entities/Account';
import { UpdateAccount } from '../../application/use-cases/account/update-account.use-case';
import { SoftDeleteAccount } from '../../application/use-cases/account/soft-delete-account.use-case';

export class AccountController {
    constructor(private createAccountUseCase: CreateAccount, private getAllAccountUseCase:GetAllAcounts, private updateAccountUseCase:UpdateAccount, private softDeleteAccountUseCase:SoftDeleteAccount) {}

    async create(req: Request, res: Response) {
        console.log(req.body);
        const { name, type, id,suscription } = req.body;
        const account = await this.createAccountUseCase.execute(id ,name, type,suscription);
        res.status(201).json(account);
    }

    async getAll(req: Request, res: Response){
        let accounts:Account[] = [];

        accounts = await this.getAllAccountUseCase.execute() ?? [];
        res.status(201).json(accounts);
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;            
            const { name, type } = req.body;
            await this.updateAccountUseCase.execute(id, name, type);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async softDelete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.softDeleteAccountUseCase.execute(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}