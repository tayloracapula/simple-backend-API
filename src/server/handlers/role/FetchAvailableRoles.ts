import { role } from "db-src/entity/staticEntities/role";
import { Logger } from "server/Logger";
import type { Repository, DataSource } from "typeorm";



export class FetchAvailableRoles {
    private repository: Repository<role>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(role);
    }

    async execute() {
        try {
            const roles = await this.repository.find();
            Logger.debug("Found roles:",roles);

            return {
                success: true,
                count: roles.length,
                data: roles,
            };
        } catch (error) {
            Logger.error("Failed to get roles", error);
            throw error;
        }
    }
}
