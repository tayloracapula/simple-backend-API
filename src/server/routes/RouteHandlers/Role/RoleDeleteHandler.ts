import type { Context, Hono } from "hono";
import type { RoleController } from "server/controllers/RoleController";
import { RouteHandler } from "../RouteHandler";
import { parseID } from "../IdParsing";

export class RoleDeleteRouteHandler extends RouteHandler{
    private roleController: RoleController
    constructor(app:Hono,roleController:RoleController) {
        super(app);
        this.roleController = roleController;
    }
    registerRoutes(): void {
       this.app.delete("/delete-role",this.deleteRole.bind(this)); 
    }

    private async deleteRole(c:Context){
        try {
            const roleId = parseID(c);
    
            const result = await this.roleController.deleteRole(roleId);
            return c.json(result);
        } catch (error) {
            return this.handleError(error,"Failed to delete Role",c)
        }
    }
}