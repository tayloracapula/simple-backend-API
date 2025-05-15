import type { DataSource } from "typeorm";
import type { UseCase } from "../UseCase";
import { Logger } from "server/Logger";
import { FetchUserByCriteria } from "../user/FetchUserByCriteria";
import { UserRelationshipLevel } from "../user/UserRelationshipLevel";

export class FetchBookingsForUser implements UseCase {
    private dataSource: DataSource;
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async execute(userID: number) {
        try {
            const userResult = await new FetchUserByCriteria(this.dataSource).execute(
                { id: userID },
                UserRelationshipLevel.STANDARDWBOOKINGS
            );
            if (!userResult||userResult.count === 0) {
                throw new Error(`User Lookup failed user not found with id: ${userID}`);
            }
            const userBookings = userResult.data[0].leave_bookings;
            return{
                success: true,
                count: userBookings.length,
                data: userBookings
            }
        } catch (error) {
            Logger.error("Failed to retrieve bookings", error);
            throw error;
        }
    }
}
