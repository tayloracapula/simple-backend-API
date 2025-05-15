import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { leave_booking } from "db-src/entity/entities/leave_booking";
import { Logger } from "server/Logger";
import { FetchAcceptanceStatusByCriteria } from "./FetchAcceptanceStatusByCriteria";

export class ApproveDenyBooking implements UseCase {
    private dataSource: DataSource;
    private repository: Repository<leave_booking>
    constructor(dataSource:DataSource) {
        this.dataSource = dataSource
        this.repository = dataSource.getRepository(leave_booking)
    }
    
    async execute(bookingId:number,shouldApprove:boolean){
        try {
            const bookingToApprove = await this.repository.findOne({where:{booking_id : bookingId}})
            if (!bookingToApprove) throw new Error(`Booking with ID: ${bookingId} does not exist`);
            
            if (shouldApprove) {
                const accepted = await new FetchAcceptanceStatusByCriteria(this.dataSource).execute("Accepted")
                bookingToApprove.status = accepted;
            } else {
                const refused = await new FetchAcceptanceStatusByCriteria(this.dataSource).execute("Refused")
                bookingToApprove.status = refused
            }

            await this.repository.save(bookingToApprove);

            return{
                success: true,
                message: "Booking successfully changed",
                data: bookingToApprove
            }
            
        } catch (error) {
            Logger.error("Failed to edit booking",error)
            throw error
        }
    }
}