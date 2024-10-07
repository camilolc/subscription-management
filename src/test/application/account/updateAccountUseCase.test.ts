import { AccountRepository } from "../../../adapters/repositories/AccountRepository";
import { UpdateAccount } from "../../../application/use-cases/account/update-account.use-case";
import { Account } from "../../../domain/entities/Account";


describe('UpdateAccount', () => {
  let accountRepository: AccountRepository;
  let updateAccount: UpdateAccount;

  beforeEach(() => {
    accountRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as AccountRepository; 
    updateAccount = new UpdateAccount(accountRepository);
  });

  it('should update an existing account', async () => {
    const account = new Account('Test Account', 'wellness', { state: 'active',id:1,isActive:true });

  
    (accountRepository.findById as jest.Mock).mockResolvedValue(account);

    const newName = 'Updated Account';
    const newType = 'health';
    
    await updateAccount.execute(account.id, newName, newType);

    expect(account.name).toBe(newName); 
    expect(account.type).toBe(newType); 
    expect(accountRepository.update).toHaveBeenCalledWith(account);
  });

  it('should throw an error if the account does not exist', async () => {
    (accountRepository.findById as jest.Mock).mockResolvedValue(null); 

    await expect(updateAccount.execute(999, 'New Name', 'wellness')).rejects.toThrow('Account not found');
  });
});