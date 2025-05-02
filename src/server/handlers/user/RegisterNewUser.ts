import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";



export interface NewUserData {
    first_name: "Bob";
    last_name: "Smith";
    email: "bobsmith@company.example.com";
    password: "V3ry$ecur3PW";
    role: "user";
    department: "Energy";
    managerID: 254; //Optional Field: if omitted and role is "manager" then the user will be marked to manage themselves otherwise it will return an error
}

export class RegisterNewUser implements UseCase {
    private repository: Repository<user>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(user);
    }

    async execute(userData:NewUserData) {}
}
