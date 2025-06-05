import { prettyJSON } from "hono/pretty-json";
import { Hono } from "hono";
import { DatabaseManager } from "../db-src/DBManagement";
import { RouteManager, type IRouteManager } from "./RouteManager";
import { Logger } from "./Logger";
import { timing } from "hono/timing";
import { logger } from "hono/logger";
import { JSONValidate } from "./ServerMiddleware/JSONValidate";
import { JWTAuth } from "./ServerMiddleware/JWTAuth";
import { obfuscareHeaders } from "./ServerMiddleware/ObfuscateHeaders";
import { rateLimiter } from "hono-rate-limiter";
import { createRateLimiterConfig } from "./ServerMiddleware/createRateLimiterConfig";
import { serveStatic } from "hono/bun";

export class ServerCore extends DatabaseManager {
    app: Hono;
    private readonly port: number;
    private routeManager: IRouteManager;

    constructor(port: number, APIdbFileName: string) {
        super(APIdbFileName);
        this.app = new Hono();
        Logger.debug("Adding Middleware");
        //Hono middleware
        this.app.use(prettyJSON());
        this.app.use(timing());
        this.app.use(logger());
        this.app.use('/static/*',serveStatic({root: './'}))
        this.app.use('/favicon.ico', serveStatic({path: './favicon.ico'}))
        //Custom middleware
        this.app.use(JSONValidate);
        this.app.use(JWTAuth);
        this.app.use(
            rateLimiter(createRateLimiterConfig())
        );
        this.app.use(obfuscareHeaders);

        this.port = port;
        this.routeManager = new RouteManager();
    }

    getRouteManager(): IRouteManager {
        return this.routeManager;
    }

    async initialiseRoutes(): Promise<ServerCore> {
        await this.openDb();
        this.routeManager.registerAllRoutes(this.app, this.dataSource);
        Logger.info(`Server initialised on port ${this.port}`);
        return this;
    }

    async shutdown(): Promise<void> {
        Logger.debug("Closing DB connection");
        await this.dataSource.destroy();
        Logger.warn("DB Connection closed");
    }
}
