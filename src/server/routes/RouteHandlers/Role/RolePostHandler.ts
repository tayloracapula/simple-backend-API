import type { RoleController } from "server/controllers/RoleController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { StatusCode } from "server/StatusCodes";

export class RolePostRouteHandler extends RouteHandler {
    private roleController: RoleController;
    constructor(app: Hono, roleController: RoleController) {
        super(app);
        this.roleController = roleController;
    }
    registerRoutes(): void {
        this.app.post("new-role",this.addNewRole.bind(this));
    }

    private async addNewRole(c: Context) {
        try {
            const postData = await c.req.json();

            if (!postData.name) {
                return c.json({
                        success: false,
                        message: "Role name is required",
                    },StatusCode.BAD_REQUEST);
            }

            await this.roleController.addNewRole(postData.name);

            return c.json(
                {
                    success: true,
                    message: "Role created sucessfully",
                },
                StatusCode.CREATED
            );
        } catch (error) {
            return this.handleError(error,"Failed to add role",c)
        }
    }
}
