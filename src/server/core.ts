import { prettyJSON } from "hono/pretty-json";
import { Hono,} from "hono";
import { DatabaseManager } from "./DbManagement";

export class Server {
    private readonly app:Hono;
    private readonly port:number;

    constructor(port:number) {
        this.app = new Hono();
        this.port =port;
    }

    private initalisation():void {
        this.app 
    }



}