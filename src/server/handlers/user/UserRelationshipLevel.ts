import type { user } from "db-src/entity/entities/user";
import type { FindOptionsRelations } from "typeorm";

export enum UserRelationshipLevel {
    /**Just user data */
    BASIC = "basic",
    /**User and role and department */ 
    STANDARD = "standard",
    /**User role and department including leave booking data*/
    STANDARDWBOOKINGS = "standardwbookings",
    /**Adds management relationships */
    MANAGEMENT = "management",
    /**Everything including leave data */
    FULL = "full", 
}

export function getRelationshipsForLevel(level:UserRelationshipLevel): FindOptionsRelations<user> {
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
