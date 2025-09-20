import { Hono } from "hono";
import type { DataSource } from "typeorm";
import { BaseRoute } from "./baseRoute";
import { RoleController } from "server/controllers/RoleController";
import { UserController } from "server/controllers/UserController";
import { RouteRegistry } from "./RouteRegistry";
import { UserGetRouteHandler } from "./RouteHandlers/User/UserGetHandler";
import { UserPostRouteHandler } from "./RouteHandlers/User/UserPostHandler";
import { UserDeleteRouteHandler } from "./RouteHandlers/User/UserDeleteHandler";
import { UserPatchRouteHandler } from "./RouteHandlers/User/UserPatchHandler";
import { DepartmentController } from "server/controllers/DepartmentController";
import { RoleGetRouteHandler } from "./RouteHandlers/Role/RoleGetHandler";
import { RolePostRouteHandler } from "./RouteHandlers/Role/RolePostHandler";
import { RoleDeleteRouteHandler } from "./RouteHandlers/Role/RoleDeleteHandler";
import { DepartmentGetHandler } from "./RouteHandlers/Department/DepartmentGetHandler";
import { DepartmentPostHandler } from "./RouteHandlers/Department/DepartmentPostHandler";
import { DepartmentDeleteHandler } from "./RouteHandlers/Department/DepartmentDeleteHandler";
import { BookingTypeController } from "server/controllers/BookingTypeController";
import { BookingTypeDeleteHandler } from "./RouteHandlers/BookingType/BookingTypeDeleteHandler";
import { BookingTypePostHandler } from "./RouteHandlers/BookingType/BookingTypePostHandler";
import { requiredRole } from "server/ServerMiddleware/RequiredRole";

export class AdminRoutes extends BaseRoute {
    getBasePath(): string {
        return "/api/admin";
    }
    registerRoutes(app: Hono, dataSource: DataSource): void {
        const adminGroup = new Hono();
        const roleController = new RoleController(dataSource);
        const userController = new UserController(dataSource);
        const departmentController = new DepartmentController(dataSource);
        const bookingTypeController = new BookingTypeController(dataSource);
        
        adminGroup.use(requiredRole('Admin'))

        new RouteRegistry(adminGroup,dataSource)
           .register(UserGetRouteHandler,userController)
           .register(UserPostRouteHandler,userController)
           .register(UserDeleteRouteHandler,userController)
           .register(UserPatchRouteHandler,userController)
           .register(RoleGetRouteHandler,roleController)
           .register(RolePostRouteHandler,roleController)
           .register(RoleDeleteRouteHandler,roleController)
           .register(DepartmentGetHandler,departmentController)
           .register(DepartmentPostHandler,departmentController)
           .register(DepartmentDeleteHandler,departmentController)
           .register(BookingTypeDeleteHandler,bookingTypeController)
           .register(BookingTypePostHandler,bookingTypeController)
           .registerAll();

        this.handle404(adminGroup);

        app.route(this.getBasePath(), adminGroup);
    }
}
