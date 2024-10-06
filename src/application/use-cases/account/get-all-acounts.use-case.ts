import { Account } from "../../../domain/entities/Account";
import { AccountRepository } from "../../../interfaces/AccountRepository";


export interface GetAllAcountsUseCase {
    execute(): Promise<Account[] | null>
  }
  

export class GetAllAcounts implements GetAllAcountsUseCase {
    constructor(private accountRepository: AccountRepository) {}

    async execute(): Promise<Account[] | null> {
        return await this.accountRepository.findAll();
    }
}