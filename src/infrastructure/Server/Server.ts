import express from 'express'
import { CreateAccount } from '../../application/use-cases/account/create-account.use-case';
import { GetAllAcounts } from '../../application/use-cases/account/get-all-acounts.use-case';
import { AccountController } from '../controllers/AccountController';
import { InMemoryAccountRepository } from '../db/InMemmoryAccount.repository';
import { InMemorySuscriptionRepository } from '../db/InMemorySuscription.repository';
import { UpdateAccount } from '../../application/use-cases/account/update-account.use-case';
import { SoftDeleteAccount } from '../../application/use-cases/account/soft-delete-account.use-case';



export class Server {

    private app = express();

    async start(){

        this.app.use(express.json());
        const inMemorySuscriptionRepository = new InMemorySuscriptionRepository();
        const accountRepository = new InMemoryAccountRepository(inMemorySuscriptionRepository);
        const createAccountUseCase = new CreateAccount(accountRepository);
        const getAccountsUseCase = new GetAllAcounts(accountRepository);
        const updateAccountUseCase = new UpdateAccount(accountRepository);
        const softDeleteUseCase = new SoftDeleteAccount(accountRepository);
        const accountController = new AccountController(createAccountUseCase,getAccountsUseCase, updateAccountUseCase,softDeleteUseCase);

        this.app.post('/accounts', (req, res) => accountController.create(req, res));
        this.app.get('/accounts', (req, res) => accountController.getAll(req, res));
        this.app.put('/accounts/:id', (req, res) => accountController.update(req, res));
        this.app.delete('/accounts/:id', (req, res) => accountController.softDelete(req, res));
        this.app.listen(3000,()=>{


            console.log(`Server running on port ${3000}`)
        })
    }

}