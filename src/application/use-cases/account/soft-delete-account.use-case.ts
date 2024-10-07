import { AccountRepository } from "../../../adapters/repositories/AccountRepository";


export interface SoftDeleteAccountUseCase{
    execute(id: number): Promise<void> 
}

export class SoftDeleteAccount implements SoftDeleteAccountUseCase {
    constructor(private accountRepository: AccountRepository) {}

    async execute(id: number): Promise<void> {
        const account = await this.accountRepository.findById(id);
        if (!account) throw new Error('Account not found');
        account.isActive = false; 
        await this.accountRepository.update(account);
    }
}