import { Account } from "../domain/entities/Account";

export interface AccountRepository {
    create(account: Account): Promise<Account>;
    update(account: Account): Promise<void>;
    findById(id: number): Promise<Account | null>;
    findAll(): Promise<Account[] | null>;
}