import type { DataSource, Repository } from "typeorm";
import { booking_type } from "db-src/entity/staticEntities/booking_type";
import { GenericRegistrar } from "../tools/GenericRegistrar";

export class RegisterNewBookingType extends GenericRegistrar<booking_type>{
    constructor(dataSource: DataSource) {
        super(dataSource,booking_type,"booking_type")
    }
}