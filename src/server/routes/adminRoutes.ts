import { Hono } from "hono";
import type { DataSource, Repository } from "typeorm";
import { role } from "db-src/entity/staticEntities/role";
import { BaseRoute } from "./baseRoute";
import { Logger } from "server/Logger";
import { RoleController } from "server/controllers/RoleController";
import type { UserController } from "server/controllers/UserController";

export class AdminRoutes extends BaseRoute {

    getBasePath(): string {
        return "/api/admin";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const adminGroup = new Hono();
        const roleController = new RoleController(dataSource)

        adminGroup.get("/roles", async (c) => {
            try {
                const result = roleController.getAllRoles();
                return c.json(result);
            } catch (error) {
                Logger.error("Admin Route retrieve roles error", error)
                return c.text("Failed to retrieve roles", 500);
            }
        });

        adminGroup.post("/new-role", async (c) => {
            try {
                const postData = await c.req.json()

                if (!postData.name) {
                    return c.json({
                        success: false,
                        message: "Role name is required"
                    }, 400);
                }
                const result = await roleController.addNewRole(postData.name);
                
                return c.json({
                    success: true,
                    message: "Role created sucessfully"
                },201)
            } catch (error) {
                Logger.error("Admin Route add role error", error)
                return c.text("Failed to add role", 500);
            }
        })

        this.handle404(adminGroup);

        app.route(this.getBasePath(), adminGroup);
    }
}
