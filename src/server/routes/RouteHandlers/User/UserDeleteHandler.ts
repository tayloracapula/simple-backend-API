import type { Context, Hono } from "hono";
import { RouteHandler } from "../RouteHandler";
import type { UserController } from "server/controllers/UserController";
import { StatusCode } from "server/StatusCodes";

export class UserDeleteRouteHandler extends RouteHandler {
    private userController: UserController;

    constructor(app: Hono, userController: UserController) {
        super(app);
        this.userController = userController;
    }
    registerRoutes(): void {
        this.app.delete("/delete-user",this.deleteUser.bind(this))
    }

    private async deleteUser(c: Context) {
        try {
            const userIdParam = c.req.param("id");
            if (!userIdParam) {
                return c.json(
                    {
                        success: false,
                        message: "User ID is required",
                    },
                    StatusCode.BAD_REQUEST
                );
            }
            const userId = parseInt(userIdParam, 10);
            if (isNaN(userId)) {
                return c.json(
                    {
                        success: false,
                        message: "User ID must be a number",
                    },
                    StatusCode.BAD_REQUEST
                );
            }

            const result = await this.userController.removeUser(userId);
            if (!result.success) return c.json(result, StatusCode.NOT_FOUND);

            return c.json(
                {
                    success: true,
                    message: "User Successfully Deleted",
                    data: result,
                },
                StatusCode.OK
            );
        } catch (error) {
            return this.handleError(error,"Failed to remove User",c)
        }
    }
}
