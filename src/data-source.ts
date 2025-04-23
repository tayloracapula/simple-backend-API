import "reflect-metadata";
import { DataSource } from "typeorm";

import { leave_bookings } from "db/entity/entities/leave_bookings";
import { user_management } from "db/entity/entities/user_management";
import { user } from "db/entity/entities/user";
import { department } from "db/entity/staticEntities/department";
import { role } from "db/entity/staticEntities/role";
import { acceptance_status } from "db/entity/staticEntities/acceptance_status";
import { leave_type } from "db/entity/staticEntities/leave_type";
import { booking_type } from "db/entity/staticEntities/booking_type";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const createAppDataSource = (dbName: string) => 
    new DataSource({
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
            leave_type,
            role,
        ],
        migrations: [],
        subscribers: [],
        namingStrategy: new SnakeNamingStrategy(),
    });
