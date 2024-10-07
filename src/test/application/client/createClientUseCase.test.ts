import { Client } from '../../../domain/entities/Client';
import { Subscription } from '../../../domain/entities/Suscription';
import { Addon } from '../../../domain/entities/Addon';
import { ClientRepository } from '../../../domain/repositories/ClientRepository';
import { CreateClient } from '../../../application/use-cases/client/create-client.use-case';

describe('CreateClient', () => {
    let clientRepository: ClientRepository;
    let createClient: CreateClient;

    beforeEach(() => {
        clientRepository = {
            create: jest.fn(),
        } as unknown as ClientRepository; // Mocking ClientRepository
        createClient = new CreateClient(clientRepository);
        
    });

    it('should create a client and call the repository', async () => {
        const name = 'John Doe';
        const email = 'john.doe@example.com';
        const subscription = new Subscription('active');
        const addons: Addon[] = [new Addon('email', 10)];
    
        const expectedClient = new Client(name, email, subscription, addons);
    
        (clientRepository.create as jest.Mock).mockResolvedValue(expectedClient);
    
        const client = await createClient.execute(name, email, subscription, addons);
    
        expect(clientRepository.create).toHaveBeenCalled();
        
        expect(client).toMatchObject({
            name: expectedClient.name,
            email: expectedClient.email,
            subscription: expectedClient.subscription,
            addons: expectedClient.addons,
        });
    });
});