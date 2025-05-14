import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";
import { LoginController } from "server/controllers/LoginController";
import { RouteRegistry } from "./RouteRegistry";
import { LoginPostHandler } from "./RouteHandlers/Login/LoginPostHandler";

export class LoginRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/login"
    }       
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const loginGroup = new Hono()
        const loginController = new LoginController(dataSource)
        
        new RouteRegistry(app,dataSource)
            .register(LoginPostHandler,loginController)
            .registerAll(); 

        this.handle404(loginGroup);

        app.route(this.getBasePath(),loginGroup);
    }
}