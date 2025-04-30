import type { DataSource } from "typeorm";

export class DepartmentController {
    private dataSource: DataSource;
    
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }
}