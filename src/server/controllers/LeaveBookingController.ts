import {
    AddBooking,
    ApproveDenyBooking,
    CancelBooking,
    FetchBookingsForUser,
    FetchManagerPendingBookings,
    type NewBookingData,
} from "../handlers/leave_booking/LeaveBookingUseCaseIndex";
import type { DataSource } from "typeorm";

export class LeaveBookingController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async addBooking(bookingData: NewBookingData) {
        const newBookingAdder = new AddBooking(this.dataSource);
        return await newBookingAdder.execute(bookingData);
    }

    async cancelBooking(bookingId: number) {
        const bookingCanceller = new CancelBooking(this.dataSource);
        return await bookingCanceller.execute(bookingId);
    }

    async approveDenyBooking(bookingId: number, shouldApprove: boolean) {
        const bookingApprover = new ApproveDenyBooking(this.dataSource);
        return await bookingApprover.execute(bookingId, shouldApprove);
    }

    async fetchManagerPendingBooking(managerId: number) {
        const pendingBookingFetcher = new FetchManagerPendingBookings(
            this.dataSource
        );
        return await pendingBookingFetcher.execute(managerId);
    }

    async fetchUserBookings(userId:number){
        const userBookingFetcher = new FetchBookingsForUser(this.dataSource)
        return await userBookingFetcher.execute(userId);
    }
}
