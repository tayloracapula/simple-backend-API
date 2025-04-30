import type { DataSource } from "typeorm";

export class AcceptanceStatusController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;

    }
}