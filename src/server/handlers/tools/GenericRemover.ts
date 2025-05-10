import type { DataSource, EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { Logger } from "server/Logger";

export class GenericRemover<T extends object> implements UseCase {
    protected repository: Repository<T>;
    private idField: keyof T;
    constructor(dataSource:DataSource, entity:EntityTarget<T>, idField: keyof T) {
        this.repository = dataSource.getRepository(entity);        
        this.idField = idField;
    }

    async execute(id:number) {
        try {
            const whereParams: FindOptionsWhere<T> = {};
            whereParams[this.idField] = id as any

            const result = await this.repository.delete(whereParams);
            if (result.affected === 0) {
                return{
                    success: false,
                    message: `No ${this.repository.metadata.name} found with ID: ${id}`
                }
            }

            return {
                success:true,
                message: `${this.repository.metadata.name} successfully removed`
            }

        } catch (error) {
            Logger.error(`Failed to remove ${this.repository.metadata.name}`, error)
            throw error
        } 
    }
}