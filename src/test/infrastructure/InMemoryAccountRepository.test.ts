import { Account } from "../../domain/entities/Account";
import { Subscription } from "../../domain/entities/Suscription";
import { InMemoryAccountRepository } from "../../infrastructure/db/InMemmoryAccount.repository";
import { InMemorySuscriptionRepository } from "../../infrastructure/db/InMemorySuscription.repository";


describe('InMemoryAccountRepository', () => {
    let accountRepository: InMemoryAccountRepository;
    let suscriptionRepository: InMemorySuscriptionRepository;

    beforeEach(() => {
        suscriptionRepository = new InMemorySuscriptionRepository();
        accountRepository = new InMemoryAccountRepository(suscriptionRepository);
    });

    it('should create an account', async () => {
        const subscription = new Subscription('active');
        const account = new Account('Test Account', 'wellness', subscription);

        const createdAccount = await accountRepository.create(account);

        expect(createdAccount).toEqual(account);
        expect(await accountRepository.findById(account.id)).toEqual(account);
    });

    it('should update an existing account', async () => {
        const subscription = new Subscription('active');
        const account = new Account('Test Account', 'wellness', subscription);
        await accountRepository.create(account);

        const updatedAccount = new Account('Updated Account', 'health', subscription);
        updatedAccount.id = account.id; 

        await accountRepository.update(updatedAccount);

        const foundAccount = await accountRepository.findById(account.id);
        expect(foundAccount).toEqual(updatedAccount);
    });

    it('should find all accounts', async () => {
        const subscription1 = new Subscription('active');
        const account1 = new Account('Account 1', 'wellness', subscription1);
        await accountRepository.create(account1);

        const subscription2 = new Subscription('active');
        const account2 = new Account('Account 2', 'health', subscription2);
        await accountRepository.create(account2);

        const allAccounts = await accountRepository.findAll();
        expect(allAccounts).toEqual([account1, account2]);
    });

    it('should not update an account if it does not exist', async () => {
        const account = new Account('Non-existing Account', 'wellness', new Subscription('active'));
        await accountRepository.update(account); // Debe ejecutarse sin errores

        const foundAccount = await accountRepository.findById(account.id);
        expect(foundAccount).toBeNull();
    });
 

    it('should return null for non-existing account', async () => {
        const foundAccount = await accountRepository.findById(999); // ID que no existe
        expect(foundAccount).toBeNull();
    });
});