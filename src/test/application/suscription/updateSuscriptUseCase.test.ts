import { SuscriptionRepository } from '../../../adapters/repositories/SuscriptionRepository';
import { UpdateSuscription } from '../../../application/use-cases/suscription/update-suscription.use-case';
import { Subscription } from '../../../domain/entities/Suscription';

describe('UpdateSuscription', () => {
    let suscriptionRepository: SuscriptionRepository;
    let updateSuscription: UpdateSuscription;

    beforeEach(() => {
        suscriptionRepository = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as SuscriptionRepository;
        updateSuscription = new UpdateSuscription(suscriptionRepository);
    });

    it('should update a subscription state and call the repository', async () => {
        const id = 1;
        const state = 'inactive';
        const suscription = new Subscription('active');

        (suscriptionRepository.findById as jest.Mock).mockResolvedValue(suscription);

        await updateSuscription.execute(id, state);

        expect(suscriptionRepository.findById).toHaveBeenCalledWith(id);

        expect(suscription.state).toBe(state);

        expect(suscriptionRepository.update).toHaveBeenCalledWith(suscription);
    });

    it('should throw an error if the subscription is not found', async () => {
        const id = 1;
        const state = 'inactive';

        (suscriptionRepository.findById as jest.Mock).mockResolvedValue(null);

        await expect(updateSuscription.execute(id, state)).rejects.toThrow('suscription not found');

        expect(suscriptionRepository.update).not.toHaveBeenCalled();
    });
});