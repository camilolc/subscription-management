import { Account } from "../../../domain/entities/Account";
import { AccountRepository } from "../../../interfaces/AccountRepository";


export interface UpdateAccountUseCase{
    execute(id: string, name: string, type: "wellness" | "health"): Promise<void>
}

export class UpdateAccount implements UpdateAccountUseCase {
    constructor(private accountRepository: AccountRepository) {}

    async execute(id: string, name: string, type: "wellness" | "health"): Promise<void> {

        console.log(id)
        const account = await this.accountRepository.findById(id);
        if (!account) throw new Error('Account not found');
        account.name = name;
        account.type = type;
        await this.accountRepository.update(account);
    }
}