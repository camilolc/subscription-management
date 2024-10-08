// CreateClient.test.ts
import { ClientRepository } from '../../../domain/repositories/ClientRepository';
import { Subscription } from '../../../domain/entities/Suscription';
import { Addon } from '../../../domain/entities/Addon';
import { Client } from '../../../domain/entities/Client';
import { CreateAddon } from '../../../application/use-cases/addon/create-addon.use-case';
import { CreateClient } from '../../../application/use-cases/client/create-client.use-case';

describe('CreateClient', () => {
    let clientRepository: jest.Mocked<ClientRepository>;
    let createAddonUseCase: jest.Mocked<CreateAddon>;
    let createClientUseCase: CreateClient;
    let subscription: Subscription;
    let addons: Addon[];

    beforeEach(() => {
        clientRepository = {
            create: jest.fn()            
        } as unknown as jest.Mocked<ClientRepository>;

        createAddonUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<CreateAddon>;

        createClientUseCase = new CreateClient(clientRepository, createAddonUseCase);

        subscription = new Subscription("active");
        addons = [
            new Addon('email', 5), 
            new Addon('sms', 10),
        ];
    });

    it('debería crear un cliente con éxito', async () => {
        const client = new Client('Test Client', 'test@example.com', subscription, addons);
        clientRepository.create.mockResolvedValueOnce(client);
        
        createAddonUseCase.execute.mockResolvedValueOnce(addons[0]);
        createAddonUseCase.execute.mockResolvedValueOnce(addons[1]);

        const result = await createClientUseCase.execute('Test Client', 'test@example.com', subscription, addons);

        expect(result).toEqual(client);
        expect(clientRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Test Client',
            email: 'test@example.com',
            subscription: subscription,
            addons: addons,
        }));
        expect(createAddonUseCase.execute).toHaveBeenCalledTimes(2);
        expect(createAddonUseCase.execute).toHaveBeenCalledWith('email', 5);
        expect(createAddonUseCase.execute).toHaveBeenCalledWith('sms', 10);
    });

   
});