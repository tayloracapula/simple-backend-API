import type { EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import type { DataSource } from "typeorm/browser";
import { Logger } from "server/Logger";

export class GenericFetcherByCritetia<T extends object> implements UseCase {
    protected repository: Repository<T>
    private nameField: keyof T
    constructor(dataSource: DataSource,entity: EntityTarget<T>, nameField: keyof T) {
        this.repository = dataSource.getRepository(entity);
        this.nameField = nameField;
    }

    async execute(name:string){
        try {
            const whereParams: FindOptionsWhere<T> = {}
            whereParams[this.nameField] = name as any;

            const result = this.repository.findOneBy(whereParams);
            if (!result) {
                throw new Error(`${this.repository.metadata.name} with name ${name} does not exist`);
            }

            return result;
        } catch (error) {
            Logger.error(`Failed to find ${this.repository.metadata.name} `, error)
            throw error;
        } 
    }
}