import { Addon } from "../../../domain/entities/Addon";
import { AddonRepository } from "../../../adapters/repositories/AddonRepository";

export interface GetAddonsQuantityStatusUseCase {
    execute(): Promise<Addon[] | null>
  }
  

export class GetAddonsQuantityStatus implements GetAddonsQuantityStatusUseCase {
    constructor(private addonRepository: AddonRepository) {}

    async execute(): Promise<Addon[] | null> {
        return await this.addonRepository.findAll();
    }
}