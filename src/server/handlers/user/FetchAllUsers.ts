import { user } from "db-src/entity/entities/user";
import { Logger } from "server/Logger";
import type { DataSource, FindOptionsRelations, Repository } from "typeorm";
import { UserRelationshipLevel } from "./UserRelationshipLevel";

export class FetchAllUsers {
    private repository: Repository<user>
    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(user);
    }

    async execute(relationshipLevel: UserRelationshipLevel = UserRelationshipLevel.STANDARD) {
        try {

            const relations: FindOptionsRelations<user> = this.getRelationshipsForLevel(relationshipLevel);

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

    private getRelationshipsForLevel(level:UserRelationshipLevel): FindOptionsRelations<user> {
        switch (level) {
            case UserRelationshipLevel.BASIC:
                return {};
            
            case UserRelationshipLevel.STANDARD:
                return {
                    role: true,
                    department: true
                };

            case UserRelationshipLevel.MANAGEMENT:
                return{
                    role: true,
                    department: true,
                    user_management: {
                        manager:true
                    },
                    manager_management:{
                        user: true
                    }
                }

            case UserRelationshipLevel.FULL:
                return {
                    role: true,
                    department: true,
                    user_management: {
                        manager:true
                    },
                    manager_management:{
                        user: true
                    },
                    leave_bookings: true
                }
            default:
                return {role: true};
        }
    }
}