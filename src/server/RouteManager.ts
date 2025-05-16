import type { Hono } from "hono";
import type { RouteProvider } from "./routes/routeProvider";
import type { DataSource } from "typeorm";
import { Logger } from "./Logger";


export interface IRouteManager {
    routes:RouteProvider[]
    addRoute(route:RouteProvider):IRouteManager;
    registerAllRoutes(app:Hono, dataSource: DataSource):void;
}

export class RouteManager implements IRouteManager {
    routes: RouteProvider[] = [];

    addRoute(route: RouteProvider): RouteManager {
        this.routes.push(route);
        return this;
    }

    registerAllRoutes(app:Hono, dataSource: DataSource) {
        for (const route of this.routes) {
            route.registerRoutes(app, dataSource);
            Logger.debug(`Registered route: ${route.getBasePath()}`)
        }
    }
}
