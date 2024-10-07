import { ClientRepository } from '../../../domain/repositories/ClientRepository';
import { SoftDeleteClient } from '../../../application/use-cases/client/soft-delete-client.use-case';
import { Client } from '../../../domain/entities/Client';
import { Subscription } from '../../../domain/entities/Suscription';

describe('SoftDeleteClient', () => {
    let clientRepository: ClientRepository;
    let softDeleteClient: SoftDeleteClient;

    beforeEach(() => {
        clientRepository = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as ClientRepository; 
        softDeleteClient = new SoftDeleteClient(clientRepository);
    });

    it('should soft delete a client and call the repository', async () => {
        const clientId = 1;
        const subscription = new Subscription('active');
        const client = new Client('John Doe', 'john.doe@example.com', subscription);
       
        (clientRepository.findById as jest.Mock).mockResolvedValue(client);
       
        await softDeleteClient.execute(clientId);
        
        expect(client.isActive).toBe(false);

       
        expect(clientRepository.update).toHaveBeenCalledWith(client);
    });

    it('should throw an error if the client is not found', async () => {
        const clientId = 1;

       
        (clientRepository.findById as jest.Mock).mockResolvedValue(null);

        await expect(softDeleteClient.execute(clientId)).rejects.toThrow('client not found');
    });
});