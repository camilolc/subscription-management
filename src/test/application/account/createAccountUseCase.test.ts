import { AccountRepository } from "../../../domain/repositories/AccountRepository";
import { CreateAccount } from "../../../application/use-cases/account/create-account.use-case";
import { Account } from "../../../domain/entities/Account";


describe('CreateAccountUseCase', () => {
  let createAccountUseCase: CreateAccount;
  let accountRepositoryMock: AccountRepository;

  beforeEach(() => {
    accountRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn()
    };

    createAccountUseCase = new CreateAccount(accountRepositoryMock);
  });

  it('should create an account and call repository method', async () => {
    const accountData:Account = { id:1,clients:[],isActive:true,name: 'New Account', type: 'health', subscription:{state:"active",id:1,isActive:true} };
    const {name,type, subscription} = accountData;
    await createAccountUseCase.execute(name,type,subscription);

    expect(accountRepositoryMock.create).toHaveBeenCalledWith(accountData);
  });

 
});