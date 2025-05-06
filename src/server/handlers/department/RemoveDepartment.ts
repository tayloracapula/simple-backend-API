import { department } from "db-src/entity/staticEntities/department";
import { Logger } from "server/Logger";
import type { Repository, DataSource } from "typeorm";
import type { UseCase } from "../UseCase";



export class RemoveDepartment implements UseCase {
    private repository: Repository<department>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(department);
    }

    async execute(departmentId:number) {
        try {
            const departmentToRemove = await this.repository.findOne({
                where: {id: departmentId}
            });

            if (!departmentToRemove) {
                return {
                    success: false,
                    message: "Department Doesn't Exist"
                };
            }

            const result =  await this.repository.remove(departmentToRemove);

            return{
                success:true,
                message: "Department Deleted Successfully",
                data: result
            };
        } catch (error) {
            Logger.error("Failed to remove Department",error);
            throw error;
        }
    }
}