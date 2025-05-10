import type { UserController } from "server/controllers/UserController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { StatusCode } from "server/StatusCodes";

export class UserPatchRouteHandler extends RouteHandler {
    private userController: UserController;
    constructor(app:Hono,userController:UserController) {
       super(app) 
       this.userController = userController;
    }
    registerRoutes(): void {
       this.app.patch("/edit-user",this.editUser.bind(this)) 
    }

    private async editUser(c:Context){
        try {
            const userIdParam = c.req.param("id")
            if (!userIdParam) {
                return c.json({
                    success: false,
                    message: "User ID is required"
                },StatusCode.BAD_REQUEST);
            }
            const userId = parseInt(userIdParam, 10);
            if (isNaN(userId)) {
                return c.json({
                        success: false,
                        message: "User ID must be a number",
                    },
                    StatusCode.BAD_REQUEST);
            }
            const userData = await c.req.json()
            const result = await this.userController.editUser(userData,userId)
            return c.json(result,StatusCode.OK)
        } catch (error) {
           return this.handleError(error,"Failed to edit User",c) 
        }
    }
}