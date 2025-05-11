import { FetchAvailableBookingTypes, RegisterNewBookingType, RemoveBookingType } from "../handlers/booking_type/BookingTypeUseCaseIndex"
import type { DataSource } from "typeorm";

export class BookingTypeController {
    private dataSource: DataSource;
    
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async fetchAllBookingTypes(){
        const bookingTypeFetcher = new FetchAvailableBookingTypes(this.dataSource);
        return await bookingTypeFetcher.execute()
    }

    async addNewBookingType(newBookingTypeName:string){
        const bookingTypeRegistrar = new RegisterNewBookingType(this.dataSource)
        return await bookingTypeRegistrar.execute(newBookingTypeName);
    }
    
    async deleteBookingType(bookingTypeId:number){
        const bookingTypeRemover = new RemoveBookingType(this.dataSource);
        return await bookingTypeRemover.execute(bookingTypeId);
    }
}