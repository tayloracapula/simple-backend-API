import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { parseID } from "../IdParsing";
import type { BookingTypeController } from "server/controllers/BookingTypeController";

export class BookingTypeDeleteHandler extends RouteHandler {
    private bookingTypeController: BookingTypeController;
    constructor(app:Hono,bookingTypeController:BookingTypeController) {
        super(app)
        this.bookingTypeController = bookingTypeController;
    }
    registerRoutes(): void {
       this.app.delete("delete-booking-type",this.deleteBookingType.bind(this)) 
    }

    private async deleteBookingType(c:Context) {
        try {
            const bookingTypeId = parseID(c);

            const result = await this.bookingTypeController.deleteBookingType(bookingTypeId)
            return c.json(result);
        } catch (error) {
            return this.handleError(error,"Failed to delete Booking Type",c)
        }
    }
}