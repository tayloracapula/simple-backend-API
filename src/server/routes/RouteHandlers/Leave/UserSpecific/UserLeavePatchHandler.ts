import type { Context, Hono } from "hono";
import { RouteHandler } from "../../RouteHandler";
import type { LeaveBookingController } from "server/controllers/LeaveBookingController";
import { parseID } from "../../IdParsing";
import { StatusCode } from "server/StatusCodes";

export class UserLeavePatchHandler extends RouteHandler {
    private leaveBookingController: LeaveBookingController
    constructor(app:Hono, leaveBookingController:LeaveBookingController){
        super(app);
        this.leaveBookingController = leaveBookingController;
    }
    registerRoutes(): void {
        this.app.patch("/cancel-booking",this.cancelBooking.bind(this));
    }

    private async cancelBooking(c:Context){
        try {
            const bookingId = parseID(c);
            const result = await this.leaveBookingController.cancelBooking(bookingId);
            return c.json(result,StatusCode.OK);
        } catch (error) {
            return this.handleError(error,"Failed to edit Booking",c)
        }
    }
}