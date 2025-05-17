import type { UserController } from "server/controllers/UserController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { StatusCode } from "server/StatusCodes";
import { parseID } from "../IdParsing";

export class UserPatchRouteHandler extends RouteHandler {
    private userController: UserController;
    constructor(app:Hono,userController:UserController) {
       super(app) 
       this.userController = userController;
    }
    registerRoutes(): void {
       this.app.patch("/edit-user",this.editUser.bind(this)) 
       this.app.patch("/reset-leave",this.resetLeave.bind(this))
    }

    private async editUser(c:Context){
        try {
            const userId = parseID(c);
            const userData = await c.req.json()
            const result = await this.userController.editUser(userData,userId)
            return c.json(result,StatusCode.OK)
        } catch (error) {
           return this.handleError(error,"Failed to edit User",c) 
        }
    }

    private async resetLeave(c:Context){
        try {
            const result = await this.userController.resetAnnualLeave();
            return c.json({
                success: true,
                message: "Annual leave reset for all users"
            })
        } catch (error) {
            return this.handleError(error, "Failed to reset Leave",c)
        }
    }
}