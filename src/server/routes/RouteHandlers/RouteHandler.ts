import type { Context, Hono } from "hono";
import { Logger } from "server/Logger";
import { StatusCode } from "server/StatusCodes";

export abstract class RouteHandler {
    constructor(protected app:Hono) {}

    abstract registerRoutes(): void;

    protected handleError(error:any, message: string, c: Context){
        Logger.error(message,error)
        return c.text(message,StatusCode.INTERNAL_ERROR);
    }
}