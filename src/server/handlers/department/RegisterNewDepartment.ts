import { department } from "db-src/entity/staticEntities/department";
import { Logger } from "server/Logger";
import type { Repository, DataSource } from "typeorm";
import type { UseCase } from "../UseCase";



export class RegisterNewDepartment implements UseCase {
    private repository: Repository<department>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(department);
    }

    async execute(newDepartmentName:string) {
        try {
            Logger.debug("Inserting new role", newDepartmentName)
            this.repository.insert({
                department: newDepartmentName
            })
        } catch (error) {
            Logger.error(`Failed to insert new role ${newDepartmentName} `, error)
        }
    }
}