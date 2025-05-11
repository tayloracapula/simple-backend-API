import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";

export class LoginRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/login"
    }       
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const loginGroup = new Hono()

        this.handle404(loginGroup);

        app.route(this.getBasePath(),loginGroup);
    }
}