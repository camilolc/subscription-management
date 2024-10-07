import { ClientRepository } from '../../../domain/repositories/ClientRepository';
import { UpdateClient } from '../../../application/use-cases/client/update-client.use-case';
import { Client } from '../../../domain/entities/Client';
import { Subscription } from '../../../domain/entities/Suscription';

describe('UpdateClient', () => {
    let clientRepository: ClientRepository;
    let updateClient: UpdateClient;

    beforeEach(() => {
        clientRepository = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as ClientRepository;
        updateClient = new UpdateClient(clientRepository);
    });

    it('should update a client and call the repository', async () => {
        const clientId = 1;
        const subscription = new Subscription('active');
        const client = new Client('John Doe', 'john.doe@example.com', subscription);

    
        (clientRepository.findById as jest.Mock).mockResolvedValue(client);
        (clientRepository.update as jest.Mock).mockResolvedValue(client);

        const updatedName = 'Jane Doe';
        const updatedEmail = 'jane.doe@example.com';
   
        const result = await updateClient.execute(clientId, updatedName, updatedEmail);
   
        expect(client.name).toBe(updatedName);
        expect(client.email).toBe(updatedEmail);
    
        expect(clientRepository.update).toHaveBeenCalledWith(client);
        expect(result).toBe(client); 
    });

    it('should throw an error if the client is not found', async () => {
        const clientId = 1;
       
        (clientRepository.findById as jest.Mock).mockResolvedValue(null);

        await expect(updateClient.execute(clientId, 'Some Name', 'some.email@example.com')).rejects.toThrow('client not found');
    });
});