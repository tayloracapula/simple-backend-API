import type { Hono } from "hono";
import type { DataSource } from "typeorm";

export interface RouteProvider{
    registerRoutes(app:Hono,dataSource:DataSource): void;
    getBasePath(): string;
    handle404(app:Hono):void;
}