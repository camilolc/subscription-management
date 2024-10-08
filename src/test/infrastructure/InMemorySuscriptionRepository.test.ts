import { Subscription } from "../../domain/entities/Suscription";
import { InMemorySuscriptionRepository } from "../../infrastructure/db/InMemorySuscription.repository";

describe('InMemorySuscriptionRepository', () => {
    let suscriptionRepository: InMemorySuscriptionRepository;


    beforeEach(() => {
        suscriptionRepository = new InMemorySuscriptionRepository();
    });

    it('should create a subscription', async () => {
        const suscription = new Subscription("active")
        const result = await suscriptionRepository.create(suscription);
        expect(result).toEqual(suscription);
        expect(await suscriptionRepository.findById(suscription.id)).toEqual(suscription);
    });

    it('should update an existing subscription', async () => {
        const suscription = new Subscription("active")
        await suscriptionRepository.create(suscription);

        const updatedSuscription = new Subscription("inactive");
        updatedSuscription.id = suscription.id;

        await suscriptionRepository.update(updatedSuscription);

        const foundSuscription = await suscriptionRepository.findById(suscription.id);
        expect(foundSuscription).toEqual(updatedSuscription);
    });

    it('should find all suscriptions', async () => {
        const suscription1 = new Subscription("active");
        await suscriptionRepository.create(suscription1);

        const suscription2 = new Subscription("inactive");
        await suscriptionRepository.create(suscription2);

        const allSuscriptions = await suscriptionRepository.findAll();
        expect(allSuscriptions).toEqual([suscription1, suscription2]);
    });

    it('should return null if subscription not found', async () => {
        const result = await suscriptionRepository.findById(999); 
        expect(result).toBeNull();
    });
    

});