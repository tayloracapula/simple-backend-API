import { prettyJSON } from "hono/pretty-json";
import { createRoutes } from "./routes";
import { Hono,} from "hono";
import { DatabaseManager } from "../db/DbManagement";

export class Server extends DatabaseManager {
    app:Hono;
    private readonly port:number;

    constructor(port:number,APIdbFileName: string) {
        super(APIdbFileName);
        this.app = new Hono();
        this.port = port;
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