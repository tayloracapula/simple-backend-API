import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { role } from "db-src/entity/staticEntities/role";
import { Logger } from "server/Logger";


export class FetchRoleByCriteria implements UseCase {
    private repository: Repository<role>;
    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(role)
    }

    async execute(roleName: string):Promise<role>{
        try {
            const foundRole = await this.repository.findOneBy({
                role: roleName
            })
            if (!foundRole) {
                throw new Error(`Role with name ${roleName} does not exist`);
            }

            return foundRole;
            
        } catch (error) {
            Logger.error("failed to find role", error)
            throw error;
        }
    }
}