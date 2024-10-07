import { AccountRepository } from "../../../adapters/repositories/AccountRepository";
import { SoftDeleteAccount } from "../../../application/use-cases/account/soft-delete-account.use-case";
import { Account } from "../../../domain/entities/Account";


describe('SoftDeleteAccount', () => {
  let accountRepository: AccountRepository;
  let softDeleteAccount: SoftDeleteAccount;
  
  beforeEach(() => {
    accountRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as AccountRepository;
    softDeleteAccount = new SoftDeleteAccount(accountRepository);
  });

  it('should soft delete an existing account', async () => {
    const account = new Account('Test Account', 'wellness', { state: 'active',id:1,isActive:true });

    (accountRepository.findById as jest.Mock).mockResolvedValue(account);
    
    await softDeleteAccount.execute(account.id);

    expect(account.isActive).toBe(false);
    expect(accountRepository.update).toHaveBeenCalledWith(account);
  });

  it('should throw an error if the account does not exist', async () => {
    (accountRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(softDeleteAccount.execute(999)).rejects.toThrow('Account not found');
  });
});