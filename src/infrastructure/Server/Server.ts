import express from 'express'
import { CreateAccount } from '../../application/use-cases/account/create-account.use-case';
import { GetAllAcounts } from '../../application/use-cases/account/get-all-acounts.use-case';
import { AccountController } from '../controllers/AccountController';
import { InMemoryAccountRepository } from '../db/InMemmoryAccount.repository';
import { InMemorySuscriptionRepository } from '../db/InMemorySuscription.repository';
import { UpdateAccount } from '../../application/use-cases/account/update-account.use-case';
import { SoftDeleteAccount } from '../../application/use-cases/account/soft-delete-account.use-case';
import { SuscriptionController } from '../controllers/SuscriptionController';
import { CreateSuscription } from '../../application/use-cases/suscription/create-suscription.use-case';
import { GetAllSuscriptions } from '../../application/use-cases/suscription/get-all-suscriptions.use-case';
import { UpdateSuscription } from '../../application/use-cases/suscription/update-suscription.use-case';
import { SoftDeleteSuscription } from '../../application/use-cases/suscription/soft-delete-suscription.use-case';



export class Server {

    private app = express();

    async start(){

        this.app.use(express.json());
        const suscriptionRepository = new InMemorySuscriptionRepository();
        const accountRepository = new InMemoryAccountRepository(suscriptionRepository);
        const createAccountUseCase = new CreateAccount(accountRepository);
        const getAccountsUseCase = new GetAllAcounts(accountRepository);
        const updateAccountUseCase = new UpdateAccount(accountRepository);
        const softDeleteUseCase = new SoftDeleteAccount(accountRepository);

        const createSuscriptionUseCase = new CreateSuscription(suscriptionRepository)
        const getSuscriptionUseCase = new GetAllSuscriptions(suscriptionRepository);
        const updateSuscriptionUseCase = new UpdateSuscription(suscriptionRepository);
        const softDeleteSuscriptionUseCase = new SoftDeleteSuscription(suscriptionRepository);

        const accountController = new AccountController(createAccountUseCase,getAccountsUseCase, updateAccountUseCase,softDeleteUseCase);
        const suscriptionController = new SuscriptionController(createSuscriptionUseCase,getSuscriptionUseCase,updateSuscriptionUseCase,softDeleteSuscriptionUseCase);

        this.app.post('/accounts', (req, res) => accountController.create(req, res));
        this.app.get('/accounts', (req, res) => accountController.getAll(req, res));
        this.app.put('/accounts/:id', (req, res) => accountController.update(req, res));
        this.app.delete('/accounts/:id', (req, res) => accountController.softDelete(req, res));

        this.app.get('/suscriptions', (req, res) => suscriptionController.getAll(req, res));
        this.app.post('/suscriptions', (req, res) => suscriptionController.create(req, res));
        this.app.put('/suscriptions/:id', (req, res) => suscriptionController.update(req, res));
        this.app.delete('/suscriptions/:id', (req, res) => suscriptionController.softDelete(req, res));
        this.app.listen(3000,()=>{


            console.log(`Server running on port ${3000}`)
        })
    }

}