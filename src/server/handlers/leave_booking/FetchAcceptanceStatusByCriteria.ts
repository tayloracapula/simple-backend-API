import { acceptance_status } from "db-src/entity/staticEntities/acceptance_status";
import { GenericFetcherByCritetia } from "../tools/GenericFetcherByCriteria";
import type { DataSource } from "typeorm";

export class FetchAcceptanceStatusByCriteria extends GenericFetcherByCritetia<acceptance_status> {
    constructor(dataSource:DataSource) {
        super(dataSource,acceptance_status,"status");        
    }
}