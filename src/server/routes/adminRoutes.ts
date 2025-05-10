import { Hono } from "hono";
import type { DataSource, Repository } from "typeorm";
import { BaseRoute } from "./baseRoute";
import { Logger } from "server/Logger";
import { RoleController } from "server/controllers/RoleController";
import { UserController } from "server/controllers/UserController";
import { StatusCode } from "server/StatusCodes";
import { RouteRegistry } from "./RouteRegistry";
import { UserGetRouteHandler } from "./RouteHandlers/User/UserGetHandler";
import { UserPostRouteHandler } from "./RouteHandlers/User/UserPostHandler";
import { UserDeleteRouteHandler } from "./RouteHandlers/User/UserDeleteHandler";
import { UserPatchRouteHandler } from "./RouteHandlers/User/UserPatchHandler";

export class AdminRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/admin";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const adminGroup = new Hono();
        const roleController = new RoleController(dataSource);
        const userController = new UserController(dataSource);


        new RouteRegistry(adminGroup,dataSource)
           .register(UserGetRouteHandler,userController)
           .register(UserPostRouteHandler,userController)
           .register(UserDeleteRouteHandler,userController)
           .register(UserPatchRouteHandler,userController)
           .registerAll();

        adminGroup.get("/roles", async (c) => {
            try {
                const result = await roleController.getAllRoles();

                return c.json(result);
            } catch (error) {
                Logger.error("Admin Route retrieve roles error", error);
                return c.text(
                    "Failed to retrieve roles",
                    StatusCode.INTERNAL_ERROR
                );
            } 
        });

       

        adminGroup.post("/new-role", async (c) => {
            try {
                const postData = await c.req.json();

                if (!postData.name) {
                    return c.json(
                        {
                            success: false,
                            message: "Role name is required",
                        },
                        StatusCode.BAD_REQUEST
                    );
                }

                await roleController.addNewRole(postData.name);

                return c.json(
                    {
                        success: true,
                        message: "Role created sucessfully",
                    },
                    StatusCode.CREATED
                );
            } catch (error) {
                Logger.error("Admin Route add role error", error);
                return c.text("Failed to add role", StatusCode.INTERNAL_ERROR);
            }
        });


        adminGroup.delete("/delete-role", async (c) => {
            try {
                const roleIdParam =  c.req.param('id');

                if (!roleIdParam) {
                    return c.json(
                        {
                            success: false,
                            message: "Role ID is required",
                        },
                        StatusCode.BAD_REQUEST
                    );
                }
                const roleId = parseInt(roleIdParam,10);

                if (isNaN(roleId)) {
                    return c.json(
                        {
                            success: false,
                            message: "Role ID must be a number",
                        },
                        StatusCode.BAD_REQUEST
                    );                    
                }

                const result = await roleController.removeRole(roleId);

                if (!result.success) return c.json(result, StatusCode.NOT_FOUND);

                return c.json({
                    success: true,
                    message: "Role Successfully Deleted",
                    data: result
                },
                StatusCode.OK
            );
            } catch (error) {
                Logger.error("Admin Route remove role error", error);
                return c.text("Failed to remove role", StatusCode.INTERNAL_ERROR);
            }
        });

        this.handle404(adminGroup);

        app.route(this.getBasePath(), adminGroup);
    }
}
