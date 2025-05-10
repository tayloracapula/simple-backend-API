import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { department } from "db-src/entity/staticEntities/department";
import { Logger } from "server/Logger";
import { GenericFetcherByCritetia } from "../tools/GenericFetcherByCriteria";


export class FetchDepartmentByCriteria extends GenericFetcherByCritetia<department>{
    constructor(dataSource: DataSource) {
        super(dataSource,department,"department")
    }
}