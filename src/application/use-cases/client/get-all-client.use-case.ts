import { Account } from "../../../domain/entities/Account";
import { Client } from "../../../domain/entities/Client";
import { ClientRepository } from "../../../interfaces/ClientRepository";


export interface GetAllClientUseCase {
    execute(): Promise<Client[] | null>
  }
  

export class GetAllClients implements GetAllClientUseCase {
    constructor(private clientRepository: ClientRepository) { }
   async execute(): Promise<Client[] | null> {
           return await this.clientRepository.findAll();
    }

}