import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";
import { Logger } from "server/Logger";

export class ResetLeave implements UseCase {
    private userRepository: Repository<user>
    constructor(dataSource:DataSource) {
        this.userRepository = dataSource.getRepository(user)
    }

    async execute(){
        try {
            const users = await this.userRepository.find()
            
            users.forEach(user=> {
                user.annual_leave_balance = 25
            });

            await this.userRepository.save(users);
        } catch (error) {
            Logger.error("Failed to edit User: ", error);
            throw error;
        }
    }
}