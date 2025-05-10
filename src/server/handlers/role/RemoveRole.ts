import { role } from "db-src/entity/staticEntities/role";
import type { DataSource } from "typeorm";
import { GenericRemover } from "../tools/GenericRemover";



export class RemoveRole extends GenericRemover<role>{
    constructor(dataSource: DataSource) {
        super(dataSource,role,"id")
    }
}