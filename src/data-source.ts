import "reflect-metadata";
import { DataSource } from "typeorm";

import { leave_bookings } from "db-src/entity/entities/leave_bookings";
import { user_management } from "db-src/entity/entities/user_management";
import { user } from "db-src/entity/entities/user";
import { department } from "db-src/entity/staticEntities/department";
import { role } from "db-src/entity/staticEntities/role";
import { acceptance_status } from "db-src/entity/staticEntities/acceptance_status";
import { booking_type } from "db-src/entity/staticEntities/booking_type";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const createAppDataSource = (dbName: string) => new DataSource({
    type: "sqlite",
    database: dbName,
    synchronize: true,
    logging: false,
    entities: [
        user,
        leave_bookings,
        user_management,
        acceptance_status,
        booking_type,
        department,
        role,
    ],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy()
});
