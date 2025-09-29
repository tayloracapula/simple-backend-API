/** @jsx jsx*/
/** @jsxImportSource hono/jsx */
import type { Hono, Context } from "hono";
import { RouteHandler } from "../RouteHandler";
import type { ViewScriptController } from "server/controllers/ViewScriptController";


export class ScriptPostHandler extends RouteHandler {
    private viewScriptController: ViewScriptController;
    constructor(app:Hono,viewScriptController:ViewScriptController) {
	super(app);
	this.viewScriptController = viewScriptController;
    }
    registerRoutes(): void {
	this.app.post("/script/toggle-menu",this.toggleMenu.bind(this)) 
    }
    private async toggleMenu(c:Context){
	try {
	    const result = await this.viewScriptController.toggleMenu();
	    c.header('Content-Type', 'text/html');
	    return c.body(result);	
	} catch (error) {
	    return this.handleError(error,"Failed to retrieve script",c)
	}
    }
}
