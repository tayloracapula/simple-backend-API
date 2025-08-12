/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import type { Hono } from "hono";
import { RouteHandler } from "../RouteHandler";
import type { ViewScriptController } from "server/controllers/ViewScriptController";

export class ScriptGetHandler extends RouteHandler {
    private viewScriptController: ViewScriptController
    constructor(app:Hono,viewScriptController:ViewScriptController) {
        super(app);
        this.viewScriptController = viewScriptController;
    }
    registerRoutes(): void {
        
    }



}