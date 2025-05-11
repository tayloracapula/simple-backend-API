import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import type { BookingTypeController } from "server/controllers/BookingTypeController";
import { StatusCode } from "server/StatusCodes";

export class BookingTypePostHandler extends RouteHandler {
    private bookingTypeController: BookingTypeController
    constructor(app:Hono,bookingTypeController:BookingTypeController) {
        super(app);
        this.bookingTypeController = bookingTypeController
    }
    registerRoutes(): void {
        this.app.post("new-booking-type",this.addNewBookingType.bind(this))
    }

    private async addNewBookingType(c:Context){
        try {
            const postData = await c.req.json();
            if (!postData.name) {
                return c.json({
                    success: false,
                    message: "Booking Type name is required"
                },StatusCode.BAD_REQUEST) 
            } 
            await this.bookingTypeController.addNewBookingType(postData.name);
            return c.json({
                success: true,
                message: "Booking Type created successfully"
            },StatusCode.CREATED);
        } catch (error) {
            return this.handleError(error,"Failed to add Booking Type",c)
        }
    }
}