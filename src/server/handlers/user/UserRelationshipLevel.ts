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

export function getRelationshipLevelFromString(input:string):UserRelationshipLevel {
    const map : Record<string, UserRelationshipLevel> = {
        "basic": UserRelationshipLevel.BASIC,
        "standard": UserRelationshipLevel.STANDARD,
        "standardwbookings": UserRelationshipLevel.STANDARDWBOOKINGS,
        "management": UserRelationshipLevel.MANAGEMENT,
        "full": UserRelationshipLevel.FULL
    };
    const level =  map[input.toLowerCase()];
    if (!level){
        throw new Error(`Invalid relationship level: ${input}`);
    }
    return level;
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
