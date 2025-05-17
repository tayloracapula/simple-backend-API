import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";
import { LeaveBookingController } from "server/controllers/LeaveBookingController";
import { RouteRegistry } from "./RouteRegistry";
import { UserLeaveGetRouteHandler } from "./RouteHandlers/Leave/UserSpecific/UserLeaveGetHandler";
import { UserLeavePatchHandler } from "./RouteHandlers/Leave/UserSpecific/UserLeavePatchHandler";
import { LeavePostRouteHandler } from "./RouteHandlers/Leave/LeavePostHandler";
import { requiredRole } from "server/ServerMiddleware/RequiredRole";
import { UserSpecificGetRouteHandler } from "./RouteHandlers/User/UserSpecific/UserSpecificGetHandler";
import { UserController } from "server/controllers/UserController";

export class UserRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/user";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const userGroup = new Hono()
        const leaveBookingController = new LeaveBookingController(dataSource);
        const userController = new UserController(dataSource);
        userGroup.use(requiredRole(['User','Manager','Admin']))

        new RouteRegistry(userGroup,dataSource)
            .register(UserLeaveGetRouteHandler,leaveBookingController)
            .register(UserLeavePatchHandler,leaveBookingController)
            .register(LeavePostRouteHandler,leaveBookingController)
            .register(UserSpecificGetRouteHandler,userController)
            .registerAll()

        this.handle404(userGroup);
        app.route(this.getBasePath(),userGroup);
    }
}