import type { LeaveBookingController } from "server/controllers/LeaveBookingController";
import { RouteHandler } from "../../RouteHandler";
import type { Context, Hono } from "hono";
import { parseID } from "../../IdParsing";
import { StatusCode } from "server/StatusCodes";

export class ManagerLeaveGetRouteHandler extends RouteHandler {
    private leaveBookingController: LeaveBookingController
    constructor(app:Hono,leaveBookingController:LeaveBookingController) {
        super(app)
        this.leaveBookingController = leaveBookingController;
    }
    registerRoutes(): void {
        this.app.get("/pending-bookings",this.fetchPendingBookings.bind(this));
    }

    private async fetchPendingBookings(c:Context){
        try {
            const userId = parseID(c);
            const result = await this.leaveBookingController.fetchManagerPendingBooking(userId);
            return c.json(result,StatusCode.OK)
        } catch (error) {
            return this.handleError(error,"Failed to retrieve Bookings",c)
        }
    }
}