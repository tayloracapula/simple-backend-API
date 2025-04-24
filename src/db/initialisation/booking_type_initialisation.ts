import { booking_type } from "db/entity/staticEntities/booking_type";
import type { DataSource } from "typeorm";


export async function initialise_booking_type(dataSource:DataSource): Promise<void> {
    const typeTableRepository = dataSource.getRepository(booking_type);

    const rowCount = await typeTableRepository.count();
    if (rowCount > 0) {
        typeTableRepository.clear()
    }

    const staticBookingStatus = [
        {booking_type: "Annual leave"},
        {booking_type: "Sick leave"},
        {booking_type: "Voulenteer Days"},
        {booking_type: "Unpaid leave"}
    ];
    await typeTableRepository.save(staticBookingStatus);
    
    console.log("Booking Type data initialised successfully")

} 