import type { DataSource } from "typeorm";

export class BookingTypeController {
    private dataSource: DataSource;
    
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }
}