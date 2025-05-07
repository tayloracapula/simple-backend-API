import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";
import { user_management } from "db-src/entity/entities/user_management";
import { Logger } from "server/Logger";
import { FetchUserByCriteria } from "./FetchUserByCriteria";
import { UserRelationshipLevel } from "./UserRelationshipLevel";
import { leave_booking } from "db-src/entity/entities/leave_booking";

export class RemoveUser implements UseCase {
    private dataSource:DataSource;
    private userRepository: Repository<user>;
    constructor(dataSource:DataSource) {
        this.dataSource = dataSource;
        this.userRepository = dataSource.getRepository(user);
    }

    async execute(idToRemove:number) {
        try {
            const userFetcher = new FetchUserByCriteria(this.dataSource);
            const userToRemove = await userFetcher.execute({id:idToRemove},UserRelationshipLevel.MANAGEMENT);
            if (!userToRemove|| userToRemove.data.length === 0) {
                throw new Error(`User with the id ${idToRemove} does not exist`);
            }

            return await this.dataSource.transaction(async transactionManager =>{

                await transactionManager.createQueryBuilder()
                    .delete()
                    .from(user_management)
                    .where("user_id = :userId", {userId: idToRemove})
                    .execute();
                await transactionManager.createQueryBuilder()
                    .delete()
                    .from(leave_booking)
                    .where("user_id = :userId",{userId: idToRemove})
                    .execute();
                return{
                    success: true,
                    message: "User deleted successfully"
                }
            })

        } catch (error) {
            Logger.error("Failed to remove user",error)
            throw error;
            
        }
    }
}