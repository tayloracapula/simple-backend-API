import type { UserController } from "server/controllers/UserController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { StatusCode } from "server/StatusCodes";

export class UserPostRouteHandler extends RouteHandler {
    private userController: UserController
    constructor(app:Hono, userController:UserController) {
        super(app)
        this.userController = userController;
    }
    registerRoutes(): void {
        this.app.post("/new-user",this.newUser.bind(this))
    }

    private async newUser(c:Context){
        try {
            const userData = await c.req.json();
            
            const result = await this.userController.addNewUser(userData);
            return c.json(result,StatusCode.CREATED);

        } catch (error) {
            return this.handleError(error,"Failed to add User",c)
        }
    }
}