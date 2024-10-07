import { Client } from "../../domain/entities/Client";
import { CreateAddon } from "../../application/use-cases/addon/create-addon.use-case";
import { CreateSuscription } from "../../application/use-cases/suscription/create-suscription.use-case";
import { Addon } from "../../domain/entities/Addon";
import { Subscription } from "../../domain/entities/Suscription";
import { InMemoryClientRepository } from "../../infrastructure/db/InMemoryClient.repository";

describe('InMemoryClientRepository', () => {
    let clientRepository: InMemoryClientRepository;
    let createAddonUseCase: CreateAddon;
    let createSubscriptionUseCase: CreateSuscription;

    beforeEach(() => {
        createAddonUseCase = { execute: jest.fn() } as unknown as CreateAddon;
        createSubscriptionUseCase = { execute: jest.fn() } as unknown as CreateSuscription;
        clientRepository = new InMemoryClientRepository(createSubscriptionUseCase, createAddonUseCase);
    });

    it('should create a client and call CreateSubscription and CreateAddon use cases', async () => {
      
        const subscription = new Subscription("active");
        const addon1 = new Addon('email', 5);
        const addon2 = new Addon('sms', 10)
        const client = new Client("John Doe", "john.doe@example.com", subscription, [addon1, addon2]);
  
        await clientRepository.create(client);
  
        expect(createSubscriptionUseCase.execute).toHaveBeenCalledWith("active");
        expect(createAddonUseCase.execute).toHaveBeenCalledWith("email", 5);
        expect(createAddonUseCase.execute).toHaveBeenCalledWith("sms", 10);
        const foundClient = await clientRepository.findById(client.id);
        expect(foundClient).toEqual(client);
    });

    it('should update a client', async () => {
        const subscription = new Subscription("inactive");
        const client = new Client("Jane Doe", "jane.doe@example.com", subscription, []);
        await clientRepository.create(client);

        const updatedClient = new Client("Jane Smith", "jane.smith@example.com", subscription, []);
        updatedClient.id = client.id;

        await clientRepository.update(updatedClient);

        const foundClient = await clientRepository.findById(client.id);
        expect(foundClient).toEqual(updatedClient);
    });

    it('should return null if client is not found', async () => {
        const client = await clientRepository.findById(999);

        expect(client).toBeNull();
    });

    it('should return all clients', async () => {
        const subscription1 = new Subscription("active");
        const subscription2 = new Subscription("inactive");
        const client1 = new Client("Client One", "client1@example.com", subscription1, []);
        const client2 = new Client("Client Two", "client2@example.com", subscription2, []);
        await clientRepository.create(client1);
        await clientRepository.create(client2);

        const clients = await clientRepository.findAll();

        expect(clients).toEqual([client1, client2]);
    });
});