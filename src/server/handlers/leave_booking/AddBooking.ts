import type { DataSource } from "typeorm";
import type { UseCase } from "../UseCase";
import type { NewBookingData } from "./NewBookingData";
import { Logger } from "server/Logger";
import { FetchUserByCriteria } from "../user/FetchUserByCriteria";
import { FetchBookingTypeByCriteria } from "../booking_type/FetchBookingTypeByCriteria";
import { UserRelationshipLevel } from "../user/UserRelationshipLevel";
import { leave_booking } from "db-src/entity/entities/leave_booking";
import { FetchAcceptanceStatusByCriteria } from "./FetchAcceptanceStatusByCriteria";
import { acceptance_status } from "db-src/entity/staticEntities/acceptance_status";

export class AddBooking implements UseCase {
    private dataSource: DataSource
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async execute(bookingData:NewBookingData){
        try {
            const userFetcher = new FetchUserByCriteria(this.dataSource);
            const bookingTypeFetcher = new FetchBookingTypeByCriteria(this.dataSource);
            const acceptanceStatusFetcher = new FetchAcceptanceStatusByCriteria(this.dataSource)

            Logger.debug("beginning booking entry");
            const userPromise = userFetcher.execute({id:bookingData.user_id},UserRelationshipLevel.BASIC);
            const bookingTypePromise = bookingTypeFetcher.execute(bookingData.booking_type);
            const acceptanceStatusPromise = acceptanceStatusFetcher.execute("Pending");

            const newBooking = new leave_booking();
            newBooking.start_date = bookingData.start_date;
            newBooking.end_date = bookingData.end_date;
            newBooking.status = await acceptanceStatusPromise;
            newBooking.booking_type = await bookingTypePromise;
            
            const userResult = await userPromise;
            if (!userResult||userResult.count === 0 ) {
                throw new Error(`User Lookup failed user not found with id: ${bookingData.user_id}`);
            }
            newBooking.user = userResult.data[0];

            return await this.dataSource.transaction(async transactionManager => {
                await transactionManager.save(newBooking);

                return{
                    success: true,
                    message: "Leave request has been submitted for review",
                    data: newBooking
                }
            })

        } catch (error) {
            Logger.error("Failed to create new booking",error)
            throw error;
        }
    }
}