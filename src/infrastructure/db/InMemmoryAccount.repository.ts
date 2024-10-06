import { Account } from "../../domain/entities/Account";
import { AccountRepository } from "../../interfaces/AccountRepository";
import { InMemorySuscriptionRepository } from "./InMemorySuscription.repository";



export class InMemoryAccountRepository implements AccountRepository {

    constructor(private readonly suscriptionRepository:InMemorySuscriptionRepository){}
    private accounts: Account[] = [];    
    
    async create(account: Account): Promise<Account> {
        if(account.subscription) this.suscriptionRepository.create(account.subscription);
        this.accounts.push(account);
        return account;
    }
    
    async update(account: Account): Promise<void> {
        const index = this.accounts.findIndex(a => a.id === account.id);
        if (index !== -1) this.accounts[index] = account;
    }
    
    async findById(id: string): Promise<Account | null> {
        return this.accounts.find(account => account.id === id) || null;
    }
    async findAll(): Promise<Account[] | null> {
        return this.accounts || null;
    }
  
}