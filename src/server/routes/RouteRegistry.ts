import type { Hono } from "hono";
import type { RouteHandler } from "./RouteHandlers/RouteHandler";
import type { DataSource } from "typeorm";

export class RouteRegistry {
    private handlers: RouteHandler[] = [];
    private app: Hono;
    private dataSource: DataSource;
    constructor(app:Hono,dataSource:DataSource) {
        this.app = app;
        this.dataSource = dataSource;
    }
    
    register<T>(HandlerClass: new (app:Hono,controller:T) => RouteHandler, controller:T){
        this.handlers.push(new HandlerClass(this.app,controller))

        return this
    }

    registerAll(){
        this.handlers.forEach(handler => handler.registerRoutes());
    }
}