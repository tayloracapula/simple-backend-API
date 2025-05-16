import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";
import { LeaveBookingController } from "server/controllers/LeaveBookingController";
import { RouteRegistry } from "./RouteRegistry";
import { ManagerLeaveGetRouteHandler } from "./RouteHandlers/Leave/ManagerSpecific/ManagerLeaveGetHandler";
import { ManagerLeavePatchHandler } from "./RouteHandlers/Leave/ManagerSpecific/ManagerLeavePatchHandler";
import { requiredRole } from "server/ServerMiddleware/RequiredRole";

export class ManagerRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/manager";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const managerGroup = new Hono()
        const leaveBookingController = new LeaveBookingController(dataSource);

        managerGroup.use(requiredRole(['Admin','Manager']))

        new RouteRegistry(managerGroup,dataSource)
            .register(ManagerLeaveGetRouteHandler,leaveBookingController)
            .register(ManagerLeavePatchHandler,leaveBookingController)
            .registerAll();

        this.handle404(managerGroup);
        app.route(this.getBasePath(),managerGroup);
    }
}