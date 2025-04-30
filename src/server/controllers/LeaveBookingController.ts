import type { DataSource } from "typeorm";

export class LeaveBookingController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }
}