import { prettyJSON } from "hono/pretty-json";
import { Hono,} from "hono";
import { DatabaseManager } from "../db-src/DBManagement";
import { RouteManager, type IRouteManager } from "./RouteManager";
import { Logger } from "./Logger";
import { timing } from "hono/timing";
import { logger } from "hono/logger";
import { JSONValidate } from "./ServerMiddleware";

export class ServerCore extends DatabaseManager {
    app:Hono;
    private readonly port:number;
    private routeManager: IRouteManager;

    constructor(port:number,APIdbFileName: string) {
        super(APIdbFileName);
        this.app = new Hono();
        Logger.debug("Adding Middleware")
        //Hono middleware
        this.app.use(prettyJSON());
        this.app.use(timing());
        this.app.use(logger())
        //Custom middleware
        this.app.use(JSONValidate)

        this.port = port;
        this.routeManager = new RouteManager();
    }

    getRouteManager(): IRouteManager {
        return this.routeManager;
    }

    async initialiseRoutes(): Promise<ServerCore>{
        await this.openDb()
        this.routeManager.registerAllRoutes(this.app, this.dataSource);
        Logger.info(`Server initialised on port ${this.port}`)
        return this;
    }

}


