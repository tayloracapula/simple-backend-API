import { role } from "db-src/entity/staticEntities/role";
import type { DataSource } from "typeorm";
import { GenericRegistrar } from "../tools/GenericRegistrar";


export class RegisterNewRole extends GenericRegistrar<role> {
    constructor(dataSource: DataSource) {
        super(dataSource,role,"role")
    }
}
