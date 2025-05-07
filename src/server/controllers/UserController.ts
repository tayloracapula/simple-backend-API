import { FetchAllUsers, FetchUserByCriteria,RegisterNewUser, type UserSearchCriteria, type NewUserData, RemoveUser } from "../handlers/user/UserUseCaseIndex";
import type { UserRelationshipLevel } from "server/handlers/user/UserRelationshipLevel";
import type { DataSource } from "typeorm";

export class UserController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;    
    }
    async getAllUsers(relationshipLevel:UserRelationshipLevel){
        const userFetcher = new FetchAllUsers(this.dataSource);
        return await userFetcher.execute(relationshipLevel);
    }

    async getUserByCondition(criteria:UserSearchCriteria, relationshipLevel:UserRelationshipLevel){
        const userConditionFetcher = new FetchUserByCriteria(this.dataSource);
        return await userConditionFetcher.execute(criteria,relationshipLevel);
    }

    async addNewUser(userData:NewUserData){
        const userInserter = new RegisterNewUser(this.dataSource);
        return await userInserter.execute(userData);
    }

    async removeUser(userId: number){
        const userRemover = new RemoveUser(this.dataSource);
        return await userRemover.execute(userId);
    }

}