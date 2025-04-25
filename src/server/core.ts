import { prettyJSON } from "hono/pretty-json";
import { Hono,} from "hono";
import { DatabaseManager } from "../db/DBManagement";
import type { RouteProvider } from "./routes/routeProvider";

export class Server extends DatabaseManager {
    app:Hono;
    private readonly port:number;
    private routes: RouteProvider[] = [];

    constructor(port:number,APIdbFileName: string) {
        super(APIdbFileName);
        this.app = new Hono();
        this.app.use('*',prettyJSON())
        this.port = port;
    }

    addRoute(route:RouteProvider): Server{
        this.routes.push(route);
        return this;
    }

    async initialiseRoutes(): Promise<Server>{
        await this.openDb()

        for (const route of this.routes) {
            route.registerRoutes(this.app, this.dataSource);
        }

        console.log(`Server initialised on port ${this.port}`);
        return this;
    }

    private testJSON(JSONString:string):boolean {
        try {
            const parsed = JSON.parse(JSONString);
            if (parsed && typeof parsed === "object") {
                return true
            }
        } catch (error) {
            return false;
        }
        return false;
    }

}