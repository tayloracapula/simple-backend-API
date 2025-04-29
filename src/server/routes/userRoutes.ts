import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";

export class UserRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/user";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const userGroup = new Hono()


        this.handle404(userGroup);
        app.route(this.getBasePath(),userGroup);
    }
}