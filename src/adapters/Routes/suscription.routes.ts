import { Router } from 'express';
import { SuscriptionController } from '../controllers/SuscriptionController';

export class SuscriptionRoutes {
    public router: Router;

    constructor(private suscriptionController: SuscriptionController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', (req, res) => this.suscriptionController.create(req, res));
        this.router.get('/', (req, res) => this.suscriptionController.getAll(req, res));
        this.router.put('/:id', (req, res) => this.suscriptionController.update(req, res));
        this.router.delete('/:id', (req, res) => this.suscriptionController.softDelete(req, res));
    }
}