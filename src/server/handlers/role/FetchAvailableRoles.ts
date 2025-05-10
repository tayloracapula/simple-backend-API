import { role } from "db-src/entity/staticEntities/role";
import type { DataSource } from "typeorm";
import { GenericFetcher } from "../tools/GenericFetcher";



export class FetchAvailableRoles extends GenericFetcher<role>{
    constructor(dataSource: DataSource) {
        super(dataSource,role)
    }
}
