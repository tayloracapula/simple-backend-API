import { department } from "db-src/entity/staticEntities/department";
import type { DataSource } from "typeorm";
import { GenericFetcher } from "../tools/GenericFetcher";

export class FetchAvailableDepartments extends GenericFetcher<department>{
    constructor(dataSource: DataSource) {
        super(dataSource,department)
    }
}