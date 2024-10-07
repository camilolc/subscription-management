import { SuscriptionRepository } from '../../../domain/repositories/SuscriptionRepository';
import { CreateSuscription } from '../../../application/use-cases/suscription/create-suscription.use-case';
import { Subscription } from '../../../domain/entities/Suscription';

describe('CreateSuscription', () => {
    let suscriptionRepository: SuscriptionRepository;
    let createSuscription: CreateSuscription;

    beforeEach(() => {
        suscriptionRepository = {
            create: jest.fn(),
        } as unknown as SuscriptionRepository;
        createSuscription = new CreateSuscription(suscriptionRepository);
    });

    it('should create a subscription and call the repository', async () => {
        const state: 'active' | 'inactive' = 'active';
        const subscription = new Subscription(state);

        (suscriptionRepository.create as jest.Mock).mockResolvedValue(subscription);

        const result = await createSuscription.execute(state);

        expect(suscriptionRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            state: state,
        }));

        expect(result).toBe(subscription);
    });
});