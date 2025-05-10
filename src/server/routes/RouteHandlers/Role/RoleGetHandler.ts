import type { RoleController } from "server/controllers/RoleController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";

export class RoleGetRouteHandler extends RouteHandler{
    private roleController: RoleController;
    constructor(app:Hono,roleController:RoleController) {
       super(app); 
       this.roleController = roleController;
    }
    registerRoutes(): void {
       this.app.get("/roles",this.fetchRoles.bind(this));
    }

    private async fetchRoles(c:Context){
        try {
            const result = await this.roleController.fetchAllRoles();
            return c.json(result);
        } catch (error) {
            return this.handleError(error,"Failed to retrieve Roles",c)
        } 
    }

}