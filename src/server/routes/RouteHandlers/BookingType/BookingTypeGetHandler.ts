import type { BookingTypeController } from "server/controllers/BookingTypeController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";

export class BookingTypeGetHandler extends RouteHandler {
    private bookingTypeController: BookingTypeController;
    constructor(app:Hono,bookingTypeController:BookingTypeController) {
        super(app)
        this.bookingTypeController = bookingTypeController
    }
    registerRoutes(): void {
       this.app.get("/booking-types",this.fetchBookingTypes.bind(this)) 
    }

    private async fetchBookingTypes(c:Context){
        try {
            const result = await this.bookingTypeController.fetchAllBookingTypes();
            return c.json(result);
        } catch (error) {
            return this.handleError(error,"Failed to retrieve Booking Types",c)
        }
    }
}