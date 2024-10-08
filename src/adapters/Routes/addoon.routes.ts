import { Router } from 'express';
import { AddonController } from '../controllers/AddonController';

export class AddonRoutes {
    public router: Router;

    constructor(private addonController: AddonController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', (req, res) => this.addonController.create(req, res));
        this.router.get('/', (req, res) => this.addonController.getAll(req, res));
        this.router.put('/', (req, res) => this.addonController.handleQuantity(req, res));
        this.router.delete('/:id', (req, res) => this.addonController.softDelete(req, res));
    }
}