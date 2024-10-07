import { SuscriptionRepository } from '../../../domain/repositories/SuscriptionRepository';
import { SoftDeleteSuscription } from '../../../application/use-cases/suscription/soft-delete-suscription.use-case';
import { Subscription } from '../../../domain/entities/Suscription';

describe('SoftDeleteSuscription', () => {
    let suscriptionRepository: SuscriptionRepository;
    let softDeleteSuscription: SoftDeleteSuscription;

    beforeEach(() => {
        suscriptionRepository = {
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as SuscriptionRepository;
        softDeleteSuscription = new SoftDeleteSuscription(suscriptionRepository);
    });

    it('should soft delete a subscription and call the repository', async () => {
        const id = 1;
        const suscription = new Subscription('active');

        (suscriptionRepository.findById as jest.Mock).mockResolvedValue(suscription);

        await softDeleteSuscription.execute(id);

        expect(suscriptionRepository.findById).toHaveBeenCalledWith(id);

        expect(suscription.isActive).toBe(false);

        expect(suscriptionRepository.update).toHaveBeenCalledWith(suscription);
    });

    it('should throw an error if the subscription is not found', async () => {
        const id = 1;

        (suscriptionRepository.findById as jest.Mock).mockResolvedValue(null);

        await expect(softDeleteSuscription.execute(id)).rejects.toThrow('Account not found');

        expect(suscriptionRepository.update).not.toHaveBeenCalled();
    });
});