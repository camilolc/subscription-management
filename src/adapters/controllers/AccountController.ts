import { Request, Response } from 'express';
import { CreateAccount } from '../../application/use-cases/account/create-account.use-case';
import { GetAllAcounts } from '../../application/use-cases/account/get-all-acounts.use-case';
import { Account } from '../../domain/entities/Account';
import { UpdateAccount } from '../../application/use-cases/account/update-account.use-case';
import { SoftDeleteAccount } from '../../application/use-cases/account/soft-delete-account.use-case';
import { AddClientToAccount } from '../../application/use-cases/account/add-client-to-account.use-case';

export class AccountController {
    constructor(private createAccountUseCase: CreateAccount, private getAllAccountUseCase: GetAllAcounts, private updateAccountUseCase: UpdateAccount, private softDeleteAccountUseCase: SoftDeleteAccount, private addClientToAccountUseCase:AddClientToAccount) { }

    async create(req: Request, res: Response) {
        try {
            const { name, type, suscription } = req.body;
            if (!name || !type || !suscription)throw new Error('All fields are required');
        
            const account = await this.createAccountUseCase.execute(name, type, suscription);
            res.status(201).json(account);
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            let accounts: Account[] = [];
            accounts = await this.getAllAccountUseCase.execute() ?? [];
            res.status(201).json(accounts);
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, type } = req.body;
            if (!name || !type) throw new Error('All fields are required');
            await this.updateAccountUseCase.execute(Number(id), name, type);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async softDelete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.softDeleteAccountUseCase.execute(Number(id));
            res.status(204).send();
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    async addClientToAccount(req:Request, res:Response){
        try {

            const {accountId, clientId} = req.body;
            if (!accountId || !clientId) throw new Error('All fields are required');
            await this.addClientToAccountUseCase.execute(accountId,clientId);
            res.status(200).send();
            
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }
}