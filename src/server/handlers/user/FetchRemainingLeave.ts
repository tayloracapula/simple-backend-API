import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { FetchUserByCriteria } from "./FetchUserByCriteria";
import { Logger } from "server/Logger";
import { UserRelationshipLevel } from "./UserRelationshipLevel";

export class FetchRemainingLeave implements UseCase {
    private dataSource: DataSource;
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async execute(userId: number) {
        try {
            const userFetcher = new FetchUserByCriteria(this.dataSource);
            const user = await userFetcher.execute({id:userId},UserRelationshipLevel.BASIC)
            if (!user|| user.data.length === 0) {
               throw new Error(`Failed to find User ${userId}`);
            }

            return{
                success:true,
                data: user.data[0].annual_leave_balance
            }
        } catch (error) {
            Logger.error("Failed to fetch remaining leave",error)
            throw error;
        }
    }
}
