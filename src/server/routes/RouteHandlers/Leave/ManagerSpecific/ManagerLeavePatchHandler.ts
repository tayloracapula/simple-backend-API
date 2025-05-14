import type { Context, Hono } from "hono";
import { RouteHandler } from "../../RouteHandler";
import type { LeaveBookingController } from "server/controllers/LeaveBookingController";
import { parseID } from "../../IdParsing";
import { StatusCode } from "server/StatusCodes";

export class ManagerLeavePatchHandler extends RouteHandler {
    private leaveBookingController: LeaveBookingController
    constructor(app:Hono, leaveBookingController:LeaveBookingController){
        super(app);
        this.leaveBookingController = leaveBookingController;
    }
    registerRoutes(): void {
        this.app.patch("/approve-booking",this.approveDenyBooking.bind(this));
    }

    private async approveDenyBooking(c:Context){
        try {
            const bookingId = parseID(c);
            const shouldApprove = c.req.query("approve") === "true";
            const result = await this.leaveBookingController.approveDenyBooking(bookingId,shouldApprove);
            return c.json(result,StatusCode.OK);
        } catch (error) {
            return this.handleError(error,"Failed to edit Booking",c)
        }
    }
}