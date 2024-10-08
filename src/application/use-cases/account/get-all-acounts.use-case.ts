import { Account } from "../../../domain/entities/Account";
import { AccountRepository } from "../../../domain/repositories/AccountRepository";


export interface GetAllAcountsUseCase {
    execute(): Promise<Account[] | null>
  }
  

export class GetAllAcounts implements GetAllAcountsUseCase {
    constructor(private accountRepository: AccountRepository) {}

    async execute(): Promise<Account[] | null> {
        return await this.accountRepository.findAll();
    }
}