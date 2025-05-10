import type { DataSource, EntityTarget, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { Logger } from "server/Logger";

export class GenericFetcher<T extends object> implements UseCase {
    protected repository: Repository<T>
    constructor(dataSource:DataSource,entity: EntityTarget<T>) {
       this.repository = dataSource.getRepository(entity) 
    }

    async execute() {
        try {
            const foundData = await this.repository.find();
            
            return{
                success:true,
                count: foundData.length,
                data: foundData
            }
        } catch (error) {
           Logger.error(`Failed to retrieve ${this.repository.metadata.name}s`,error) 
           throw error
        }
    }
}