import type { DepartmentController } from "server/controllers/DepartmentController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { StatusCode } from "server/StatusCodes";

export class DepartmentPostHandler extends RouteHandler {
    private departmentController: DepartmentController
    constructor(app:Hono,departmentController:DepartmentController) {
        super(app);
        this.departmentController = departmentController
    }
    registerRoutes(): void {
        
    }

    private async addNewDepartment(c:Context){
        try {
            const postData = await c.req.json();
            if (!postData.name) {
                return c.json({
                    success: false,
                    message: "Department name is required"
                },StatusCode.BAD_REQUEST) 
            } 
            await this.departmentController.addNewDepartment(postData.name);
            return c.json({
                success: true,
                message: "Department created successfully"
            },StatusCode.CREATED);
        } catch (error) {
            return this.handleError(error,"Failed to add department",c)
        }
    }
}