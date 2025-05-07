import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";
import type { NewUserData } from "./RegisterNewUser";

export class EditUser implements UseCase {
    private userRepository: Repository<user>
    constructor(dataSource:DataSource) {
        this.userRepository = dataSource.getRepository(user)
    }

    async execute(userData:NewUserData): Promise<any> {
        
    }
}