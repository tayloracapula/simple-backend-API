import type { Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { department } from "db-src/entity/staticEntities/department";
import type { DataSource } from "typeorm/browser";
import { Logger } from "server/Logger";

export class FetchAvailableDepartments implements UseCase {
    private repository: Repository<department>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(department);
    }

    async execute() {
        try {
            const departments = await this.repository.find();
            Logger.debug("Found departments:",departments);

            return {
                success: true,
                count: departments.length,
                data: departments,
            };
        } catch (error) {
            Logger.error("Failed to get departments", error);
            throw error;
        }
    }
}