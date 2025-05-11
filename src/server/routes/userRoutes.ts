import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";
import { LeaveBookingController } from "server/controllers/LeaveBookingController";
import { RouteRegistry } from "./RouteRegistry";
import { UserLeaveGetRouteHandler } from "./RouteHandlers/Leave/UserSpecific/UserLeaveGetHandler";
import { UserLeavePatchHandler } from "./RouteHandlers/Leave/UserSpecific/UserLeavePatchHandler";
import { LeavePostRouteHandler } from "./RouteHandlers/Leave/LeavePostHandler";

export class UserRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/user";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const userGroup = new Hono()
        const leaveBookingController = new LeaveBookingController(dataSource);

        new RouteRegistry(userGroup,dataSource)
            .register(UserLeaveGetRouteHandler,leaveBookingController)
            .register(UserLeavePatchHandler,leaveBookingController)
            .register(LeavePostRouteHandler,leaveBookingController)
            .registerAll()

        this.handle404(userGroup);
        app.route(this.getBasePath(),userGroup);
    }
}