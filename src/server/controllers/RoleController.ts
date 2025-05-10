import { FetchAvailableRoles, RegisterNewRole, RemoveRole } from "../handlers/role/RolesUseCaseIndex";
import type { DataSource } from "typeorm";

export class RoleController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async fetchAllRoles() {
        const roleFetcher = new FetchAvailableRoles(this.dataSource);
        return await roleFetcher.execute();
    }

    async addNewRole(newRoleName:string){
        const newRoleRegistrar = new RegisterNewRole(this.dataSource);
        return await newRoleRegistrar.execute(newRoleName);
    }

    async deleteRole(roleId:number){
        const roleRemover = new RemoveRole(this.dataSource);
        return await roleRemover.execute(roleId);
    }

}