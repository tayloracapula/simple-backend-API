import type { DataSource, Repository } from "typeorm";
import { role } from "db-src/entity/staticEntities/role";
import { GenericFetcherByCritetia } from "../tools/GenericFetcherByCriteria";


export class FetchRoleByCriteria extends GenericFetcherByCritetia<role>{
    constructor(dataSource: DataSource) {
        super(dataSource,role,"role")
    }
}