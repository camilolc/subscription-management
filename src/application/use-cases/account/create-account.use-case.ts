import { Account } from "../../../domain/entities/Account";
import { Subscription } from "../../../domain/entities/Suscription";
import { AccountRepository } from "../../../adapters/repositories/AccountRepository";


export interface CreateAccountUseCase {
    execute( name: string, type: 'wellness' | 'health', suscription:Subscription ): Promise<Account>
  } 


export class CreateAccount implements CreateAccountUseCase{
    constructor(private accountRepository: AccountRepository) {}
    async execute(name: string, type: "wellness" | "health", suscription: Subscription): Promise<Account> {
            const account = new Account(name, type, suscription);
            return await this.accountRepository.create(account);
    }
}