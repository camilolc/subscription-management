import { Request, Response } from 'express';
import { CreateClient } from '../../application/use-cases/client/create-client.use-case';
import { GetAllClients } from '../../application/use-cases/client/get-all-client.use-case';
import { UpdateClient } from '../../application/use-cases/client/update-client.use-case';
import { SoftDeleteClient } from '../../application/use-cases/client/soft-delete-client.use-case';
import { Client } from '../../domain/entities/Client';



export class ClientController {
    constructor(private createClientUseCase: CreateClient, private getAllClientsUseCase:GetAllClients, private updateClientUseCase:UpdateClient, private softDeleteClientUseCase:SoftDeleteClient) {}

    async create(req: Request, res: Response) {
        console.log(req.body);
        const { id, name, email,suscription } = req.body;
        const client = await this.createClientUseCase.execute(id ,name, email,suscription);
        res.status(201).json(client);
    }

    async getAll(req: Request, res: Response){
        let clients:Client[] = [];

        clients = await this.getAllClientsUseCase.execute() ?? [];
        res.status(201).json(clients);
    }

    async update(req: Request, res: Response) {
        try {           
            const { id } = req.params;            
            const { name, email } = req.body;
            const client = await this.updateClientUseCase.execute(id, name, email);
            res.status(201).json(client);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async softDelete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.softDeleteClientUseCase.execute(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}