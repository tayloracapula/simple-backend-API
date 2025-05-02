import { role } from "db-src/entity/staticEntities/role";
import { Logger } from "server/Logger";
import type { Repository, DataSource } from "typeorm";
import type { UseCase } from "../UseCase";



export class RegisterNewRole implements UseCase {
    private repository: Repository<role>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(role);
    }

    async execute(newRoleName:string) {
        try {
            Logger.debug("Inserting new role", newRoleName)
            this.repository.insert({
                role: newRoleName
            })
        } catch (error) {
            Logger.error(`Failed to insert new role ${newRoleName} `, error)
        }
    }
}
