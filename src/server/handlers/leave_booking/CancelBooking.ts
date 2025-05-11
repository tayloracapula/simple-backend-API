import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { leave_booking } from "db-src/entity/entities/leave_booking";
import { FetchAcceptanceStatusByCriteria } from "./FetchAcceptanceStatusByCriteria";
import { Logger } from "server/Logger";

export class CancelBooking implements UseCase {
    private dataSource: DataSource;
    private repository: Repository<leave_booking>
    constructor(dataSource:DataSource) {
        this.dataSource = dataSource
        this.repository = dataSource.getRepository(leave_booking)
    }
    
    async execute(bookingId:number){
        try {
            const bookingToCancel = await this.repository.findOne({where:{booking_id : bookingId}})
            if (!bookingToCancel) throw new Error(`Booking with ID: ${bookingId} does not exist`);
            
            const cancelled = await new FetchAcceptanceStatusByCriteria(this.dataSource).execute("Cancelled")
            bookingToCancel.status = cancelled;

            this.repository.save(bookingToCancel);
            return{
                success: true,
                message: "Booking successfully changed",
                data: bookingToCancel
            }
        } catch (error) {
            Logger.error("Failed to edit booking",error)
            throw error
        }
    }
}