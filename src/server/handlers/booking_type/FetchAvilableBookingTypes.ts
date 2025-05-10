import type { DataSource } from "typeorm";
import { booking_type } from "db-src/entity/staticEntities/booking_type";
import { GenericFetcher } from "../tools/GenericFetcher";

export class FetchAvailableBookingTypes extends GenericFetcher<booking_type>{
    constructor(dataSource: DataSource) {
        super(dataSource,booking_type)
    }
}