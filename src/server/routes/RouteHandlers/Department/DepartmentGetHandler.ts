import type { DepartmentController } from "server/controllers/DepartmentController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";

export class DepartmentGetHandler extends RouteHandler {
    private departmentController: DepartmentController
    constructor(app:Hono,departmentController:DepartmentController) {
        super(app)
        this.departmentController = departmentController
    }
    registerRoutes(): void {
       this.app.get("/departments",this.fetchDepartments.bind(this)) 
    }

    private async fetchDepartments(c:Context){
        try {
            const result = await this.departmentController.fetchAllDepartments();
            return c.json(result);
        } catch (error) {
            return this.handleError(error,"Failed to retrieve Departments",c)
        }
    }
}