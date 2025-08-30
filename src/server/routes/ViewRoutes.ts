import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";
import { RouteRegistry } from "./RouteRegistry";
import { ViewScriptController } from "server/controllers/ViewScriptController";
import { PageGetHandler } from "./RouteHandlers/pages/pageGetHandler";
import { ScriptGetHandler } from "./RouteHandlers/pages/ScriptGetHandler";
import { ScriptPostHandler } from "./RouteHandlers/pages/scriptPostHandler";

export class ViewRoutes extends BaseRoute {
    getBasePath(): string {
        return "/"
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const viewGroup = new Hono();
        const viewScriptController = new ViewScriptController()
        
        new RouteRegistry(viewGroup,dataSource)
            .register(PageGetHandler,viewScriptController)
            .register(ScriptGetHandler,viewScriptController)
	    .register(ScriptPostHandler,viewScriptController)
            .registerAll();

        this.handle404(viewGroup);
        app.route(this.getBasePath(),viewGroup);
    }       
}
