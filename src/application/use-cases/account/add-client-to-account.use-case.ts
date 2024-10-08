import { AccountRepository } from "../../../domain/repositories/AccountRepository";
import { ClientRepository } from "../../../domain/repositories/ClientRepository";


export interface AddclientToAccountUseCase {
    execute( accountId:number, clientid:number): Promise<void>
  } 


export class AddClientToAccount implements AddclientToAccountUseCase{
    constructor(private accountRepository: AccountRepository,private clientRepository: ClientRepository) {}
    async execute(accountId:number, clientId:number): Promise<void> {
        {
    
            const account = await this.accountRepository.findById(accountId);
            if (!account) {
                throw new Error(`Account with ID ${accountId} does not exist.`);
            }
    
            const client = await this.clientRepository.findById(clientId);
            if (!client) {
                throw new Error(`Client with ID ${clientId} does not exist.`);
            }
    
            if (!account.isActive) {
                throw new Error(`Account with ID ${accountId} is not active.`);
            }
    
            if (!client.isActive) {
                throw new Error(`Client with ID ${clientId} is not active.`);
            }
    
            if (account.clients.some(existingClient => existingClient.id === clientId)) {
                throw new Error(`Client with ID ${clientId} is already associated with Account ${accountId}.`);
            }    
            account.clients.push(client);
    
            await this.accountRepository.update(account);
        }
    }
}