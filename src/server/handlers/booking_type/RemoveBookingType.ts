import { booking_type } from "db-src/entity/staticEntities/booking_type";
import { GenericRemover } from "../tools/GenericRemover";
import type { DataSource } from "typeorm";

export class RemoveBookingType extends GenericRemover<booking_type> {
    constructor(dataSource: DataSource) {
        super(dataSource,booking_type,"id")
    }
}