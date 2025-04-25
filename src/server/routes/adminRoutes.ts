import { Hono } from "hono";
import type { RouteProvider } from "./routeProvider";
import type { DataSource, Repository } from "typeorm";
import { role } from "db-src/entity/staticEntities/role";
import { BaseRoute } from "./baseRoute";

export class AdminRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/admin";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const adminGroup = new Hono()
        adminGroup.get("/roles", async (c) => {
            try {
                const roleRepository: Repository<role> =
                 dataSource.getRepository(role);

                const roles = await roleRepository.find();

                return c.json({
                    success: true,
                    count: roles.length,
                    data: roles
                })
            } catch (error) {
                return c.text("Failed to retrieve roles",500)
            }});

        this.handle404(adminGroup);

        app.route(this.getBasePath(),adminGroup);
    }
}
