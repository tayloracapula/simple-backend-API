import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";


export class RegisterNewUser implements UseCase {
    private repository:Repository<user>;

    constructor(dataSource:DataSource){
        this.repository = dataSource.getRepository(user);
    }

    async execute(){

    }
}