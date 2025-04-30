import type { DataSource } from "typeorm";

export class UserController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;    
    }
}