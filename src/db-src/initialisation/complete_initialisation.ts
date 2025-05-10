import type { DataSource } from "typeorm";
import { initialize_acceptance_status } from "./acceptance_status_initilisation";
import { initialise_booking_type } from "./booking_type_initialisation";
import { initialise_department } from "./department_initialsation";
import { initialise_roles } from "./role_initialisation";

export abstract class DatabaseInitialiser {
    public async initialiseStaticDatabaseTables(dataSource:DataSource) :Promise<void> {
        await initialize_acceptance_status(dataSource);
        await initialise_booking_type(dataSource);
        await initialise_department(dataSource);
        await initialise_roles(dataSource);
    }
}