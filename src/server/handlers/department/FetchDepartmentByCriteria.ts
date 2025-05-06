import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { department } from "db-src/entity/staticEntities/department";
import { Logger } from "server/Logger";


export class FetchDepartmentByCriteria implements UseCase {
    private repository: Repository<department>;
    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(department)
    }

    async execute(departmentName: string):Promise<department>{
        try {
            const foundDepartment = await this.repository.findOneBy({
                department: departmentName
            })
            if (!foundDepartment) {
                throw new Error(`Department with name ${departmentName} does not exist`);
            }

            return foundDepartment;
            
        } catch (error) {
            Logger.error("failed to find department", error)
            throw error;
        }
    }
}