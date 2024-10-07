import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';

export class AccountRoutes {
    public router: Router;

    constructor(private accountController: AccountController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', (req, res) => this.accountController.create(req, res));
        this.router.post('/addclient', (req, res) => this.accountController.addClientToAccount(req, res));
        this.router.get('/', (req, res) => this.accountController.getAll(req, res));
        this.router.put('/:id', (req, res) => this.accountController.update(req, res));
        this.router.delete('/:id', (req, res) => this.accountController.softDelete(req, res));
    }
}