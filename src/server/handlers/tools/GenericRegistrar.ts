import type { DataSource, EntityTarget, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { Logger } from "server/Logger";

export class GenericRegistrar<T extends object> implements UseCase {
    protected repository: Repository<T>;
    private nameField: keyof T;
    constructor(dataSource:DataSource,entity:EntityTarget<T>,nameField: keyof T) {
        this.repository = dataSource.getRepository(entity);
        this.nameField = nameField;
    }

    async execute(newEntryName:string): Promise<any> {
        try {
            const newEntity = this.repository.create();
            (newEntity as any)[this.nameField] = newEntryName

            Logger.debug(`Inserting new ${this.repository.metadata.name}: `,newEntryName)
            await this.repository.save(newEntity);
            return {
                success: true,
                message: `${this.repository.metadata.name} : ${newEntryName} created`
            }
        } catch (error) {
            Logger.error(`Failed to create ${this.repository.metadata.name} : `,error)
            throw error;
        }
    }
}