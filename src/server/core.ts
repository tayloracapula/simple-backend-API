import { prettyJSON } from "hono/pretty-json";
import { Hono,} from "hono";
import { DatabaseManager } from "../db/DbManagement";

export class Server extends DatabaseManager {
    app:Hono;
    private readonly port:number;

    constructor(port:number,APIdbFileName: string) {
        super(APIdbFileName);
        this.app = new Hono();
        this.port = port;
        this.initalisation();
    }

    private initalisation():void {
        this.app
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