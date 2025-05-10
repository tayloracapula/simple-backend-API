import { department } from "db-src/entity/staticEntities/department";
import type { DataSource } from "typeorm";
import { GenericRemover } from "../tools/GenericRemover";

export class RemoveDepartment extends GenericRemover<department>{
    constructor(dataSource: DataSource) {
        super(dataSource,department,"id")
    }
}