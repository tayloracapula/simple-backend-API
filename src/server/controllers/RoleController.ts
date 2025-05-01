import { FetchAvailableRoles, RegisterNewRole } from "../handlers/role/RolesUseCaseIndex";
import type { DataSource } from "typeorm";

export class RoleController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async getAllRoles() {
        const roleFetcher = new FetchAvailableRoles(this.dataSource);
        return await roleFetcher.execute();
    }

    async addNewRole(newRoleName:string){
        const roleInserter = new RegisterNewRole(this.dataSource);
        return await roleInserter.execute(newRoleName);
    }

}