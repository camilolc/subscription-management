import { AccountRepository } from "../../../domain/repositories/AccountRepository";


export interface UpdateAccountUseCase{
    execute(id: number, name: string, type: "wellness" | "health"): Promise<void>
}

export class UpdateAccount implements UpdateAccountUseCase {
    constructor(private accountRepository: AccountRepository) {}

    async execute(id: number, name: string, type: "wellness" | "health"): Promise<void> {

        const account = await this.accountRepository.findById(id);
        if (!account) throw new Error('Account not found');
        account.name = name;
        account.type = type;
        await this.accountRepository.update(account);
    }
}