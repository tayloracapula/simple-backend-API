import { user } from "db-src/entity/entities/user";
import { Logger } from "server/Logger";
import type { DataSource, FindOptionsRelations, Repository } from "typeorm";
import { getRelationshipsForLevel, UserRelationshipLevel } from "./UserRelationshipLevel";
import type { UseCase } from "../UseCase";
import { maskPasswords } from "../tools/MaskPasswords";

export class FetchAllUsers implements UseCase {
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

            const safeUsers = maskPasswords(users);

            return {
                success: true,
                count: safeUsers.length,
                data: safeUsers
            }
            
        } catch (error) {
            Logger.error("Failed to get Users",error);
            throw error;
        }
    }

}