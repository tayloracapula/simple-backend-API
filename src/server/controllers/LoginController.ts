import type { DataSource } from "typeorm";

export class LoginController {
    private dataSource:DataSource
    constructor(dataSource:DataSource) {
        this.dataSource = dataSource;
    }


}