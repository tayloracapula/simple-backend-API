import type { LeaveBookingController } from "server/controllers/LeaveBookingController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { isNewBookingData } from "../BookingdataParsing";
import { StatusCode } from "server/StatusCodes";

export class LeavePostRouteHandler extends RouteHandler {
    private leaveBookingController: LeaveBookingController;
    constructor(app:Hono,leaveBookingController:LeaveBookingController) {
        super(app)
        this.leaveBookingController = leaveBookingController;
    }
    registerRoutes(): void {
        this.app.post("/new-booking",this.addLeaveBooking.bind(this))
    }

    private async addLeaveBooking(c:Context){
        try {
            const leaveData = await c.req.json();
            
            if (!isNewBookingData(leaveData)) {
                return c.json({
                    success: false,
                    message: "Invalid booking data format"
                },StatusCode.BAD_REQUEST)
            }

            const result = await this.leaveBookingController.addBooking(leaveData);

            return c.json(result)
        } catch (error) {
            return this.handleError(error,"Failed to add booking",c)
        }
    }
}