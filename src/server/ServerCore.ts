import { prettyJSON } from "hono/pretty-json";
import { Hono,} from "hono";
import { DatabaseManager } from "../db-src/DBManagement";
import type { RouteProvider } from "./routes/routeProvider";
import { RouteManager } from "./RouteManager";
import { Logger } from "./Logger";
import { timing } from "hono/timing";
import { logger } from "hono/logger";
import { JSONValidate } from "./ServerMiddleware";

export class ServerCore extends DatabaseManager {
    app:Hono;
    private readonly port:number;
    private routes: RouteProvider[] = [];
    private routeManager: RouteManager;

    constructor(port:number,APIdbFileName: string) {
        super(APIdbFileName);
        this.app = new Hono();
        //Hono middleware
        this.app.use(prettyJSON());
        this.app.use(timing());
        this.app.use(logger())
        this.app.use(JSONValidate)

        this.port = port;
        this.routeManager = new RouteManager();
    }

    getRouteManager(): RouteManager {
        return this.routeManager;
    }

    async initialiseRoutes(): Promise<ServerCore>{
        await this.openDb()
        this.routeManager.registerAllRoutes(this.app, this.dataSource);
        Logger.info(`Server initialised on port ${this.port}`)
        return this;
    }

}


