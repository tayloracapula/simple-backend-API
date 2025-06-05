import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";
import { RouteRegistry } from "./RouteRegistry";
import { PageController } from "server/controllers/PageController";
import { PageGetHandler } from "./RouteHandlers/pages/pageGetHandler";

export class ViewRoutes extends BaseRoute {
    getBasePath(): string {
        return "/"
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const viewGroup = new Hono();
        const pageController = new PageController()
        
        new RouteRegistry(viewGroup,dataSource)
            .register(PageGetHandler,pageController)
            .registerAll();

        this.handle404(viewGroup);
        app.route(this.getBasePath(),viewGroup);
    }       
}