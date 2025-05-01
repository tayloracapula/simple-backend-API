import { role } from "db-src/entity/staticEntities/role";
import { Logger } from "server/Logger";
import type { Repository, DataSource } from "typeorm";



export class RemoveRole {
    private repository: Repository<role>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(role);
    }

    async execute(roleId:number) {
        try {
            const roleToRemove = await this.repository.findOne({
                where: {id: roleId}
            });

            if (!roleToRemove) {
                return {
                    success: false,
                    message: "Role Doesn't Exist"
                };
            }

            const result =  await this.repository.remove(roleToRemove);

            return{
                success:true,
                message: "Role Deleted Successfully",
                data: result
            };
        } catch (error) {
            Logger.error("Failed to remove role",error);
            throw error;
        }
    }
}
