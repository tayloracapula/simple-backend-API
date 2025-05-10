import { department } from "db-src/entity/staticEntities/department";
import type { DataSource } from "typeorm";
import { GenericRegistrar } from "../tools/GenericRegistrar";

export class RegisterNewDepartment extends GenericRegistrar<department>{
    constructor(dataSource: DataSource) {
        super(dataSource,department,"department")
    }
}