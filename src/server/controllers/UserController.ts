import { FetchAllUsers } from "server/handlers/user/FetchAllUsers";
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



}