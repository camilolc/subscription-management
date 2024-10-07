import { Account } from "../../../domain/entities/Account";
import { Subscription } from "../../../domain/entities/Suscription";
import { AccountRepository } from "../../../interfaces/AccountRepository";


export interface CreateAccountUseCase {
    execute( id:string,name: string, type: 'wellness' | 'health', suscription:Subscription ): Promise<Account>
  } 


export class CreateAccount implements CreateAccountUseCase{
    constructor(private accountRepository: AccountRepository) {}
    async execute(id: string, name: string, type: "wellness" | "health", suscription: Subscription): Promise<Account> {
            const account = new Account(id, name, type, suscription);
            return await this.accountRepository.create(account);
    }
}