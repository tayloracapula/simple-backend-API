import { booking_type } from "db-src/entity/staticEntities/booking_type";
import { Logger } from "server/Logger";
import type { DataSource } from "typeorm";


export async function initialise_booking_type(dataSource:DataSource): Promise<void> {
    const typeTableRepository = dataSource.getRepository(booking_type);

    const rowCount = await typeTableRepository.count();
    if (rowCount > 0) {
        typeTableRepository.clear()
    }

    const staticBookingStatus = [
        {booking_type: "Annual_Leave"},
        {booking_type: "Sick_Leave"},
        {booking_type: "Voulenteer_Days"},
        {booking_type: "Unpaid_Leave"}
    ];
    await typeTableRepository.save(staticBookingStatus);
    
    Logger.info(`Booking Type data initialised successfully`);
} 