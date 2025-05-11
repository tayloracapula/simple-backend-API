import { FetchAvailableDepartments } from "server/handlers/department/FetchAvailableDepartments";
import { RegisterNewDepartment } from "server/handlers/department/RegisterNewDepartment";
import { RemoveDepartment } from "server/handlers/department/RemoveDepartment";
import type { DataSource } from "typeorm";

export class DepartmentController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async fetchAllDepartments() {
        const departmentsFetcher = new FetchAvailableDepartments(this.dataSource);
        return await departmentsFetcher.execute();
    }

    async addNewDepartment(newDepartmentName:string){
        const departmentRegistrar = new RegisterNewDepartment(this.dataSource);
        return await departmentRegistrar.execute(newDepartmentName);
    }

    async deleteDepartment(departmentId:number){
        const departmentRemover = new RemoveDepartment(this.dataSource);
        return await departmentRemover.execute(departmentId);
    }

}