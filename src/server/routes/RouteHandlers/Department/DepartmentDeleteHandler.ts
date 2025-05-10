import type { DepartmentController } from "server/controllers/DepartmentController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { parseID } from "../IdParsing";

export class DepartmentDeleteHandler extends RouteHandler {
    private departmentController: DepartmentController;
    constructor(app:Hono,departmentController:DepartmentController) {
        super(app)
        this.departmentController = departmentController;
    }
    registerRoutes(): void {
        
    }

    private async deleteDepartment(c:Context) {
        try {
            const departmentId = parseID(c);

            const result = await this.departmentController.deleteDepartment(departmentId)
            return c.json(result);
        } catch (error) {
            return this.handleError(error,"Failed to delete Department",c)
        }
    }
}