import { role } from "db-src/entity/staticEntities/role";
import type { Repository, DataSource } from "typeorm";



export class RemoveRole {
    private repository: Repository<role>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(role);
    }

    async execute() {
        try {
        } catch (error) {
        }
    }
}
