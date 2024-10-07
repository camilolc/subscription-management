import { AddonRepository } from '../../../domain/repositories/AddonRepository';
import { HandleQuantity } from '../../../application/use-cases/addon/handle-quantity.use-case';

describe('HandleQuantity', () => {
    let addonRepository: AddonRepository;
    let handleQuantity: HandleQuantity;

    beforeEach(() => {
        addonRepository = {
            handleQuantity: jest.fn(),
        } as unknown as AddonRepository;
        handleQuantity = new HandleQuantity(addonRepository);
    });

    it('should handle quantity correctly', async () => {
        const id = 1;
        const quantity = 5;
        
        (addonRepository.handleQuantity as jest.Mock).mockResolvedValue(undefined);
        await handleQuantity.execute(id, quantity);

        expect(addonRepository.handleQuantity).toHaveBeenCalledWith(id, quantity);
    });
   
});