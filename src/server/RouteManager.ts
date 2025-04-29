import type { Hono } from "hono";
import type { RouteProvider } from "./routes/routeProvider";
import type { DataSource } from "typeorm";
import { Logger } from "./Logger";

export class RouteManager {
    private routes: RouteProvider[] = [];

    addRoute(route: RouteProvider): RouteManager {
        this.routes.push(route);
        return this;
    }

    registerAllRoutes(app:Hono, dataSource: DataSource) {
        for (const route of this.routes) {
            Logger.debug(`Registered route: ${route.getBasePath()}`)
            route.registerRoutes(app, dataSource);
        }
    }
}
