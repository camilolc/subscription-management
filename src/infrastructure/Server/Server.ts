import express from 'express'
import { CreateAccount } from '../../application/use-cases/account/create-account.use-case';
import { GetAllAcounts } from '../../application/use-cases/account/get-all-acounts.use-case';
import { AccountController } from '../../adapters/controllers/AccountController';
import { InMemoryAccountRepository } from '../db/InMemmoryAccount.repository';
import { InMemorySuscriptionRepository } from '../db/InMemorySuscription.repository';
import { UpdateAccount } from '../../application/use-cases/account/update-account.use-case';
import { SoftDeleteAccount } from '../../application/use-cases/account/soft-delete-account.use-case';
import { SuscriptionController } from '../../adapters/controllers/SuscriptionController';
import { CreateSuscription } from '../../application/use-cases/suscription/create-suscription.use-case';
import { GetAllSuscriptions } from '../../application/use-cases/suscription/get-all-suscriptions.use-case';
import { UpdateSuscription } from '../../application/use-cases/suscription/update-suscription.use-case';
import { SoftDeleteSuscription } from '../../application/use-cases/suscription/soft-delete-suscription.use-case';
import { InMemoryClientRepository } from '../db/InMemoryClient.repository';
import { CreateClient } from '../../application/use-cases/client/create-client.use-case';
import { GetAllClients } from '../../application/use-cases/client/get-all-client.use-case';
import { UpdateClient } from '../../application/use-cases/client/update-client.use-case';
import { SoftDeleteClient } from '../../application/use-cases/client/soft-delete-client.use-case';
import { ClientController } from '../../adapters/controllers/ClientController';
import { InMemoryAddonRepository } from '../db/InMemmoryAddon.repository';
import { CreateAddon } from '../../application/use-cases/addon/create-addon.use-case';
import { GetAddonsQuantityStatus } from '../../application/use-cases/addon/get-addons-quantity-status.use-case';
import { HandleQuantity } from '../../application/use-cases/addon/handle-quantity.use-case';
import { SoftDeleteAddon } from '../../application/use-cases/addon/soft-dalete-addon.use-case';
import { AddonController } from '../../adapters/controllers/AddonController';
import { AddClientToAccount } from '../../application/use-cases/account/add-client-to-account.use-case';
import { AccountRoutes } from '../../adapters/Routes/account.routes';
import { AddonRoutes } from '../../adapters/Routes/addoon.routes';
import { ClientRoutes } from '../../adapters/Routes/client.routes';
import { SuscriptionRoutes } from '../../adapters/Routes/suscription.routes';



export class Server {

    private app = express();

    async start(){

        this.app.use(express.json());
        //DI
        const suscriptionRepository = new InMemorySuscriptionRepository();
        const addonRepository = new InMemoryAddonRepository();
        const createAddonUseCase = new CreateAddon(addonRepository);
        const accountRepository = new InMemoryAccountRepository(suscriptionRepository);
        const createSuscriptionUseCase = new CreateSuscription(suscriptionRepository)        
        const clientRepository = new InMemoryClientRepository(createSuscriptionUseCase,createAddonUseCase);

        //Account
        const createAccountUseCase = new CreateAccount(accountRepository);
        const getAccountsUseCase = new GetAllAcounts(accountRepository);
        const updateAccountUseCase = new UpdateAccount(accountRepository);
        const softDeleteUseCase = new SoftDeleteAccount(accountRepository);
        const addClientToAccountUseCase =  new AddClientToAccount(accountRepository,clientRepository)
        //Suscription
        const getSuscriptionUseCase = new GetAllSuscriptions(suscriptionRepository);
        const updateSuscriptionUseCase = new UpdateSuscription(suscriptionRepository);
        const softDeleteSuscriptionUseCase = new SoftDeleteSuscription(suscriptionRepository);
        //Client
        const createClientUseCase = new CreateClient(clientRepository)
        const getClientUseCase = new GetAllClients(clientRepository);
        const updateClientUseCase = new UpdateClient(clientRepository);
        const softDeleteClientUseCase = new SoftDeleteClient(clientRepository);
        //Addon
        const getAddonsQuantityStatusUseCase = new GetAddonsQuantityStatus(addonRepository);
        const handleQuantityUseCase = new HandleQuantity(addonRepository);
        const softDeleteAddonUseCase = new SoftDeleteAddon(addonRepository);



        //controllles
        const accountController = new AccountController(createAccountUseCase,getAccountsUseCase, updateAccountUseCase,softDeleteUseCase,addClientToAccountUseCase);
        const suscriptionController = new SuscriptionController(createSuscriptionUseCase,getSuscriptionUseCase,updateSuscriptionUseCase,softDeleteSuscriptionUseCase);
        const clientController = new ClientController(createClientUseCase,getClientUseCase,updateClientUseCase,softDeleteClientUseCase);
        const addonController = new AddonController(createAddonUseCase,getAddonsQuantityStatusUseCase,handleQuantityUseCase,softDeleteAddonUseCase);

        // this.app.post('/accounts', (req, res) => accountController.create(req, res));
        // this.app.post('/accounts/addclient', (req, res) => accountController.addClientToAccount(req, res));
        // this.app.get('/accounts', (req, res) => accountController.getAll(req, res));
        // this.app.put('/accounts/:id', (req, res) => accountController.update(req, res));
        // this.app.delete('/accounts/:id', (req, res) => accountController.softDelete(req, res));

        // this.app.get('/suscriptions', (req, res) => suscriptionController.getAll(req, res));
        // this.app.post('/suscriptions', (req, res) => suscriptionController.create(req, res));
        // this.app.put('/suscriptions/:id', (req, res) => suscriptionController.update(req, res));
        // this.app.delete('/suscriptions/:id', (req, res) => suscriptionController.softDelete(req, res));

        // this.app.get('/clients', (req, res) => clientController.getAll(req, res));
        // this.app.post('/clients', (req, res) => clientController.create(req, res));
        // this.app.put('/clients/:id', (req, res) => clientController.update(req, res));
        // this.app.delete('/clients/:id', (req, res) => clientController.softDelete(req, res));

        // this.app.get('/addons', (req, res) => addonController.getAll(req, res));
        // this.app.post('/addons', (req, res) => addonController.create(req, res));
        // this.app.put('/addons', (req, res) => addonController.handleQuantity(req, res));
        // this.app.delete('/addons/:id', (req, res) => addonController.softDelete(req, res));

        this.app.use('/accounts', new AccountRoutes(accountController).router);
        this.app.use('/clients', new ClientRoutes(clientController).router);
        this.app.use('/suscriptions', new SuscriptionRoutes(suscriptionController).router);
        this.app.use('/addons', new AddonRoutes(addonController).router);


        this.app.listen(3000,()=>{

            console.log(`Server running on port ${3000}`)
        })
    }

}