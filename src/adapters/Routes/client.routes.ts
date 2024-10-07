import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';

export class ClientRoutes {
    public router: Router;

    constructor(private clientController: ClientController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', (req, res) => this.clientController.create(req, res));
        this.router.get('/', (req, res) => this.clientController.getAll(req, res));
        this.router.put('/:id', (req, res) => this.clientController.update(req, res));
        this.router.delete('/:id', (req, res) => this.clientController.softDelete(req, res));
    }
}