import type { Hono } from "hono";
import type { DataSource } from "typeorm";
import type { RouteProvider } from "./routeProvider";
import { StatusCode } from "server/StatusCodes";

export abstract class BaseRoute implements RouteProvider {
    abstract registerRoutes(app: Hono, dataSource: DataSource): void;
    abstract getBasePath(): string;
    
    handle404(app: Hono): void {
        app.notFound((c) => {
            return c.json({
                success: false,
                message:"not found",
                path: c.req.path,
            },StatusCode.NOT_FOUND)
        });
    }
}