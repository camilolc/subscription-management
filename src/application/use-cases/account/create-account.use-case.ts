import { Account } from "../../../domain/entities/Account";
import { AccountRepository } from "../../../interfaces/AccountRepository";


export interface CreateTodoUseCase {
    execute( id:string,name: string, type: 'wellness' | 'health', isActive:boolean ): Promise<Account>
  }
  


export class CreateAccount implements CreateTodoUseCase{
    constructor(private accountRepository: AccountRepository) {}

    async execute(id:string,name: string, type: 'wellness' | 'health', isActive:boolean): Promise<Account> {
        const account = new Account(id, name, type, true);
        return await this.accountRepository.create(account);
    }
}