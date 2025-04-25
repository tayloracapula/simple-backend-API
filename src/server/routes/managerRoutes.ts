import { Hono } from "hono";
import type { RouteProvider } from "./routeProvider";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";

export class ManagerRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/manager";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const managerGroup = new Hono()


        this.handle404(managerGroup);
        app.route(this.getBasePath(),managerGroup);
    }
}