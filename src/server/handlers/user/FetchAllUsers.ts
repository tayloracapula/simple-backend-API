import { user } from "db-src/entity/entities/user";
import { Logger } from "server/Logger";
import type { DataSource, FindOptionsRelations, Repository } from "typeorm";
import { getRelationshipsForLevel, UserRelationshipLevel } from "./UserRelationshipLevel";

export class FetchAllUsers {
    private repository: Repository<user>
    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(user);
    }

    async execute(relationshipLevel: UserRelationshipLevel = UserRelationshipLevel.STANDARD) {
        try {

            const relations: FindOptionsRelations<user> = getRelationshipsForLevel(relationshipLevel);

            const users = await this.repository.find({
                relations: relations
            })

            return {
                success: true,
                count: users.length,
                data: users
            }
            
        } catch (error) {
            Logger.error("Failed to get Users",error);
            throw error;
        }
    }

}