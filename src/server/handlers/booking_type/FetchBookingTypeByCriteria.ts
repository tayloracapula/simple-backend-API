import type { DataSource, Repository } from "typeorm";
import { booking_type } from "db-src/entity/staticEntities/booking_type";
import { GenericFetcherByCritetia } from "../tools/GenericFetcherByCriteria";

export class FetchBookingTypeByCriteria extends GenericFetcherByCritetia<booking_type>{
    constructor(dataSource: DataSource) {
        super(dataSource,booking_type,"booking_type");
    }
}
