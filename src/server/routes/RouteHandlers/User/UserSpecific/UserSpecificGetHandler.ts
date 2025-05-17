import type { Context, Hono } from "hono";
import { RouteHandler } from "../../RouteHandler";
import { UserController } from "server/controllers/UserController";
import { StatusCode } from "server/StatusCodes";
import { parseID } from "../../IdParsing";

export class UserSpecificGetRouteHandler extends RouteHandler{
    private userController: UserController
    constructor(app:Hono,userController: UserController){
        super(app)
        this.userController = userController;
    }
    registerRoutes(): void {
        this.app.get("/remaining-leave",this.fetchUserRemainingLeave.bind(this));
    }


    private async fetchUserRemainingLeave(c:Context){
        try {
            const userId = parseID(c);

            const result = await this.userController.fetchRemainingLeave(userId);
            return c.json(result,StatusCode.OK);
        } catch (error) {
            return this.handleError(error,"Failed to retrieve Leave",c)
        }
    }

}