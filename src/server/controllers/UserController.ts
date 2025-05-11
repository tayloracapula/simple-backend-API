import {
    FetchAllUsers,
    FetchUserByCriteria,
    RegisterNewUser,
    type UserSearchCriteria,
    type NewUserData,
    RemoveUser,
    EditUser,
    FetchRemainingLeave,
} from "../handlers/user/UserUseCaseIndex";
import type { UserRelationshipLevel } from "server/handlers/user/UserRelationshipLevel";
import type { DataSource } from "typeorm";

export class UserController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }
    async fetchAllUsers(relationshipLevel: UserRelationshipLevel) {
        const userFetcher = new FetchAllUsers(this.dataSource);
        return await userFetcher.execute(relationshipLevel);
    }

    async fetchUserByCriteria(
        criteria: UserSearchCriteria,
        relationshipLevel: UserRelationshipLevel
    ) {
        const userConditionFetcher = new FetchUserByCriteria(this.dataSource);
        return await userConditionFetcher.execute(criteria, relationshipLevel);
    }

    async fetchRemainingLeave(userId: number) {
        const remaingLeaveFetcher = new FetchRemainingLeave(this.dataSource);
        return await remaingLeaveFetcher.execute(userId);
    }

    async addNewUser(userData: NewUserData) {
        const newUserRegistrar = new RegisterNewUser(this.dataSource);
        return await newUserRegistrar.execute(userData);
    }

    async removeUser(userId: number) {
        const userRemover = new RemoveUser(this.dataSource);
        return await userRemover.execute(userId);
    }

    async editUser(updatedUserData: NewUserData, userId: number) {
        const userEditor = new EditUser(this.dataSource);
        return await userEditor.execute({ ...updatedUserData, id: userId });
    }
}
